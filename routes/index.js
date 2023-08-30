const express = require("express")
const router = express.Router()
const Usuarios = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


//HASH ----> HASHEA LA INFO

//const salt = 10

// const hashPassword = async(contrasena, salt)=>{
//     const hash = await bcrypt.hash(contrasena, salt)

//     console.log("CONTRASENA HASHEADA----->",hash)
// }

//hashPassword("1234", salt)

//COMPARE -----> COMPARA SI UN VALOR ES IGUAL A OTRO VALOR HASHEADO
const check = async(userPassword, dbPassword)=>{
    const match = await bcrypt.compare(userPassword, dbPassword)
    console.log("MATCH---->",match)
}

check("asdad", "$2b$10$9uF3Dgw1vskhmGqJJteWROB5QLkD5lgF5/tyW9c4vYAehV1Z0O1cW" )

// const payload = {
//     usuario: 'mpugliese',
//     contrasena: "$2b$10$9uF3Dgw1vskhmGqJJteWROB5QLkD5lgF5/tyW9c4vYAehV1Z0O1cW"
// }



//const token = jwt.sign(payload, secret, {expiresIn: "1h"})

//console.log("TOKEN------->", token)

router.post("/", async(req, res)=>{
    console.log("REQBODY---->", req.body)
    try{
        const saltRound = 10
        const hash = await bcrypt.hash(req.body.contrasena, saltRound)
        const user = await Usuarios.create({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            usuario: req.body.usuario,
            contrasena: hash
        })
        const payload = {
            contrasena: user.contrasena
        }
        const secret = "palabraSecreta"
        const token = jwt.sign(
            payload,
            secret, 
            {expiresIn: "1h"}
            )
        res.status(201).send('Usuario creado con exito' + token)
    }catch(error){
        console.log(error)
    }
})

const passHash = "$2b$10$9uF3Dgw1vskhmGqJJteWROB5QLkD5lgF5/tyW9c4vYAehV1Z0O1cW"

//JWT
//SIGN
//payload, secret, option



// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoibXB1Z2xpZXNlIiwiY29udHJhc2VuYSI6IiQyYiQxMCQ5dUYzRGd3MXZza2htR3FKSnRlV1JPQjVRTGtENWxnRjUvdHlXOWM0dllBZWhWMVowTzFjVyIsImlhdCI6MTY5MzI2NTE2NywiZXhwIjoxNjkzMjY4NzY3fQ.R5fNUi2GQ5UEDRJ7QQuCcHvm14LOD0yTN73cDtk4zy4"

//VERIFY



// try{
// const decodificado = jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoibXB1Z2xpZXNlIiwiY29udHJhc2VuYSI6IiQyYiQxMCQ5dUYzRGd3MXZza2htR3FKSnRlV1JPQjVRTGtENWxnRjUvdHlXOWM0dllBZWhWMVowTzFjVyIsImlhdCI6MTY5MzI2NTE2NywiZXhwIjoxNjkzMjY4NzY3fQ.R5fNUi2GQ5UEDRJ7QQuCcHvm14LOD0yTN73cDtk4zsdfy4", secret)
// }catch(error){
//     console.log(error.message)
// }


// iat: 1693265479,
// exp: 1693269079





router.get("/", async (req,res)=>{
    try{
       const users = await Usuarios.find()
       let bdpassword = users[1].contrasena
       let contrasena = "asdasd"

       const match = await bcrypt.compare(contrasena, bdpassword)
       //ACA
        res.status(200).send(match)
    }catch(error){
        console.log(error)
    }
})

module.exports = router


//BCRYPT
//HASH y COMPARE

//contrasena y salt


//JWT
//    SIGN y VERIFY
//    payload, secret, options