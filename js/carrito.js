
let carritoStorage = localStorage.getItem("carritoProductos");
carritoStorage = JSON.parse(carritoStorage);

let contadorContainer = document.querySelector(".counter-container");

let eliminarTodo = document.querySelector("#delete-icon");

let botonPago = document.querySelector(".pay-button")

let carrito = []

function pagoAceptado () {
    botonPago.onclick = () => {
        Swal.fire({
            icon: "success",
            title: "Pago recibido",
            text: "Tus articulos estan en camino",
            confirmButtonText: "Confirmar",
            footer: '<a href="#">Ver factura</a>'
        }).then((result) => {
            if (result.isConfirmed){
                location.reload()
                localStorage.clear()
            }
        })
    }
}

function mostrarCarrito() {
    let carritoStorage = localStorage.getItem("carritoProductos");
    if (carritoStorage) {
        try {
            const carrito = JSON.parse(carritoStorage)
            const carritoContainer = document.getElementById("carrito-lista")

            carritoContainer.innerHTML = ''

            carrito.forEach(producto => {
                const card = document.createElement("div")
                card.className = "carrito"
                card.innerHTML = `<div>
                                    <h3>${producto.nombre}</h3>
                                    <div class="contador-producto">
                                        <button class="agregar">+</button>
                                        <span class="cantidad">${producto.cantidad || 0}</span>
                                        <button class="eliminar">-</button>
                                    </div>
                                </div>`;
                carritoContainer.appendChild(card)

                const botonAgregar = card.querySelector(".agregar")
                const botonEliminar = card.querySelector(".eliminar")
                const cantidadSpan = card.querySelector(".cantidad")

                botonAgregar.addEventListener("click", () => {
                    const cantidadActual = parseInt(cantidadSpan.textContent)
                    cantidadSpan.textContent = cantidadActual + 1
                    carrito[carrito.findIndex(p => p.id === producto.id)].cantidad++
                    localStorage.setItem("carritoProductos", JSON.stringify(carrito))
                    actualizarTotalCarrito()
                    if (cantidadActual > 0){
                        pagoAceptado()
                    }
                });
                botonEliminar.addEventListener("click", () => {
                    const cantidadActual = parseInt(cantidadSpan.textContent)
                    if (cantidadActual > 0) {
                        cantidadSpan.textContent = cantidadActual - 1
                        carrito[carrito.findIndex(p => p.id === producto.id)].cantidad--
                        localStorage.setItem("carritoProductos", JSON.stringify(carrito))
                        actualizarTotalCarrito()
                    } else {
                        const productoIndex = carrito.findIndex(p => p.id === producto.id)
                        carrito.splice(productoIndex, 1)
                        card.remove()
                        localStorage.setItem("carritoProductos", JSON.stringify(carrito))
                        actualizarTotalCarrito()
                }
            })
        })
        function actualizarTotalCarrito() {
            const total = carrito.reduce((total, producto) => {
                const precio = parseFloat(producto.precio) || 0 
                const cantidad = producto.cantidad || 0          
                return total + precio * cantidad
            }, 0)
            const elementoTotal = document.querySelector("#total")
            elementoTotal.textContent = `Total: $${total}`
            localStorage.setItem("totalCarrito", total)
        }
    } catch (error) {
        notificacionError()
    }
    finally{
        notificacion()
    }
    } else {
        notificacionCarritoVacio()
    }
}
function mostrarTotalGuardado() {
    const totalGuardado = localStorage.getItem("totalCarrito")
    if (totalGuardado) {
        const elementoTotal = document.querySelector("#total")
        elementoTotal.textContent = `Total guardado: $${totalGuardado}`
    }
}

mostrarTotalGuardado()
mostrarCarrito()

function eliminar() {
    eliminarTodo.onclick = () => {
        Swal.fire({
            icon: "question",
            title: "¿Quieres eliminar todos los articulos?",
            showDenyButton: true,
            confirmButtonText: "Confirmar",
            denyButtonText: `Cancelar`
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.clear();
                location.reload()
            } else if (result.isDenied) {
                Swal.fire("Articulos no eliminados", "", "info")
            }
        });
    }  
}

document.addEventListener('DOMContentLoaded', () => {
    eliminar()
})

function notificacionCarritoVacio () {
    Swal.fire({
        text: 'Carrito vacio',
        icon: 'info',
        confirmButtonText: 'Aceptar'
    })
}

function notificacion (){
    Toastify({
        text: "Productos recuperados con exito",
        className: "info",
        style: {
        background: "rgb(0,176,155)",
        background: "linear-gradient(324deg, rgba(0,176,155,1) 0%, rgba(107,194,88,1) 18%, rgba(150,201,61,1) 36%)", 
        }
    }).showToast()
}

function notificacionError () {
    Toastify({
        text: "Error al recuperar el carrito",
        className: "info",
        style: {
        background: "rgb(0,176,155)",
        background: "linear-gradient(324deg, rgba(0,176,155,1) 0%, rgba(194,88,88,1) 21%)", 
        }
    }).showToast()
}


