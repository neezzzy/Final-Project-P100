

// var express = require('express');
// var app = express();
// const {expressjwt:jwt} = require('express-jwt');
// const jwks = require('jwks-rsa');
// var port = process.env.PORT || 8080;
// var cors = require('cors');
// app.use(cors());
// var jwtCheck = jwt({
//       secret: jwks.expressJwtSecret({
//           cache: true,
//           rateLimit: true,
//           jwksRequestsPerMinute: 5,
//           jwksUri: 'https://dev-8c172k4g8h4ugh58.us.auth0.com/.well-known/jwks.json'
//     }),
//     audience: 'http://localhost:8080',
//     issuer: 'https://dev-8c172k4g8h4ugh58.us.auth0.com/',
//     algorithms: ['RS256']
// });

// app.use(jwtCheck);

// app.get('/authorize', function (req, res) {
//     // res.send('Secured Resource');
//     // console.log('Secure Resource');
//     res.json({
//         type: "HERE ARE YOUR PROJECTS"
//     })
// });


// app.listen(port);


const express = require('express');
const app = express();
const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: 'http://localhost:8080',
  issuerBaseURL: `https://dev-tdz1zjoqa3dxpzkp.us.auth0.com/`,
});

// This route doesn't need authentication
app.get('/api/public', function(req, res) {
  res.json({
    message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
  });
});

// This route needs authentication
app.get('/authorize', checkJwt, function(req, res) {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated to see this.'
  });
});

const checkScopes = requiredScopes('read:messages');

app.get('/api/private-scoped', checkJwt, checkScopes, function(req, res) {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.'
  });
});

app.listen(8080, function() {
  console.log('Listening on http://localhost:8080');
});