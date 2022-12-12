//import library
const express = require('express');
const bodyParser = require('body-parser');
const md5 = require('md5');

//implementasi library
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//import multer
const multer = require("multer")
const path = require("path")
const fs = require("fs")

//import model
const model = require('../models/index');
const barang = model.barang

//import auth
const auth = require("../auth")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "Lelang"

//config storage image
const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,"./image")
    },
    filename: (req,file,cb) => {
        cb(null, "img-" + Date.now() + path.extname(file.originalname))
    }
})
let upload = multer({storage: storage})

const toISOString = (date) => {
    var tzo = -date.getTimezoneOffset(), 
        dif = tzo>=0?'+':'-',
        pad = function(num){
            var norm = Math.floor(Math.abs(num))
            return (norm<10?'0':'')+norm
        }
    return date.getFullYear()+
        '-'+pad(date.getMonth()+1)+
        '-'+pad(date.getDate())+
        'T'+pad(date.getHours())+
        ':'+pad(date.getMinutes())+
        ':'+pad(date.getSeconds())+
        '.'+pad(date.getMilliseconds())+'Z'
}

//endpoint menampilkan semua data barang, method: GET, function: findAll()
app.get("/", auth("Admin","Petugas"), (req,res) => {
    barang.findAll()
        .then(result => {
            res.json({
                barang : result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

//endpoint untuk menampilkan data barang berdasarkan id
app.get("/:id", auth("Admin","Petugas"), (req, res) =>{
    barang.findOne({ where: {id_barang: req.params.id}})
    .then(result => {
        res.json({
            barang: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

//endpoint untuk menyimpan data barang, METHOD: POST, function: create
app.post("/", upload.single("image"), auth("Admin","Petugas"), (req,res) => {
    const date = new Date(Date.now())
    if (!req.file) {
        res.json({
            message: "No uploaded file"
        })
    } else {
        let data = {
            nama_barang : req.body.nama_barang,
            tgl_daftar: toISOString(date),
            harga_awal : req.body.harga_awal,
            deskripsi: req.body.deskripsi,
            image: req.file.filename
        }

        barang.create(data)
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

//endpoint mengupdate data barang, METHOD: PUT, function:update
app.put("/:id", upload.single("image"), auth("Admin","Petugas"), (req,res) => {
    let param = {
        id_barang : req.params.id
    }
    let data = {
        nama_barang : req.body.nama_barang,
        harga_awal : req.body.harga_awal,
        deskripsi: req.body.deskripsi
    }
    if (req.file) {
        // get data by id
        const row = barang.findOne({where: param})
        .then(result => {
            let oldFileName = result.image
           
            // delete old file
            let dir = path.join(__dirname,"../image",oldFileName)
            fs.unlink(dir, err => console.log(err))
        })
        .catch(error => {
            console.log(error.message);
        })

        // set new filename
        data.image = req.file.filename
    }
    barang.update(data, {where: param})
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

//endpoint menghapus data barang, METHOD: DELETE, function: destroy
app.delete("/:id", auth("Admin","Petugas"), (req,res) => {
    let param = {
        id_barang : req.params.id
    }
    barang.destroy({where: param})
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