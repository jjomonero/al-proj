import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { event, payment } = await req.json()

    // Validar webhook do ASAAS
    const webhookToken = req.headers.get('asaas-access-token')
    if (webhookToken !== Deno.env.get('ASAAS_WEBHOOK_TOKEN')) {
      throw new Error('Token inválido')
    }

    // Mapear status do ASAAS para nosso sistema
    const statusMap = {
      RECEIVED: 'paid',
      CONFIRMED: 'paid',
      PENDING: 'pending',
      OVERDUE: 'late',
      REFUNDED: 'refunded',
      FAILED: 'failed'
    }

    const status = statusMap[payment.status] || 'pending'
    const paidAt = ['RECEIVED', 'CONFIRMED'].includes(payment.status) ? payment.paymentDate : null

    // Atualizar pagamento no Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Credenciais do Supabase não configuradas')
    }

    const supabaseResponse = await fetch(
      `${supabaseUrl}/rest/v1/payments?asaas_id=eq.${payment.id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          status,
          paid_at: paidAt,
          updated_at: new Date().toISOString()
        }),
      }
    )

    if (!supabaseResponse.ok) {
      throw new Error('Erro ao atualizar pagamento no banco de dados')
    }

    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    console.error('Error in asaas-webhook function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  }
})