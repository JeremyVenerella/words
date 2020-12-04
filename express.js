const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/user.route');
const session = require('express-session');


const app = express();
app.use(bodyParser.json());
app.use(session({
    secret: 'twetasdfsdfewa',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false},
    name: 'sessionId',
    httpOnly: true,
}))
app.use("/",router);
module.exports = app;