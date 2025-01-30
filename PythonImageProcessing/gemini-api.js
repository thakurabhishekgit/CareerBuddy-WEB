const { GoogleGenerativeAI } = require('@google/generative-ai');


const apiKey = "AIzaSyAFXOKE8qMD6tECr9A9JT9OMPKFcrQIvp4";
const concept = process.argv[2]; 
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

function cleanText(data) {

  return data
    .replace(/\\(.+?)\\/g, "$1**") 
    .replace(/\\/g, "") 
    .replace(/\*/g, "") 
    .replace(/•/g, "") 
    .trim();
}

async function run(prompt) {
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(prompt);


    return cleanText(result.response.text());
  } catch (error) {
    console.error("Error in Gemini API:", error);
    return "Failed to get a response from Gemini.";
  }
}

async function main() {
  if (!concept) {
    console.error("Error: Concept not provided.");
    return;
  }

  const prompt = `Give me a complete career guide and roadmap for all the domains which can be related to and also suggest me how to prepare and colleges which are best for this concept : ${concept}.`;
  const description = await run(prompt);

  console.log(description.trim());
}

main();