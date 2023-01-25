const express = require('express');
const cors = require('cors')
const app = express();
require('dotenv').config()


const bodyParser = require('./middlewares/body-parser');
const conversationRoutes = require('./routes/conversation');
app.use(cors({
    origin: '*'
}));
app.listen(5000,()=>{
    console.log('3000')
})


bodyParser(app);
app.use('/', conversationRoutes);