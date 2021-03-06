const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Schema defines how chat messages will be stored in MongoDB
const ConversationSchema = new Schema({
    name: {type: String},
    participants: [{type: Schema.Types.ObjectId, ref: 'User'}],
});

module.exports = mongoose.model('Conversation', ConversationSchema);