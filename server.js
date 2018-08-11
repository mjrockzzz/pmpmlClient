//Install express server
const express = require('express');
var sslRedirect = require('heroku-ssl-redirect');
const app = express();

app.use(sslRedirect());

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist'));

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);