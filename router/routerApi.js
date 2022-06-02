const express = require('express')
const { Router } = require('express')
const { controladoresApi } = require('../controllers/controladoresApi.js')
const { createProductSchema, updateProductSchema } = require("../helpers/schema")
const validateInformation = require ("../helpers/middleware")

const routerApi = new Router()

let esAdmin = true

function soloParaAdmins(req, res, next) {
    if (esAdmin) {
        next()
    } else {
        res.sendStatus(403)
    }
}

//Rutas regulares

routerApi.use(express.json())
routerApi.use(express.urlencoded({ extended: true }))

routerApi.get('/api/productos', controladoresApi.getProductos)
routerApi.get('/api/productos/:idProducto', controladoresApi.getProducto)
routerApi.post('/api/productos', soloParaAdmins, validateInformation(createProductSchema), controladoresApi.postProductos)
routerApi.put('/api/productos/:idProducto', soloParaAdmins, validateInformation(updateProductSchema), controladoresApi.putProducto)
routerApi.delete('/api/productos/:idProducto', soloParaAdmins, controladoresApi.deleteProducto)

//Rutas para el Carrito

routerApi.get('/api/carrito', controladoresApi.getProductos)
routerApi.get('/api/carrito/:idProducto', controladoresApi.getProducto)
routerApi.post('/api/carrito', soloParaAdmins, validateInformation(createProductSchema), controladoresApi.postProductos)
routerApi.put('/api/carrito/:idProducto', soloParaAdmins, validateInformation(updateProductSchema), controladoresApi.putProducto)
routerApi.delete('/api/carrito/:idProducto', soloParaAdmins, controladoresApi.deleteProducto)




module.exports = { routerApi }