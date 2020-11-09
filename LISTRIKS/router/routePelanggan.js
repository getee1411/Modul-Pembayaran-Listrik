const express = require("express")
const app = express()
const md5 = require("md5")

app.use(express.urlencoded({extended:true}))

const pelanggan = require("../models/index").pelanggan

app.get("/", (req,res)=> {
    pelanggan.findAll({
        include: ["tarif"]
    })
    .then(result=> {
        res.json(result)
    })
    .catch(error=> {
        res.json({
            message: error.message
        })
    })
})

//regis
app.post("/regist", async(req,res)=> {
    let data = {
        username: req.body.username,
        password: md5(req.body.password),
        nomor_kwh: req.body.nomor_kwh,
        nama_pelanggan: req.body.nama_admin,
        alamat: req.body.alamat,
        id_tarif: req.body.id_tarif,
    }

    pelanggan.create(data)
    .then(result => {
        res.json({
            message: "Data berhasil dimasukkan",
            data: result
        })
    })
    .catch(error=> {
        res.json({
            message: error.message
        })
    })
})

//update
app.put("/", async(req,res)=> {
    let data = {
        username: req.body.username,
        password: md5(req.body.password),
        nomor_kwh: req.body.nomor_kwh,
        nama_pelanggan: req.body.nama_pelanggan,
        alamat: req.body.alamat,
        id_tarif: req.body.id_tarif,
    }

    let param = {
        id_pelanggan: req.body.id_pelanggan
    }

    pelanggan.update(data, {where:param})
    .then(result => {
        res.json({
            message: "Data berhasil diupdate",
            data: result
        })
    })
    .catch(error=> {
        res.json({
            message: error.message
        })
    })
})

//hapus
app.delete("/:id_pelanggan", async(req,res)=> {
    let param = {
        id_pelanggan: req.params.id_pelanggan,
    }

    pelanggan.destroy({where:param})
    .then(result=> {
        res.json({
            message: "Data berhasil dihapus"
        })
    })
    .catch(error=> {
        res.json({
            message:error.message
        })
    })
})

module.exports = app