var express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');


var env = process.env.NODE_ENV = process.env.NODE_ENV || 'developement';

var app = express();

function compile(str, path) {
    return stylus(str).set('filename', path);
}

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser());

app.use(stylus.middleware(
    {
        src: __dirname + '/public',
        compile: compile
    }
));

app.use(express.static(__dirname + '/public'));

if (env === "developement") {
mongoose.connect('mongodb://localhost/multivision');
} else {
    mongoose.connect('mongodb://kys061:multivision@ds027749.mongolab.com:27749/multivision');
}

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error....'));
db.once('open', function callback(){
    console.log('multivision db opened');
});

var messageSchema = mongoose.Schema(
    {
        message: String
    }
);

var Message = mongoose.model('Message', messageSchema);
var mongoMessage;
Message.findOne().exec(function(err, messageDoc){
    mongoMessage = messageDoc.message;
});



// when somebody requests /partials/main,
// express is going to render the main.jade file inside the partials dir inside the views dir.
app.get('/partials/:partialPath', function(req, res){
    res.render('partials/' + req.params.partialPath);
})

app.get('*', function(req, res){
    res.render('index', {
        mongoMessage: mongoMessage
    });
});

var port = process.env.PORT || 3030;
app.listen(port);

console.log('Listening to http://localhost:' + port);

