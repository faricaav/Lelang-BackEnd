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
const petugas = model.petugas

//import auth
const auth = require("../auth")

//endpoint menampilkan semua data petugas, method: GET, function: findAll()
app.get("/", auth("Admin","Petugas"), (req,res) => {
    petugas.findAll()
        .then(result => {
            res.json({
                petugas : result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

//endpoint untuk menampilkan data petugas berdasarkan id
app.get("/:id", auth("Admin","Petugas"), (req, res) =>{
    petugas.findOne({ where: {id_petugas: req.params.id}})
    .then(result => {
        res.json({
            petugas: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

//endpoint untuk menyimpan data petugas, METHOD: POST, function: create
app.post("/", async(req,res) => {
    let data = {
        nama_petugas : req.body.nama_petugas,
        password : md5(req.body.password),
        level: req.body.level
    }

    const query = {
        username : req.body.username
    }

    const resultPetugas = await petugas.findOne({where: query})

    if(resultPetugas){
        return res.json({message: "Username has been used"})
    } else {
        data.username = query.username 
        petugas.create(data)
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

//endpoint mengupdate data petugas, METHOD: PUT, function:update
app.put("/:id", auth("Admin","Petugas"), (req,res) => {
    let param = {
        id_petugas : req.params.id
    }
    let data = {
        nama_petugas : req.body.nama_petugas,
        username : req.body.username,
        password : md5(req.body.password),
        level: req.body.level
    }
    petugas.update(data, {where: param})
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

//endpoint menghapus data petugas, METHOD: DELETE, function: destroy
app.delete("/:id", auth("Admin","Petugas"), (req,res) => {
    let param = {
        id_petugas : req.params.id
    }
    petugas.destroy({where: param})
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