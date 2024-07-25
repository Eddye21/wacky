
const productos = [
    { id: 1, nombre: "Ramera nike", precio: 1500 },
    { id: 2, nombre: "Pantalon addidas", precio: 2000 },
    { id: 3, nombre: "Sombreros", precio: 1200 },
    { id: 4, nombre: "zapatillas converse", precio: 1800 },
    { id: 5, nombre: "vaqueros", precio: 900}

];

const listaProductos = document.getElementById('lista-productos');
const contenidoCarrito = document.getElementById('contenido-carrito');
const btnVaciarCarrito = document.getElementById('vaciar-carrito');


let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function mostrarProductos() {
    listaProductos.innerHTML = '';
    productos.forEach(producto => {
        const div = document.createElement('div');
        div.innerHTML = `
            <span>${producto.nombre} - $${producto.precio}</span>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar</button>
        `;
        listaProductos.appendChild(div);
    });
}

function agregarAlCarrito(id) {
    const producto = productos.find(prod => prod.id === id);
    carrito.push(producto);
    guardarCarrito();
    mostrarCarrito();
}

function mostrarCarrito() {
    contenidoCarrito.innerHTML = '';
    const productosCarrito = carrito.reduce((acc, producto) => {
        acc[producto.id] = (acc[producto.id] || 0) + 1;
        return acc;
    }, {});

    Object.keys(productosCarrito).forEach(id => {
        const producto = productos.find(prod => prod.id == id);
        const div = document.createElement('div');
        div.classList.add('carrito-item');
        div.innerHTML = `
            <span>${producto.nombre} x ${productosCarrito[id]} - $${producto.precio * productosCarrito[id]}</span>
            <button onclick="eliminarDelCarrito(${producto.id})">Eliminar</button>
        `;
        contenidoCarrito.appendChild(div);
    });
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(producto => producto.id !== id);
    guardarCarrito();
    mostrarCarrito();
}


function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}


btnVaciarCarrito.addEventListener('click', () => {
    carrito = [];
    guardarCarrito();
    mostrarCarrito();
});


mostrarProductos();
mostrarCarrito();


