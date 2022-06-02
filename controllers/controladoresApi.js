const { databaseProductos } = require("../databases/databaseProductos.js")


const serverInfo = {
    os: 'windows',
    framework: 'express'
}

const controladoresApi = {
    getProducto: (req, res) => {
        const id = req.params.idProducto
        try {
            const productoBuscado = databaseProductos.obtenerSegunId(id)
            res.json(productoBuscado)
        } catch (error) {
            res.status(404).json({ error: error.message })
        }
    },
    getProductos: (req, res) => {
        console.log(req.query)
        if (Object.entries(req.query).length > 0) {
            res.json(databaseProductos.obtenerSegunRol(req.query.rol))
        }else {
            res.json(databaseProductos.obtenerTodos())
        }
    },
    postProductos:(req, res) => {
        const productoAgregado = databaseProductos.agregarProducto(req.body)
        res.status(201).json(productoAgregado)
    },
    deleteProducto: (req, res) => {
        const id = req.params.idProducto
        try {
            databaseProductos.borrarSegunId(id)
            res.sendStatus(204)
        } catch (error) {
            if (error) {
                res.status(404).json({ error: error.message })
            } else {
                res.status(500).json({ error: error.message })
            }
        }
    },
    putProducto: (req, res) => {
        const id = req.params.idProducto
        const datos = req.body
        try {
            const productoReemplazado = databaseProductos.reemplazarSegunId(id, datos)
            res.json(productoReemplazado)
        } catch (error) {
            if (error) {
                res.status(404).json({ error: error.message })
            } else {
                res.status(500).json({ error: error.message })
            }
        }
    }
}

module.exports = { controladoresApi }