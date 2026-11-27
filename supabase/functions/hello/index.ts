import Anthropic from "npm:@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: Deno.env.get("ANTHROPIC_API_KEY"),
});
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
export default {
  async fetch(req) {
    if (req.method === "OPTIONS") {
      return new Response("ok", { headers: corsHeaders });
    }
    const body = await req.json();
    const response = await client.messages.create({
      model: "claude-haiku-5-5",
      max_tokens: 2000,
      messages: [{ role: "user", content: body.question }],
    });

    const textBlock = response.content.find((block) => block.type === "text");

    return Response.json(
      { answer: textBlock.text },
      { headers: corsHeaders },
    );
  },
};
