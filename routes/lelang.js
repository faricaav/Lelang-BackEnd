//import express
const express = require("express")
const app = express()
app.use(express.json())

//import model
const models = require("../models/index")
const lelang = models.lelang
const history_lelang = models.history_lelang
const barang = models.barang

//import auth
const auth = require("../auth")

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

app.get("/", auth("Admin","Petugas","Masyarakat"), async (req, res) =>{
    let result = await lelang.findAll({
        include: [
            "barang",
            "petugas",
            "masyarakat"
        ]
    })
    res.json(result)
})

app.get("/:id", auth("Admin","Petugas","Masyarakat"), async (req, res) =>{
    await lelang.findOne({ where: {id_lelang: req.params.id}, 
    include: [
        "barang",
        "petugas",
        "masyarakat"
    ]})
    .then(result => {
        res.json({
            lelang: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.get("/barang/:id_barang", auth("Admin","Petugas","Masyarakat"), async (req, res) => {
    await lelang.findAll({ where: {id_barang: req.params.id_barang},
    include: ["barang"]})
    .then(result => {
        res.json({
            lelang: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.get("/masyarakat/:id_masyarakat", auth("Admin","Petugas","Masyarakat"), async (req, res) => {
    await lelang.findAll({ where: {id_masyarakat: req.params.id_masyarakat},
    include: ["masyarakat"]})
    .then(result => {
        res.json({
            lelang: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.get("/petugas/:id_petugas", auth("Admin","Petugas","Masyarakat"), async (req, res) => {
    await lelang.findAll({ where: {id_petugas: req.params.id_petugas},
    include: ["petugas"]})
    .then(result => {
        res.json({
            lelang: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.post("/", auth("Admin","Petugas"), async (req, res) => {
    const date = new Date(Date.now())
    const idBarang = {id_barang: req.body.id_barang}
    const resultBarang = await barang.findOne({where: idBarang})
    let data = {
        id_barang : resultBarang.id_barang,
        tgl_lelang : toISOString(date),
        harga_akhir : resultBarang.harga_awal,
        id_petugas: req.body.id_petugas,
        status: req.body.status
    }
    lelang.create(data)
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
})

app.put("/:id", auth("Admin","Petugas"), async (req, res) => {
    const date = new Date(Date.now())
    const idBarang = {id_barang: req.body.id_barang}
    const resultBarang = await barang.findOne({where: idBarang})
    let param = {
        id_lelang : req.params.id
    }
    let data = {
        id_barang : resultBarang.id_barang,
        tgl_lelang : toISOString(date),
        harga_akhir : resultBarang.harga_awal,
        id_petugas: req.body.id_petugas,
        status: req.body.status,
        id_masyarakat: req.body.id_masyarakat
    }

    lelang.update(data, {where: param})
        .then(result => {
            const date = new Date(Date.now()).toISOString().slice(0, 10)
            if(result.deadline === date){
                let query={
                    status: Tutup
                }
                lelang.update(query, {where: param})
            }
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

app.post("/bid", auth("Masyarakat"), async (req, res) => {
    const idLelang = {id_lelang: req.body.id_lelang}
    // console.log(idLelang)
    const resultLelang = await lelang.findOne({where: idLelang})
    // console.log(resultLelang)
    let data = {
        id_lelang: resultLelang.id_lelang,
        id_masyarakat: req.body.id_masyarakat,
        id_barang: resultLelang.id_barang,
        penawaran_harga: req.body.penawaran_harga
    }

    if(resultLelang.status==="Tutup"){
        return res.json({message: "Auction is closed"})
    }

    if(data.penawaran_harga<=resultLelang.harga_akhir){
        return res.json({message: "Bid must be higher"})
    }

    history_lelang.create(data)
    lelang.update({
        harga_akhir: data.penawaran_harga,
        id_masyarakat: data.id_masyarakat,
    }, {where: idLelang})
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

app.delete("/:id", auth("Admin","Petugas"), (req,res) => {
    let param = {
        id_lelang : req.params.id
    }
    lelang.destroy({where: param})
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