//import library
const express = require('express');
const bodyParser = require('body-parser');
const md5 = require('md5');

//implementasi library
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//import model
const model = require('../models/index');
const masyarakat = model.masyarakat
const petugas = model.petugas

//import auth
const auth = require("../auth")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "Lelang"

app.post("/", async (req,res) => {
    let data= {
        username: req.body.username,
        password: md5(req.body.password)
    }

    const resultMasyarakat = await masyarakat.findOne({where: data})
    const resultPetugas = await petugas.findOne({where: data})
    if(resultMasyarakat){
        resultMasyarakat.dataValues.level="Masyarakat"
        let payload = JSON.stringify(resultMasyarakat)
        // generate token
        let token = jwt.sign(payload, SECRET_KEY)
        res.json({
            logged: true,
            data: resultMasyarakat,
            token: token
        })
    } else if (resultPetugas){
        let payload = JSON.stringify(resultPetugas)
        // generate token
        let token = jwt.sign(payload, SECRET_KEY)
        res.json({
            logged: true,
            data: resultPetugas,
            token: token
        })
    } else{
        res.json({
            logged: false,
            message: "Invalid username or password"
        })
    }
})

module.exports = app