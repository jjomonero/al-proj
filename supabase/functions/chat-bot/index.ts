import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { prompt } = await req.json()
    console.log('Received prompt:', prompt)

    const apiKey = Deno.env.get('HUGGINGFACE_API_KEY')
    if (!apiKey) {
      throw new Error('HuggingFace API key not configured')
    }

    const response = await fetch(
      "https://api-inference.huggingface.co/models/meta-llama/Llama-2-7b-chat-hf",
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          inputs: `<s>[INST] <<SYS>> Você é um assistente especializado em gestão de aluguéis e imóveis. Ajude os usuários com dúvidas sobre contratos, pagamentos, e processos relacionados. <</SYS>> ${prompt} [/INST]`,
          parameters: {
            max_new_tokens: 500,
            temperature: 0.7,
            top_p: 0.95,
            do_sample: true,
          },
        }),
      }
    );

    if (!response.ok) {
      console.error('HuggingFace API error:', response.status, response.statusText)
      const errorText = await response.text()
      console.error('Error details:', errorText)
      throw new Error(`HuggingFace API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    console.log('HuggingFace API response:', JSON.stringify(data))

    if (!Array.isArray(data)) {
      console.error('Invalid response format (not an array):', data)
      throw new Error('Invalid response format from HuggingFace API')
    }

    if (!data[0] || typeof data[0].generated_text !== 'string') {
      console.error('Invalid response structure:', data)
      throw new Error('Invalid response structure from HuggingFace API')
    }

    let answer = data[0].generated_text
    answer = answer.split("[/INST]").pop()?.trim() || ''

    if (!answer) {
      throw new Error('Empty response from HuggingFace API')
    }

    console.log('Processed answer:', answer)

    return new Response(
      JSON.stringify({ answer }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    console.error('Error in chat-bot function:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: 'An error occurred while processing your request'
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  }
})