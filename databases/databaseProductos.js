const { uuid } = require('uuidv4');

function generarTimeStamp() {  
    return `${Date.now()}`
}

function generarId() {
    return uuid()
}

const productos = [
    {
        id: "1",
        title: 'lapicera',
        price: 100,
        timestamp: "1654204329254",
        stock: 7,
        thumbnail: "https://www.shutterstock.com/es/image-photo/different-pens-55585345"
    },
    {
        id: "2",
        title: 'Mochila',
        price: 500,
        timestamp: "1654204329254",
        stock: 3,
        thumbnail: "https://www.shutterstock.com/es/image-photo/school-lunch-box-pink-backpack-on-1134685214"
    },
    {
        id: "3",
        title: 'Lapiz',
        price: 150,
        timestamp: "1654204329254",
        stock: 9,
        thumbnail: "https://www.shutterstock.com/es/image-photo/pencils-arrangement-isolated-on-white-background-1986526382"
    },
    {
        id: "4",
        title: 'Tijera',
        price: 350,
        timestamp: "1654204329254",
        stock: 11,
        thumbnail: "https://www.shutterstock.com/es/image-photo/green-scissors-isolated-on-white-background-1422866777"
    },
]


const databaseProductos = {
    obtenerTodos: () => {
        return [...productos]
    },
    obtenerSegunRol: rol => {
        return productos.filter(a => a.rol === rol)
    },
    obtenerSegunId: id => {
        const productoBuscado = productos.find(p => p.id === id)
        if(!productoBuscado){
            throw new Error("producto con ese id no existe")
        }else {
            return productoBuscado
        }
    },
    agregarProducto: datos => {
        const producto = datos
        producto.id = generarId()
        producto.timestamp = generarTimeStamp()
        productos.push(producto)
        return producto
    },
    borrarSegunId: ( id ) => {
        const indiceBuscado = productos.findIndex(p => p.id === id)
        if (indiceBuscado === -1) {
            throw new Error("el producto con ese id no existe 1")
        } 
        productos.splice(indiceBuscado, 1)
    },
    reemplazarSegunId: ( id, datos ) => {
        const indiceBuscado = productos.findIndex(p => p.id === id)
        if (indiceBuscado === -1) {
            throw new Error("el producto con ese id no existe")
        }else {
            const producto = datos
            producto.id = id
            productos[indiceBuscado] = producto
            return producto
        }
    },
    
}

module.exports = { databaseProductos }