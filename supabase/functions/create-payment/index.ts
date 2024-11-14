import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const ASAAS_API_KEY = Deno.env.get('ASAAS_API_KEY')
const ASAAS_API_URL = 'https://api.asaas.com/v3'
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!)

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { contractId, amount, dueDate, description } = await req.json()

    // Buscar informações do contrato e inquilino
    const { data: contract, error: contractError } = await supabase
      .from('contracts')
      .select(`
        *,
        tenant:tenants(*)
      `)
      .eq('id', contractId)
      .single()

    if (contractError) throw contractError

    // Criar cobrança no Asaas
    const asaasResponse = await fetch(`${ASAAS_API_URL}/payments`, {
      method: 'POST',
      headers: {
        'access_token': ASAAS_API_KEY!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customer: contract.tenant.asaas_id,
        billingType: 'BOLETO',
        value: amount,
        dueDate,
        description,
        externalReference: contractId,
      }),
    })

    const asaasPayment = await asaasResponse.json()

    // Registrar pagamento no Supabase
    const { error: paymentError } = await supabase
      .from('payments')
      .insert({
        contract_id: contractId,
        amount,
        due_date: dueDate,
        status: 'pending',
        asaas_id: asaasPayment.id,
      })

    if (paymentError) throw paymentError

    return new Response(
      JSON.stringify({ success: true, payment: asaasPayment }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  } catch (error) {
    console.error('Error creating payment:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  }
})