/**
 * Module dependencies.
 */

var express = require('express');
var logger = require('morgan');
var fs = require('fs');
var app = express();


// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});

// log requests
app.use(logger('dev', {stream: accessLogStream}));

// express on its own has no notion
// of a "file". The express.static()
// middleware checks for a file matching
// the `req.path` within the directory
// that you pass it. In this case "GET /js/app.js"
// will look for "./public/js/app.js".

app.use(express.static(__dirname + '/dist'));

// if you wanted to "prefix" you may use
// the mounting feature of Connect, for example
// "GET /static/js/app.js" instead of "GET /js/app.js".
// The mount-path "/static" is simply removed before
// passing control to the express.static() middleware,
// thus it serves the file correctly by ignoring "/static"
//app.use('/static', express.static(__dirname + '/public'));

// if for some reason you want to serve files from
// several directories, you can use express.static()
// multiple times! Here we're passing "./public/css",
// this will allow "GET /style.css" instead of "GET /css/style.css":
//app.use(express.static(__dirname + '/public/css'));

//allow cors
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    if ('OPTIONS' == req.method) return res.send(200);
    next();
});


app.get('/404', function(req, res, next){
  // trigger a 404 since no other middleware
  // will match /404 after this one, and we're not
  // responding here
    next();
});

app.get('/403', function(req, res, next){
  // trigger a 403 error
    var err = new Error('not allowed!');
    err.status = 403;
    next(err);
});

app.get('/500', function(req, res, next){
  // trigger a generic (500) error
    next(new Error('keyboard cat!'));
});

// Error handlers

// Since this is the last non-error-handling
// middleware use()d, we assume 404, as nothing else
// responded.

// $ curl http://localhost:3000/notfound
// $ curl http://localhost:3000/notfound -H "Accept: application/json"
// $ curl http://localhost:3000/notfound -H "Accept: text/plain"

app.use(function(req, res, next){
    res.status(404);

  // respond with html page
    if (req.accepts('html')) {
	res.redirect('/404.html');
	return;
	
    }

  // respond with json
    if (req.accepts('json')) {
	res.send({ error: 'Not found' });
	return;
    }

    // default to plain-text. send()
    res.type('txt').send('Not found');
});

// error-handling middleware, take the same form
// as regular middleware, however they require an
// arity of 4, aka the signature (err, req, res, next).
// when connect has an error, it will invoke ONLY error-handling
// middleware.

// If we were to next() here any remaining non-error-handling
// middleware would then be executed, or if we next(err) to
// continue passing the error, only error-handling middleware
// would remain being executed, however here
// we simply respond with an error page.

app.use(function(err, req, res, next){
  // we may use properties of the error object
  // here and next(err) appropriately, or if
  // we possibly recovered from the error, simply next().
    res.status(err.status || 500);
    res.render('/404.html');
});



app.listen(80);
console.log('listening on port 80');
