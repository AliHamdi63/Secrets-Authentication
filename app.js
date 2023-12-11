require("dotenv").config();
const express = require("express");
const { notFound, errorHandler } = require("./middlewares/errors");

const session = require("express-session");
const passport = require("passport");
const flash = require("express-flash");

const PORT = process.env.PORT || 5000;
const app = express();

// connect to DB
const connectToDB = require("./config/db");
connectToDB();


const initializePassport = require("./middlewares/passport-config");
initializePassport(passport);


app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());




// routes
app.use("/", require("./routes/home"));
app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));
app.use("/logout", require("./routes/logout"));
app.use("/secrets", require("./routes/secrets"));
app.use("/submit", require("./routes/submit"));


app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});