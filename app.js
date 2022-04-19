//jshint esversion:6
// const bodyParser = require('body-parser') // body-parser is included in express
const express = require('express')
const ejs = require('ejs')
const mongoose = require('mongoose')

const app = express()

app.use(express.static("public"))
app.set('view engine', 'ejs')
app.use(express.urlencoded({
    extended: true
}))

const dbState = [{
    value: 0,
    label: "Fail to connect"
},
{
    value: 1,
    label: "Connected"
},
{
    value: 2,
    label: "Connecting"
},
{
    value: 3,
    label: "Fail connecting"
}];

mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true }, () => {
    const state = Number(mongoose.connection.readyState);
    console.log(dbState.find(f => f.value == state).label, "to DB");
});

const userSchema = {
    email: String,
    password: String
}

const User = new mongoose.model("User", userSchema)



app.get("/", function (req, res) {
    res.render("home")
})

app.get("/login", function (req, res) {
    res.render("login")
})

app.post("/login", function (req, res) {
    console.log('req.body :>> ', req.body);
    const username = req.body.username
    const password = req.body.password

    User.findOne({ email: username }, function (err, foundUser) {
        if (err) {
            console.log('err :>> ', err);
        } else {
            console.log('foundUser :>> ', foundUser);
            if (foundUser) {
                if (foundUser.password === password) {
                    res.render("secrets")
                }
            }
        }
    })
})

app.get("/register", function (req, res) {
    res.render("register")
})

app.post("/register", function (req, res) {
    console.log('req.body :>> ', req.body)

    const newUser = new User({
        email: req.body.username,
        password: req.body.password,
    })

    newUser.save(function (err) {
        if (err) {
            console.log('err :>> ', err);
        } else {
            res.render("secrets")
        }
    })
})






app.listen(3000, () => {
    console.log("Server started on port 3000");
})





