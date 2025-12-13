const groqq = require('../../helper/graq.js');
const Product = require('../../models/product.model.js');

const askQuestion = async (req, res) => {
  try {
    const { productId, question } = req.body;

    // 1. Product validation
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // 2. Question empty check
    if (!question || question.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Question cannot be empty bro',
      });
    }
    // console.log(product);
    
    // 3. AI CALL
    const ai = await groqq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: `You are a helpful and knowledgeable product seller for our fashion e-commerce platform.
We ONLY sell clothing and fashion items.

Here are the product details:
Title: ${product.title}
Category: ${product.category}
Description: ${product.description}
Brand: ${product.brand}
Price: ₹${product.price}
Stock: ${product.totalStock}

Your job:
- Answer the user's question directly.
- BE POLITE and friendly.
- ONLY reply in **2 straight-forward lines**.
- DO NOT ask the user any question back.
- DO NOT add extra explanation.
- KEEP ANSWER SHORT AND CLEAR.

User question: ${question}`
,
        },
      ],
      model: 'llama-3.1-8b-instant',
    });

    const reply = ai.choices[0].message.content;

    // 4. (Optional) Save to DB
    // const askAIEntry = new AskAI({
    //   productId,
    //   question,
    //   answer: reply,
    // });
    // await askAIEntry.save();

    // 5. Response
    return res.status(200).json({
      success: true,
      reply: reply,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

module.exports = { askQuestion };
