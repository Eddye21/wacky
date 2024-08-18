
const productos = [
    {id: 1, nombre: "Camiseta negra", precio: 12.99},
    {id: 2, nombre: "Camiseta nova", precio: 19.99}
];

const carrito = []

const containers = document.querySelectorAll(".card");

function notificacion (){
    Toastify({
        text: "Producto agregado con exito",
        className: "info",
        style: {
        // background: "linear-gradient(to right, #00b09b, #96c93d)",
        background: "rgb(0,176,155)",
        background: "linear-gradient(324deg, rgba(0,176,155,1) 0%, rgba(107,194,88,1) 18%, rgba(150,201,61,1) 36%)", 
        }
    }).showToast()
}

function mostrarCarrito() {
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

function agregarAlCarrito () {
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


