
const { Conversation} = require('../db');

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey:"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",
});
const openai = new OpenAIApi(configuration);

module.exports = {
  async generateText(req, res) {
   
    try {
      const { prompt, model } = req.body;
     
const completion = await openai.createCompletion({
  model: model,
  prompt: prompt,
  temperature: 0.6,
  max_tokens: 300,
});


    //   const completion = await openai.completions.create({
    //     engine: model,
    //     prompt: prompt,
    //     max_tokens: 100,
    //   });

      // Save query and response in MongoDB
      const conversation = new Conversation({
        query: prompt,
        response: completion.data.choices[0].text
      });
      await conversation.save();

      res.json({ message: 'Conversation saved successfully',conversation });
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred');
    }
  }
};

