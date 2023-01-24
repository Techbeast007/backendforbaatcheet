const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(bodyParser.json())

// Import the required modules
const app = express();
axios.defaults.headers.common['Authorization'] = `Bearer ${OPENAI_API_KEY}`;

// Connect to MongoDB
mongoose.connect('mongodb+srv://navneet:navneet@cluster0.dhn6oi5.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true });

// Define the conversation schema
const conversationSchema = new mongoose.Schema({
  query: String,
  response: String
});

// Create the conversation model
const Conversation = mongoose.model('Conversation', conversationSchema);

// Define a route to handle the OpenAI request and save the conversation
app.post('/api/generate-text', async (req, res) => {
    console.log(req)
  try {
    const { prompt, model } = req.body;

    // Send request to OpenAI API
    const openaiResponse = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
      prompt,
      model,
      max_tokens: 100,
    });

    // Save query and response in MongoDB
    const conversation = new Conversation({
      query: prompt,
      response: openaiResponse.data.choices[0].text
    });
    await conversation.save();

    res.json({ message: 'Conversation saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});

// Define a route to fetch the saved conversations
app.get('/api/conversations', async (req, res) => {
  try {
    const conversations = await Conversation.find();
    res.json(conversations);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});


