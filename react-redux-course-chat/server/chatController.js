const Conversation = require('./db/model/Conversation'),
    Message = require('./db/model/Message');

exports.getConversations = function (user, callback) {
    // Only return one message from each conversation to display as snippet
    Conversation.find({ participants: user._id })
        .select('_id')
        .exec(function (err, conversations) {
            if (err) {
                return callback(err);
            }

            if(!conversations.length) {
                let err = {message: "You doesn't have any conversations yet"};
                return callback(err);
            }

            // Set up empty array to hold conversations + most recent message
            let fullConversations = [];
            conversations.forEach(function (conversation) {
                Message.find({ 'conversationId': conversation._id })
                    .sort('-createdAt')
                    .limit(1)
                    .populate({
                        path: "author",
                        select: "profile.firstName profile.lastName"
                    })
                    .exec(function (err, message) {
                        if (err) {
                            return callback(err);
                        }
                        fullConversations.push(message);
                        if (fullConversations.length === conversations.length) {
                            return callback(null, { conversations: fullConversations });
                        }
                    });
            });
        });
};

// todo: find participants and return conversations by user
// Conversation.find().exec((err, conversations) => {
//     let userConversations = [];
//     conversations.forEach(c => {
//         if(c.participants[0] == conversationId)
//             return c;
//     });
// })

exports.getConversation = function (conversationId, callback) {
    Message.find({ conversationId: conversationId })
        .select('createdAt body author')
        .sort('-createdAt')
        .populate({
            path: 'author',
            select: 'username'
        })
        .exec(function (err, messages) {
            if (err) {
                return callback(err);
            }

            return callback(null, { conversation: messages });
        });
};

exports.newConversation = function (currentUser, recipient, composedMessage, callback) {
    if (!recipient) {
        return callback({ error: 'Please choose a valid recipient for your message.' });
    }

    if (!composedMessage) {
        return callback({ error: 'Please enter a message.' });
    }

    const conversation = new Conversation({
        participants: [currentUser._id, recipient]
    });

    conversation.save(function (err, newConversation) {
        if (err) {
            return callback(err);
        }

        const message = new Message({
            conversationId: newConversation._id,
            body: composedMessage,
            author: currentUser
        });

        message.save(function (err, newMessage) {
            if (err) {
                return callback(err);
            }

            return callback(null, { message: 'Conversation started!', conversationId: conversation._id });
        });
    });
};

exports.sendReply = function (conversationId, composedMessage, user, callback) {
    const reply = new Message({
        conversationId: conversationId,
        body: composedMessage,
        author: user._id
    });

    reply.save(function (err, sentReply) {
        if (err) {
            callback(err);
        }

        callback(null, { message: 'Reply successfully sent!' });
    });
};

// DELETE Route to Delete Conversation
exports.deleteConversation = function (conversationId, user, callback) {
    Conversation.findOneAndRemove({
        $and: [
            { '_id': conversationId }, { 'participants': user._id }
        ]
    }, function (err) {
        if (err) {
            callback(err);
        }

        callback(null, { message: 'Conversation removed!' });
    });
};

// PUT Route to Update Message
exports.updateMessage = function (messageId, newMessage, user, callback) {
    Conversation.find({
        $and: [
            { '_id': messageId }, { 'author': user._id }
        ]
    }, function (err, message) {
        if (err) {
            callback(err);
        }

        message.body = newMessage;

        message.save(function (err, updatedMessage) {
            if (err) {
                callback(err);
            }

            callback(null, { message: 'Message updated!' });
        });
    });
};