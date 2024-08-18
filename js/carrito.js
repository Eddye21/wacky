// //Recuperar carrito
// let carritoStorage = localStorage.getItem("carritoProductos")
// carritoStorage = JSON.parse(carritoStorage)

// let contadorContainer = document.querySelector(".counter-container")

// let productosTotales = 0

// // function counter () {
// //     let contador = document.createElement("div")
// //     contador.className = "contador-container"
// //     contador.innerHTML = `<button class="plus">+</button>
// //                         <spam class="numerador">0</spam>
// //                         <button class="minus">-</button>`
// //     contadorContainer.appendChild(contador)
// // }

// function counter () {
//     if (!contadorContainer.querySelector(".contador-container")){
//         let contador = document.createElement("div")
//         contador.className = "contador-container"
//         contador.innerHTML = `<button class="plus">+</button>
//                             <spam class="numerador">0</spam>
//                             <button class="minus">-</button>`
//                             contadorContainer.appendChild(contador)
//     }else{
//         const numerador = contadorContainer.getElementsByTagName(".numerodor")
//         numerador.textContent = productosTotales
//     }
// }

// function mostrarCarrito() {
//     let carritoStorage = localStorage.getItem("carritoProductos");
//     if (carritoStorage) {
//         try {
//             const carrito = JSON.parse(carritoStorage)
//             const carritoContainer = document.getElementById("carrito-lista")
//             carrito.forEach(producto => {
//             const card = document.createElement("div")
//             card.className = "carrito"
//             card.innerHTML = `<div>
//                 <h3>${producto.nombre}</h3>
//                 </div>`;
//             carritoContainer.appendChild(card);
//             counter()

//             });
//         } catch (error) {
//             console.error("Error al recuperar el carrito:", error);
//         }
//     } else {
//     console.log("No hay productos en el carrito");
//         }
// }
    
//     mostrarCarrito();


let carritoStorage = localStorage.getItem("carritoProductos")
carritoStorage = JSON.parse(carritoStorage)

let contadorContainer = document.querySelector(".counter-container")
let eliminarTodo= document.querySelector("#trash-icon")

function mostrarCarrito() {
    let carritoStorage = localStorage.getItem("carritoProductos");
    if (carritoStorage) {
        try {
            const  carrito = JSON.parse(carritoStorage)
            const carritoContainer = document.getElementById("carrito-lista")

            carritoContainer.innerHTML = '';

            carrito.forEach(producto => {
                const card = document.createElement("div")
                card.className = "carrito"
                card.innerHTML = `<div>
                                    <h3>${producto.nombre}</h3>
                                    <div class="contador-producto">
                                        <button class="minus">-</button>
                                        <span class="cantidad">${producto.cantidad || 1}</span>
                                        <button class="plus">+</button>
                                    </div>
                                </div>`;
                carritoContainer.appendChild(card);

                const botonesProducto = card.querySelectorAll(".plus, .minus");
                botonesProducto.forEach(boton => {
                    boton.addEventListener("click", (event) => {
                        const cantidadSpan = boton.parentNode.querySelector(".cantidad");
                        const cantidadActual = parseInt(cantidadSpan.textContent);
                        const productoIndex = carrito.findIndex(p => p.nombre === producto.nombre);

                        if (event.target.classList.contains("plus")) {
                            cantidadSpan.textContent = cantidadActual + 1;
                            carrito[productoIndex].cantidad++;
                        } else {
                            if (cantidadActual > 1) {
                                cantidadSpan.textContent = cantidadActual - 1;
                                carrito[productoIndex].cantidad--;
                                if (carrito[productoIndex].cantidad === 0) {
                                    carrito.splice(productoIndex, 1);
                                    card.remove();
                                }
                            }
                        }
                        localStorage.setItem("carritoProductos", JSON.stringify(carrito));

                        actualizarTotalCarrito()
                    });
                });
            });
        } catch (error) {
            console.error("Error al recuperar el carrito:", error);
        }
    } else {
        console.log("No hay productos en el carrito");
    }
}

function actualizarTotalCarrito() {
    const total = carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
    const elementoTotal = document.getElementById("total-carrito");
    elementoTotal.textContent = `Total: $${total}`;
}

mostrarCarrito();

function eliminar () {
    eliminarTodo.onclick = () => {
        console.log(localStorage.clear());
    }
} eliminar()


