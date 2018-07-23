const express = require("express");
const app = express();
const config = require("./tools/config");
const axios = require("axios");

var bodyParser = require("body-parser");
var pub = __dirname + "/public";
var cors = require("cors");

app.use(express.static(pub));
app.set("views", __dirname + "/views");
app.set("view engine", "jade");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.send("<h1>Server App</h1>");
});

app.post("/verify/captcha", (req, res) => {
    let hash = req.body.hash;
    axios.post( config.captchaUrl+"?secret=" + config.secretkey + "&response=" +
    hash + "&remoteip=" + req.connection.remoteAddress)
    .then(function(response){
        res.json({"result":response.data,"time":req.body.time});
    }).catch(function(error){
        console.log(error);
        res.json({"result":response.data});
    });
});

app.post("/store/email", (req, res) => {
    let email = req.body.email;
    res.json({"result":email});
});

const newLocal = 7000;
app.listen(newLocal,() => {
    console.log('====================================');
    console.log("   Server is started on port " + newLocal);
    console.log('====================================');
});