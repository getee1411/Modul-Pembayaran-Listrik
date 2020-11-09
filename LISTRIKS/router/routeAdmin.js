const express = require("express")
const md5 = require("md5")
const app = express()

app.use(express.urlencoded({extended:true}))

const admin = require("../models/index").admin

app.get("/", (req,res)=> {
    admin.findAll({
        include: ["level"]
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

//registrasi
app.post("/regis", async(req,res)=> {
    let data = {
        username: req.body.username,
        password: md5(req.body.password),
        nama_admin: req.body.nama_admin,
        id_level: req.body.id_level,
    }

    admin.create(data)
    .then(result => {
        res.json({
            message: "Data berhasil Dimasukkan",
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
        password: req.body.password,
        nama_admin: req.body.nama_admin,
        id_level: req.body.id_level,
    }

    let param = {
        id_admin: req.body.id_admin
    }

    admin.update(data, {where:param})
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
app.delete("/:id_admin", async(req,res)=> {
    let param = {
        id_admin: req.params.id_admin,
        password: md5(req.body.password)
    }

    admin.destroy({where:param})
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