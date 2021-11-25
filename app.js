const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const route = require('./routes');
const {create} = require('express-handlebars');

const db = require('./config/db');
//connect to databse
db.connect();

const app = express();

const hbs = create({
    // Specify helpers which are only registered on this instance.
    extname: '.hbs',
    helpers: {
        getValue: (obj, idx) => obj[idx],
        sum: (a,b) => a+b,
    }
});
app.engine('hbs', hbs.engine);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Handle route
route(app);

module.exports = app;
