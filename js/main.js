
const carrito = []

async function obtenerProductos() {
    const repuesta = await fetch("../db/articulos.JSON")
    const productos = await repuesta.json();
    return productos
}

function notificacion (){
    Toastify({
        text: "Producto agregado con exito",
        className: "info",
        style: {
        background: "rgb(0,176,155)",
        background: "linear-gradient(324deg, rgba(0,176,155,1) 0%, rgba(107,194,88,1) 18%, rgba(150,201,61,1) 36%)", 
        }
    }).showToast()
}
async function mostrarCarrito() {
    const productos = await obtenerProductos()
    const containers = document.querySelectorAll(".card")

    for (let i = 0; i < containers.length; i++){
            const container = containers[i];
            const producto = productos[i];
        const card = document.createElement("div")
        card.className = "card-body"
        card.innerHTML = `<h3> ${producto.nombre} </h3>
                            <p> $${producto.precio} </p>
                            <button class="btn btn-primary" id="${producto.id}"> Agregar al carrito </button>`
        container.appendChild(card)
    }
    agregarAlCarrito()
}

mostrarCarrito(productos)

async function agregarAlCarrito () {
    const productos = await obtenerProductos()
    agregarBoton = document.querySelectorAll(".btn")
    agregarBoton.forEach((boton) => {
        boton.onclick = (e) => {
            const productoId = e.currentTarget.id
            const seleccionarProductos = productos.find(producto => producto.id == productoId)
            carrito.push(seleccionarProductos)
            notificacion()
            localStorage.setItem("carritoProductos", JSON.stringify(carrito))
        }
    })
}


