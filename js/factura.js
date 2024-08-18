let carritoStorage = localStorage.getItem("carritoProductos");
carritoStorage = JSON.parse(carritoStorage);

let contadorContainer = document.querySelector(".counter-container");

let carrito = []

function mostrarCarrito() {
    let carritoStorage = localStorage.getItem("carritoProductos");
            const carrito = JSON.parse(carritoStorage)
            const carritoContainer = document.getElementById("carrito-lista")

            carritoContainer.innerHTML = ""
            carrito.forEach(producto => {
                const card = document.createElement("div")
                card.className = "carrito"
                card.innerHTML = `<div>
                                    <h3>${producto.nombre}</h3>
                                    <div class="contador-producto">
                                        <span class="cantidad">${producto.cantidad || 0}</span>
                                    </div>
                                </div>`;
                carritoContainer.appendChild(card)
                actualizarTotalCarrito()
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



