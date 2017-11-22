const express = require('express');
const webpack = require('webpack');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

const db = require("./db");
const User = require("./db/model/User");
let mongoURL = "mongodb://127.0.0.1/chatApplication";

const jwt = require('jsonwebtoken');
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

app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});

app.post('/login', function (req, res) {
    let body = req.body;

    let token = jwt.sign(body, "lololo", { expiresIn: '1h' });

    User.findOne({ username: body.username }, function (err, user) {
        if (err) throw new Error(err);

        if (user) {
            res.json({ token });
        } else {
            res.status(400).send("User does not exist");
            console.log("User does not exist");
        }
    });
});

app.post('/register', function (req, res) {
    let { username, password } = req.body;

    let newUser = new User({
        username,
        password
    });

    newUser.save().then(response => {
        console.log(response);
        res.status(200).send('Successfully registered!');
    }, err => {
        res.status(400).send("User is already exists");
        console.log(err);
    })
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