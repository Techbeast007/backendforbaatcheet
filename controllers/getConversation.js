const { Conversation} = require('../db');

module.exports = {
    async getConvo(req,res){
        let conversation = await Conversation.find()
        console.log(conversation)

        res.json({status:200,message:"success",conversation})
    }
}