// const express = require('express')
// const app = express()

// app.get('/', (req, res) => {
//   res.send('hello from the server')
// })



var express = require('express');
var app = express();
const {expressjwt:jwt} = require('express-jwt');
const jwks = require('jwks-rsa');
var port = process.env.PORT || 8080;

var jwtCheck = jwt({
      secret: jwks.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: 'https://dev-8c172k4g8h4ugh58.us.auth0.com/.well-known/jwks.json'
    }),
    audience: 'http://localhost:5173',
    issuer: 'https://dev-8c172k4g8h4ugh58.us.auth0.com/',
    algorithms: ['RS256']
});

app.use(jwtCheck);

app.get('/authorized', function (req, res) {
    res.send('Secured Resource');
});

app.listen(port);



//app.listen(3000)