const mongoose = require('mongoose')

const Usuarios = new mongoose.Schema(
    {
        nombre: {type: String, require: [true, "Falta el nombre"]},
        apellido: {type: String, require: [true, "Falta el apellido"]},
        usuario: {type: String, require: [true, "Falta el user"]},
        contrasena: {type: String, require: [true, "Falta la pass"]}
    }
)

module.exports = mongoose.model('usuarios', Usuarios)