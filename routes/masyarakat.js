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

//import auth
const auth = require("../auth")

//endpoint menampilkan semua data masyarakat, method: GET, function: findAll()
app.get("/", auth("Admin","Petugas"), (req,res) => {
    masyarakat.findAll()
        .then(result => {
            res.json({
                masyarakat : result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

//endpoint untuk menampilkan data masyarakat berdasarkan id
app.get("/:id", auth("Admin","Petugas"), (req, res) =>{
    masyarakat.findOne({ where: {id_masyarakat: req.params.id}})
    .then(result => {
        res.json({
            masyarakat: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

//endpoint untuk menyimpan data masyarakat, METHOD: POST, function: create
app.post("/", async (req,res) => {
    let data = {
        nama : req.body.nama,
        password : md5(req.body.password),
        tlp: req.body.tlp
    }

    const query = {
        username : req.body.username
    }

    const resultMasyarakat = await masyarakat.findOne({where: query})

    if(resultMasyarakat){
        return res.json({message: "Username has been used"})
    } else {
        data.username = query.username 
        masyarakat.create(data)
            .then(result => {
                res.json({
                    message: "data has been inserted"
                })
            })
            .catch(error => {
                res.json({
                    message: error.message
                })
            })
    }
})

//endpoint mengupdate data masyarakat, METHOD: PUT, function:update
app.put("/:id", auth("Admin","Petugas","Masyarakat"), (req,res) => {
    let param = {
        id_masyarakat : req.params.id
    }
    let data = {
        nama : req.body.nama,
        username : req.body.username,
        password : md5(req.body.password),
        tlp: req.body.tlp
    }
    masyarakat.update(data, {where: param})
        .then(result => {
            res.json({
                message: "data has been updated"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

//endpoint menghapus data masyarakat, METHOD: DELETE, function: destroy
app.delete("/:id", auth("Admin","Petugas","Masyarakat"), (req,res) => {
    let param = {
        id_masyarakat : req.params.id
    }
    masyarakat.destroy({where: param})
        .then(result => {
            res.json({
                message: "data has been deleted"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

module.exports = app