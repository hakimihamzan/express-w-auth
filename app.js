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

app.get("/", function (req, res) {
    res.render("home")
})
app.get("/login", function (req, res) {
    res.render("login")
})
app.post("/login", function (req, res) {
    console.log('req.body :>> ', req.body);
    res.render("login")
})
app.get("/register", function (req, res) {
    res.render("register")
})






app.listen(3000, () => {
    console.log("Server started on port 3000");
})





