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

app.get("/", auth("Admin","Petugas","Masyarakat"), async (req, res) =>{
    let result = await history_lelang.findAll({
        include: [
            "barang",
            "lelang",
            "masyarakat"
        ]
    })
    res.json(result)
})

app.get("/:id", auth("Admin","Petugas","Masyarakat"), async (req, res) =>{
    await history_lelang.findOne({ where: {id_history: req.params.id}, 
    include: [
        "barang",
        "lelang",
        "masyarakat"
    ]})
    .then(result => {
        res.json({
            history_lelang: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.get("/masyarakat/:id_masyarakat", auth("Admin","Petugas","Masyarakat"), async (req, res) =>{
    let result = await history_lelang.findAll({ where: {id_masyarakat: req.params.id_masyarakat}, 
    include: [
        "barang",
        "lelang",
        "masyarakat"
    ]})
    res.json(result)
})

app.delete("/:id", auth("Admin","Petugas","Masyarakat"), (req,res) => {
    let param = {
        id_history : req.params.id
    }
    history_lelang.destroy({where: param})
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