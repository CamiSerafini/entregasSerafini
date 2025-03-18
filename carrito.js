//PARA LA PÁGINA DEL CARRITO
const conteiner = document.getElementById("ventas");

const elementos = JSON.parse(localStorage.getItem("Carrito"));

/** Crea las tarjetas de productos teniendo en cuenta la lista en bicicletas.js */
function prodCarrito(){
    if(elementos && elementos.length>0){
        elementos.forEach(element => {
            const accesorioCarrito = document.createElement("div");
            accesorioCarrito.classList = "tarjeta-producto-carrito"
            accesorioCarrito.innerHTML = `
            <img src="/images/${element.nom}.jpg" alt="Accesorio patin artistico">
            <h3>${element.nom}</h3>
            <p class="precio">$${element.precio}</p>
            <div class="suma-resta">
                <button>-</button>
                <span class="cantidad">0</span>
                <button>+</button>
            </div>
            `
            conteiner.appendChild(accesorioCarrito);
            accesorioCarrito.getElementsByTagName("button")[1].addEventListener("click",() => agregarAlCarrito(element));
            accesorioCarrito.getElementsByTagName("button")[0].addEventListener("click",() => restarAlCarrito(element));
        });

    };
}
prodCarrito();

function agregarAlCarrito(element){
    if(!elementos || elementos.length === 0){ //En caso de que aun no haya nada en el carrito
        const nuevoProducto = element;
        nuevoProducto.cantidad = 1;
        localStorage.setItem("Carrito",JSON.stringify([nuevoProducto]));
    }else{ //Hay algo pero tengo que ver si del producto que agrego es el primero o no 
        const ind = elementos.findIndex(car=> car.nom === element.nom);
        const nuevoCarrito = elementos;
        if(ind === -1){ //Primero que agrego de ese producto
            element.cantidad = 1;
            nuevoCarrito.push(element);
        }else{ //Ya se habia pedido algo de ese producto
            nuevoCarrito[ind].cantidad++;
        }
        localStorage.setItem("Carrito",JSON.stringify(nuevoCarrito));
        actualizarNumero();
    }
} 

const cuentaCarrito = document.getElementById("cuenta-carrito");

function actualizarNumero(){
    const suma = elementos.reduce((acum,current)=>acum + current.cantidad, 0);
    cuentaCarrito.innerText = suma;
}

actualizarNumero();


