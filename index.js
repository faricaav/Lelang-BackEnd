//import
const express = require('express');
const cors = require('cors');

//implementasi
const app = express();
app.use(cors());

//endpoint nanti ditambahkan di sini
//endpoint petugas
const petugas = require('./routes/petugas');
app.use("/petugas", petugas)

//endpoint masyarakat
const masyarakat = require('./routes/masyarakat');
app.use("/masyarakat", masyarakat)

//endpoint barang
const barang = require('./routes/barang');
app.use("/barang", barang)

//endpoint lelang
const lelang = require('./routes/lelang');
app.use("/lelang", lelang)

//endpoint history
const history = require('./routes/history_lelang');
app.use("/history", history)

//endpoint login
const login = require('./routes/login');
app.use("/login", login)

app.use(express.static(__dirname))

//run server
app.listen(8080, () => {
    console.log('server run on port 8080')
})