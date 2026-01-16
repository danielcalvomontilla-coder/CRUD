const express = require('express');
const route = express.Router();
let usuarios = require('../BBDD/usersList.js');

///get all users
route.get('/', (req, res) => res.json(usuarios));

///get user by name
route.get('/:nombre', (req, res) => {
    const name = req.params.nombre
    const user = usuarios.find(u => u.nombre.toLocaleLowerCase() === name.toLocaleLowerCase())

    if (!user) {
        res.status(404).json({mensaje: `El usuario con nombre ${name} no existe`})
    } else {
     res.json(user)
    }    
}); 

//Create new user

route.post('/', (req, res) => {
    const newUser = {
        id: usuarios[usuarios.length - 1].id + 1, 
        nombre: req.body.nombre, 
        edad: req.body.edad, 
        lugarProcedencia: req.body.lugarProcedencia,
    }
    usuarios.push(newUser)
    res.redirect('/usuarios')
});

//PUT update user

route.put('/:nombre', (req, res) => {
    const name = req.params.nombre
    const user = usuarios.findIndex(u => u.nombre.toLocaleLowerCase() === name.toLocaleLowerCase())
    if(user === -1){
        res.status(404).json({mensaje: `El usuario con nombre ${name} no existe`})
    } else {
        usuarios[user].nombre = req.body.nombre
        usuarios[user].edad = req.body.edad
        usuarios[user].lugarProcedencia = req.body.lugarProcedencia
    }
    res.json(usuarios[user])
});

//Delete user

route.delete('/:nombre', (req, res) => {
    const name = req.params.nombre
    const user = usuarios.some(u => u.nombre.toLocaleLowerCase() === name.toLocaleLowerCase())
    if(!user){
        res.status(404).json({mensaje: `El usuario con nombre ${name} no existe`})
    } else {
        usuarios = usuarios.filter(u => u.nombre.toLocaleLowerCase() !== name.toLocaleLowerCase())
        res.json({mensaje: `Usuario ${name} eliminado correctamente`})
    }  
})

module.exports = route;