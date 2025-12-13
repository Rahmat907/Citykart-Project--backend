const Groq = require('groq-sdk');


const groqq = new Groq({
  apiKey:  process.env.GROQ_API_KEY,
});

module.exports = groqq
