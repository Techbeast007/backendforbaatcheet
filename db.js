const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://navneet:navneet@cluster0.dhn6oi5.mongodb.net/test', { useNewUrlParser: true });

// Define the conversation schema
const conversationSchema = new mongoose.Schema({
  query: String,
  response: String
});

// Create the conversation model
const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = { Conversation };