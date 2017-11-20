const mongoose = require('mongoose');

let state = {
    db: null,
};

exports.connect = function (url, done) {
    if (state.db) return done();

    mongoose.connect(url, { useMongoClient: true }, function(error) {
        if (error) return done(error);
        let db = mongoose.connection;
        state.db = db;
        initMongooseEvents(db);
        done();
    });
};

exports.get = function() {
    return state.db;
};

exports.close = function(done) {
    if (state.db) {
        state.db.close(function(err, result) {
            state.db = null;
            state.mode = null;
            done(err)
        })
    }
};

function initMongooseEvents(db) {
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));

    db.once('open', function () {
        console.log("Connected to MongoDB");
    });
}