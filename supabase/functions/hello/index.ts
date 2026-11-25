import Anthropic from "npm:@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: Deno.env.get("ANTHROPIC_API_KEY"),
});

export default {
  async fetch(req) {
    const response = await client.messages.create({
      model: "claude-haiku-5-5",
      max_tokens: 2000,
      messages: [{ role: "user", content: "How long does henna last?" }],
    });

    const textBlock = response.content.find((block) => block.type === "text");

    return Response.json(
      { answer: textBlock.text },
      { headers: { "Access-Control-Allow-Origin": "*"} }
    );
  },
};