const express = require("express")
const app = express()

app.use(express.urlencoded({extended:true}))

const tagihan = require("../models/index").tagihan
const penggunaan = require("../models/index").penggunaan

app.get("/", (req,res)=> {
    tagihan.findAll({
        include: ["penggunaan"]
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

//post
app.post("/", async(req,res) => {

    let param = {
        id_penggunaan: req.body.id_penggunaan
    }
    
    let pengguna = await penggunaan.findOne({where:param})
    let meter_awal = pengguna.meter_awal
    let meter_akhir = pengguna.meter_akhir
    let jumlah_meter = meter_akhir-meter_awal



    let data = {
        id_penggunaan: req.body.id_penggunaan,
        bulan: req.body.bulan,
        tahun: req.body.tahun,
        jumlah_meter: jumlah_meter,
        status: 0
    }

    tagihan.create(data)
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
        status: req.body.status
    }

    let param = {
        id_tagihan: req.body.id_tagihan
    }

    tagihan.update(data, {where:param})
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
app.delete("/:id_tagihan", async(req,res)=> {
    let param = {
        id_penggunaan: req.params.id_tagihan,
    }

    penggunaan.destroy({where:param})
    .then(result=> {
        res.json({
            message: "Data berhasil diupdate"
        })
    })
    .catch(error=> {
        res.json({
            message:error.message
        })
    })
})

module.exports = app