const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.NEXT_AI_ML_API, // Replace with your API key
  basePath: "https://api.aimlapi.com/",
});
const openai = new OpenAIApi(configuration);

async function run() {
  const prompt = `
    Name: John Doe
    Email: john.doe@example.com
    Phone: +123456789
    LinkedIn: linkedin.com/in/johndoe
    GitHub: github.com/johndoe
    Experience: 5 years in full-stack development.
    Education: Bachelor's in Computer Science.
    Skills: React, Node.js, Python, Django, SQL
    Achievements: Developed a successful startup project, contributed to open-source.
    Job Description: Looking for a senior developer position to lead projects and mentor junior developers.

    Please generate a response based on the above resume information.
  `;

  const response = await openai.createCompletion({
    model: "mistralai/Mistral-7B-Instruct-v0.2",
    prompt: prompt,
    max_tokens: 150,
  });

  console.log(response.data.choices[0].text);
}

run();
