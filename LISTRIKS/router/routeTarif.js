const express = require("express")
const app = express()

app.use(express.urlencoded({extended:true}))

const tarif = require("../models/index").tarif

//get
app.get("/", (req,res)=> {
    tarif.findAll()
    .then(result=> {
        res.json(result)
    })
    .catch(error=> {
        res.json({
            message: error.message
        })
    })
})

//tambah
app.post("/", async(req,res)=> {
    let data = {
        daya: req.body.daya,
        tarifperkwh: req.body.tarifperkwh
    }

    tarif.create(data)
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
        daya: req.body.daya,
        tarifperkwh: req.body.tarifperkwh
    }

    let param = {
        id_tarif: req.body.id_tarif
    }

    tarif.update(data, {where:param})
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
app.delete("/:id_tarif", async(req,res)=> {
    let param = {
        id_tarif: req.params.id_tarif
    }

    tarif.destroy({where:param})
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