const { uuid } = require('uuidv4');

function generarId() {
    return uuid()
}

class Carrito {
    constructor(id) {
        this.id = id;
        this.productos = []
    }
}

const databaseCarrito = {
    crearCarrito: () => {
        const carrito = new Carrito()
        carrito.id = generarId()
        carritos.push(carrito)
        mostrarCarritos()
        return carrito.id  
    },
    eliminarCarrito: (id) => {
        console.log(id)
        const indiceBuscado = carritos.findIndex(c => c.id === id)
        if (indiceBuscado === -1) {
            throw new Error("el carrito con ese id no existe 1")
        } 
        carritos.splice(indiceBuscado, 1)
    },
    obtenerProductosCarritoSegunId: id => {
        const carrito = carritos.find(c => c.id === id)
        if(!carrito){
            throw new Error("carrito con ese id no existe")
        }else {
            if (carrito.productos.length === 0) {
                return "el carrito no tiene productos"
            }
            return carrito.productos
        }
    },
    agregarProductosCarrito: ( id, datos ) => {
        const indiceBuscado = carritos.findIndex(c => c.id === id)
        if (indiceBuscado === -1) {
            throw new Error("carrito con ese id no existe")
        }
        console.log(datos)
        const productos = datos
        const carrito = carritos[indiceBuscado]
        for (let index = 0; index < productos.length; index++) {
            const producto = productos[index];
            if (!tieneProducto(carrito, producto)) {
                carrito.productos.push(producto)
            }
        }
        carritos[indiceBuscado] = carrito
        mostrarCarritos()
        return carritos[indiceBuscado]
    },
    eliminarProductoCarrito: (idCarrito, idProducto) => {
        console.log(idCarrito)
        console.log(idProducto)
        const indiceCarrito = carritos.findIndex(c => c.id === idCarrito)
        if (indiceCarrito === -1) {
            throw new Error("carrito con ese id no existe")
        }
        const carrito = carritos[indiceCarrito]
        const indiceProductosCarrito = carrito.productos.findIndex(p => p.id === idProducto)
        if (indiceProductosCarrito === -1) {
            throw new Error("el carrito no contiene ese producto")
        }
        
        carrito.productos.splice(indiceProductosCarrito, 1)
        carritos[indiceCarrito] = carrito
        mostrarCarritos()
    }
}

const carritos = []

function tieneProducto(carrito, producto) {
    return carrito.productos.find(p => p.id === producto.id)
}

function mostrarCarritos() {
    for (let index = 0; index < carritos.length; index++) {
        const element = carritos[index];
        console.log(index)
        console.log(element.id)
        console.log(element.productos)
        console.log("----------------------")
    }
}

module.exports = { databaseCarrito }