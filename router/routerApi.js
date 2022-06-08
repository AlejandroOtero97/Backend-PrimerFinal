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


routerApi.post('/api/carrito', controladoresApi.postCarrito)
routerApi.post('/api/carrito/:idCarrito/productos', controladoresApi.postProductosCarrito)
routerApi.delete('/api/carrito/:idCarrito', controladoresApi.deleteCarrito)
routerApi.delete('/api/carrito/:idCarrito/productos/:idProducto', controladoresApi.deleteProductoCarrito)
routerApi.get('/api/carrito/:idCarrito', controladoresApi.getCarrito)

routerApi.get("*", (req, res) => {
    res.send("Esta Ruta no existe, vuelva a intentar!")
})


module.exports = { routerApi }