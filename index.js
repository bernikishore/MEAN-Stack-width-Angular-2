const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config/databse');
const path = require('path');

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, { useMongoClient: true }, (err) => {
    if (err) {
        console.log('could not established ', err);
    } else {
        console.log('Data Base connected: ' + config.db);
    }
});


app.use(express.static(__dirname + '/client/dist/'));

/* app.get('*', (req, res) => {
    res.send('<h2>Hello World</h2>');
}); */
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});

app.listen(8080, () => {
    console.log(config.secret);
    console.log('Listening port 8080');
})