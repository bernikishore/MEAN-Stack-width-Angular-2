const express = require('express');
const app = express();

const router = express.Router();
const mongoose = require('mongoose');
const config = require('./config/databse');
const path = require('path');
const authentication = require('./routes/authentication')(router);
const bodyParser = require('body-parser');



mongoose.Promise = global.Promise;
mongoose.connect(config.uri, { useMongoClient: true }, (err) => {
    if (err) {
        console.log('could not established ', err);
    } else {
        console.log('Data Base connected: ' + config.db);
    }
});


//parse applicaption/x-www.form-urlencoded

app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json

app.use(bodyParser.json());

app.use(express.static(__dirname + '/client/dist/'));
app.use('/authentication', authentication);

/* app.get('*', (req, res) => {
    res.send('<h2>Hello World</h2>');
}); */
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});

app.listen(3000, function() {
    console.log(config.secret);
    console.log('Listening port 3000');
});