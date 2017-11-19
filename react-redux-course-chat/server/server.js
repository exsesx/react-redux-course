const express = require('express');
const webpack = require('webpack');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
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
app.use(bodyParser.urlencoded({extended: false}));

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

app.get('*', function (req, res, next) {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});

app.post('/login', function (req, res, next) {
    let body = req.body;

    let token = jwt.sign(body, "lololo", {expiresIn: '1h'});
    res.json({token});
});

server.listen(port, function (err) {
    if (err) {
        console.log('error', err);
    } else {
        console.info('Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
    }
});