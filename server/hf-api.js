require('dotenv').config();

const { InferenceClient } = require("@huggingface/inference");

const client = new InferenceClient(process.env.HF_TOKEN);



const callHFapi = async (prompt) => {
  const chatCompletion = await client.chatCompletion({
    provider: "together",
    model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
    messages: [
        {
            role: "user",
            content: prompt,
        },
    ],
});

  return chatCompletion;
}

module.exports = callHFapi;
