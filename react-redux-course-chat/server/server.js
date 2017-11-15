const express = require('express');
const webpack = require('webpack');
const path = require('path');
const http = require('http');
const config = require('../webpack.config.js');

const port = 3000;
const app = express();
const server = http.Server(app);
const compiler = webpack(config);

module.exports = server;
require('./socket');

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {
        colors: true,
        progress: true
    }
}));

app.use(webpackHotMiddleware(compiler));

app.use('*', function (req, res, next) {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});

server.listen(port, function (err) {
    if (err) {
        console.log('error', err);
    } else {
        console.info('Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
    }
});