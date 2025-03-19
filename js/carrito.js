//PARA LA PÁGINA DEL CARRITO
const conteiner = document.getElementById("ventas");
let unidadesElement = document.getElementById("unidades");
let precioElement = document.getElementById("precio-total");
let reinicia = document.getElementById("reiniciar");

/** Crea las tarjetas de productos teniendo en cuenta la lista en carrito.json */
function prodCarrito() {
    conteiner.innerHTML = ``;
    const elementos = JSON.parse(localStorage.getItem("Carrito"));
    if (elementos && elementos.length > 0) {
        elementos.forEach(element => {
            const accesorioCarrito = document.createElement("div");
            accesorioCarrito.classList = "tarjeta-producto-carrito"
            accesorioCarrito.innerHTML = `
            <img src="/images/${element.nom}.jpg" alt="Accesorio patin artistico">
            <h3>${element.nom}</h3>
            <p class="precio">$${element.precio}</p>
            <div class="suma-resta">
                <button>-</button>
                <span class="cantidad">${element.cantidad}</span>
                <button>+</button>
            </div>
            `
            conteiner.appendChild(accesorioCarrito);
            accesorioCarrito.getElementsByTagName("button")[1].addEventListener("click", (e) => {
                const cuenta = e.target.parentElement.getElementsByTagName("span")[0];
                cuenta.innerText = agregarAlCarrito(element);
                actualizarTotales();
            });
            accesorioCarrito.getElementsByTagName("button")[0].addEventListener("click", () => {
                restarAlCarrito(element);
                prodCarrito();
                actualizarTotales();
            });
        });
    } else {
        localStorage.removeItem("Carrito");
    }
}

prodCarrito();
actualizarTotales();

function agregarAlCarrito(element) {
    let elementos = JSON.parse(localStorage.getItem("Carrito"));
    let cuenta = 0;
    if (!elementos || elementos.length === 0) { //En caso de que aun no haya nada en el carrito
        const nuevoProducto = element;
        nuevoProducto.cantidad = 1;
        localStorage.setItem("Carrito", JSON.stringify([nuevoProducto]));
        cuenta = 1;
    } else { //Hay algo pero tengo que ver si del producto que agrego es el primero o no 
        const ind = elementos.findIndex(car => car.nom === element.nom);
        const nuevoCarrito = elementos;
        if (ind === -1) { //Primero que agrego de ese producto
            element.cantidad = 1;
            nuevoCarrito.push(element);
            cuenta = 1;
        } else { //Ya se habia pedido algo de ese producto
            nuevoCarrito[ind].cantidad++;
            cuenta = nuevoCarrito[ind].cantidad;
        }
        localStorage.setItem("Carrito", JSON.stringify(nuevoCarrito));
        actualizarNumero();
        return cuenta;
    }
}

function restarAlCarrito(element) {
    let elementos = JSON.parse(localStorage.getItem("Carrito"));
    if (elementos && elementos.length > 0) {
        const ind = elementos.findIndex(car => car.nom === element.nom);
        if (elementos[ind].cantidad === 1) {
            //borro todo el elemento
            elementos.splice(ind, 1);
        } else {
            elementos[ind].cantidad--;
        }
        localStorage.setItem("Carrito", JSON.stringify(elementos));
        actualizarNumero();
    } else {
        localStorage.removeItem("Carrito");
    }

}

const cuentaCarrito = document.getElementById("cuenta-carrito");

function actualizarNumero() {
    let elementos = JSON.parse(localStorage.getItem("Carrito"));
    if (elementos && elementos.length > 0) {
        const suma = elementos.reduce((acum, current) => acum + current.cantidad, 0);
        cuentaCarrito.innerText = suma;
    } else {
        cuentaCarrito.innerText = 0;
    }

}

actualizarNumero();


function actualizarTotales() {
    const elementos = JSON.parse(localStorage.getItem("Carrito"));
    let acumulaUnidad = 0;
    let acumulaPrecio = 0;
    if (elementos && elementos.length > 0) {
        elementos.forEach(element => {
            acumulaUnidad += element.cantidad;
            acumulaPrecio += element.cantidad * element.precio;
        })
        unidadesElement.innerText = acumulaUnidad;
        precioElement.innerText = acumulaPrecio;
    } else {
        unidadesElement.innerText = 0;
        precioElement.innerText = 0;
    }
}

//Cuando reinicio el carrito ecesitaría sacar la clave del LocalStorage
reinicia.addEventListener("click", reiniciarCarrito);
function reiniciarCarrito() {
    localStorage.removeItem("Carrito");
    actualizarTotales();
    prodCarrito();
    cuentaCarrito.innerText = 0;
}
