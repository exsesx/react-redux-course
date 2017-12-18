const Conversation = require('./db/model/Conversation'),
    Message = require('./db/model/Message');

exports.getConversations = function (user, callback) {
    // Only return one message from each conversation to display as snippet
    Conversation.find({ participants: user._id })
        .populate({ path: "participants", select: "_id username" })
        .exec(function (err, conversations) {
            if (err) {
                return callback(err);
            }

            if (!conversations.length) {
                let err = { message: "You doesn't have any conversations yet" };
                return callback(err);
            }

            // Set up empty array to hold conversations + most recent message
            let fullConversations = [];
            conversations.forEach(function (conversation) {
                let tempConversation = Object.assign({}, conversation.toJSON());
                Message.findOne({ 'conversationId': conversation._id })
                    .select("-conversationId -__v")
                    .sort('-createdAt')
                    .populate({
                        path: "author",
                        select: "-password"
                    })
                    .exec(function (err, message) {
                        if (err) {
                            return callback(err);
                        }
                        tempConversation.lastMessage = message;
                        fullConversations.push(tempConversation);
                        if (fullConversations.length === conversations.length) {
                            return callback(null, { conversations: fullConversations });
                        }
                    });
            });
        });
};

exports.getConversationWithUser = function (userId, currentUser, callback) {
    Conversation.find().exec((err, conversations) => {
        if (err) {
            return callback(err);
        }
        let userConversation = {};

        conversations.forEach(c => {
            if (c.participants.length === 2 && c.participants.indexOf(currentUser._id) !== -1
                && c.participants.indexOf(userId) !== -1) {
                userConversation = c;
            }
        });

        if (Object.keys(userConversation).length === 0 && userConversation.constructor === Object) {
            return callback({ message: "Conversations with user " + userId + " is not found" });
        }

        return callback(null, userConversation);
    })
};

exports.getConversationMessages = function (conversationId, callback) {
    Message.find({ conversationId: conversationId })
        .select('createdAt body author')
        .sort('createdAt')
        .populate({
            path: 'author',
            select: '_id username'
        })
        .exec(function (err, messages) {
            if (err) {
                return callback(err);
            }

            return callback(null, messages);
        });
};

exports.newConversation = function (currentUser, recipient, composedMessage, conversationName = null, callback) {
    if (!recipient) {
        return callback({ message: 'Please choose a valid recipient for your message.' });
    }

    if (!composedMessage) {
        return callback({ message: 'Please enter a message.' });
    }

    let participants = [currentUser._id];
    if (recipient.length > 1) {
        recipient.forEach(r => {
            participants.push(r);
        });
    } else {
        participants.push(recipient);
    }

    const conversation = new Conversation({
        name: conversationName,
        participants: participants
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

            console.log("Conversation started!");
            return callback(null, conversation);
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
exports.deleteConversation = function (conversation, user, callback) {
    Conversation.findOneAndRemove({
        $and: [
            { '_id': conversation._id }, { 'participants': user._id }
        ]
    }, function (err) {
        if (err) {
            return callback(err);
        }

        const message = conversation.name ? `Conversation "${conversation.name}" removed.` : "Conversation removed.";
        return callback(null, { message: message });
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