
const { Conversation} = require('../db');


module.exports = {
  async generateText(req, res) {
   
    try {
      const { prompt, response } = req.body;
     



    //   const completion = await openai.completions.create({
    //     engine: model,
    //     prompt: prompt,
    //     max_tokens: 100,
    //   });

      // Save query and response in MongoDB
      const conversation = new Conversation({
        query: prompt,
        response: response
      });
      await conversation.save();

      res.json({ message: 'Conversation saved successfully',conversation });
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred');
    }
  }
};

