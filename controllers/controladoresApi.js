const { databaseProductos } = require("../databases/databaseProductos.js")
const { databaseCarrito } = require("../databases/databaseCarrito.js")


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
    },
    postCarrito:(req, res) => {
        const idCarrito = databaseCarrito.crearCarrito(req.body)
        res.json(idCarrito)
    },
    deleteCarrito: (req, res) => {
        const id = req.params.idCarrito
        try {
            databaseCarrito.eliminarCarrito(id)
            res.sendStatus(204)
        } catch (error) {
            if (error) {
                res.status(404).json({ error: error.message })
            } else {
                res.status(500).json({ error: error.message })
            }
        }
    },
    getCarrito: (req, res) => {
        const id = req.params.idCarrito
        try {
            const productosCarrito = databaseCarrito.obtenerProductosCarritoSegunId(id)
            res.json(productosCarrito)
        } catch (error) {
            res.status(404).json({ error: error.message })
        }
    },
    postProductosCarrito:(req, res) => {
        const id = req.params.idCarrito
        const datos = req.body
        const productoAgregadoCarrito = databaseCarrito.agregarProductosCarrito(id, datos)
        res.status(201).json(productoAgregadoCarrito)
    },
    deleteProductoCarrito:(req, res) => {
        const idCarrito = req.params.idCarrito
        const idProductoCarrito = req.params.idProducto
        try {
            databaseCarrito.eliminarProductoCarrito(idCarrito, idProductoCarrito)
            res.sendStatus(204)
        } catch (error) {
            res.status(404).json({ error: error.message })
        }
    }
}

module.exports = { controladoresApi }