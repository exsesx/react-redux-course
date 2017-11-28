const express = require('express');
const webpack = require('webpack');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

const db = require("./db");
let mongoURL = "mongodb://127.0.0.1/chatApplication";

const User = require("./db/model/User");
const Message = require("./db/model/Message");
const Conversation = require("./db/model/Conversation");

const jwt = require('jsonwebtoken');
const jwtSecret = "mySecretKey";
const config = require('../webpack.config.js');

const port = 3000;
const app = express();
const server = http.Server(app);
const compiler = webpack(config);

module.exports = server;
require('./socket');

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {
        colors: true,
        progress: true
    }
}));

app.use(webpackHotMiddleware(compiler));

const ChatController = require('./chatController');

const chatRoutes = express.Router();

// Set chat routes as a subgroup/middleware to apiRoutes
app.use('/chat', chatRoutes);

// View messages to and from authenticated user
chatRoutes.get('/', ChatController.getConversations);

// Retrieve single conversation
chatRoutes.get('/:conversationId', ChatController.getConversation);

// Send reply in conversation
chatRoutes.post('/:conversationId', ChatController.sendReply);

// Start new conversation
chatRoutes.post('/new/:recipient', ChatController.newConversation);

app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});

app.post('/login', function (req, res) {
    let { username, password } = req.body;

    if (!username) return res.status(400).send("Username is required");
    if (!password) return res.status(400).send("Password is required");

    User.getUserByUsername(username, function (err, user) {
        if (err) return res.status(400).send(err);

        if (!user) {
            return res.status(400).send("Unknown user");
        }

        User.comparePassword(password, user.password, function (err, isMatch) {
            if (err) return res.status(400).send(err);
            if (isMatch) {
                let token = jwt.sign(user, jwtSecret, { expiresIn: '1h' });
                return res.json({ token });
            } else {
                return res.status(400).send("Invalid password")
            }
        })
    });
});

app.post('/register', function (req, res) {
    let { username, password } = req.body;

    if (!username) return res.status(400).send("Username is required");
    if (!password) return res.status(400).send("Password is required");

    let newUser = new User({
        username,
        password
    });

    User.createUser(newUser, function (error, user) {
        error
            ? res.status(400).send('User is already exists')
            : res.status(200).send('Successfuly registered')
    });
});

function startServer() {
    server.listen(port, function (err) {
        if (err) {
            console.log('error', err);
        } else {
            console.info('Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
        }
    });
}

db.connect(mongoURL, function (err) {
    if (err) {
        console.log('Unable to connect to Mongo on: ', mongoURL);
        process.exit(1)
    } else {
        startServer();
    }
});