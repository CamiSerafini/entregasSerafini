//MES A MES ESTA LISTA SE RENUEVA: teniendo en cuenta quienes probaron clases y quieren continuar, o quienes son bajas.
async function getData(url, clave) {
    try {
        // Verifica si ya existen datos en localStorage
        if (!localStorage.getItem(clave)) {
            const response = await fetch(url);
            const data = await response.json();
            localStorage.setItem(clave, JSON.stringify(data));
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

//Solo me va a cargar los datos si el localStorage con esa clave esta vacio, lo hice porque sino siempre que recargo
//la página se me reiniciaban estos 3 arrays.
getData('/json/adolescents.json', "Adolescentes");
getData('/json/adultos.json', "Adultos");
getData('/json/mayores.json', "Mayores");

let adolescentes = JSON.parse(localStorage.getItem("Adolescentes")) || [];
let adultos = JSON.parse(localStorage.getItem("Adultos")) || [];
let mayores = JSON.parse(localStorage.getItem("Mayores")) || [];


let datosGuardados = [];

//Guardar los datos que ya tengo en los arrays en datosGuardados para incluir todo luego en localStorage, no solo los nuevos ingresos
function cargaAlumnos() {
    for (let i = 0; i < adolescentes.length; i++) {
        datosGuardados.push(adolescentes[i]);
    }
    for (let i = 0; i < adultos.length; i++) {
        datosGuardados.push(adultos[i]);
    }
    for (let i = 0; i < mayores.length; i++) {
        datosGuardados.push(mayores[i]);
    }
    localStorage.setItem("Datos", JSON.stringify(datosGuardados));
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------

function disponibilidad(cupos) {
    if (cupos.length < 10) {
        return 1;
    } else {
        return 0;
    }
}

function mensajeInscripcion(num) {
    if(!num){
        Swal.fire({
            icon: "warning",
            title: "Lo sentimos, no se ha podido inscribir por falta de cupos",
            showConfirmButton: false,
            timer: 3000
        });
    }else{
        if(num==1){
            Swal.fire({
                icon: "success",
                title: "Inscripción exitosa",
                showConfirmButton: false,
                timer: 2000
            });
        }else{
            Swal.fire({
                icon: "error",
                title: "Lo sentimos, no disponemos de clases para esa edad",
                showConfirmButton: false,
                timer: 3000
            });
        }
    }
}

function ingresante(edad) {
    this.nombre = (document.getElementById("nombre").value).toLowerCase();
    this.apellido = (document.getElementById("apellido").value).toLowerCase();
    this.edad = edad;
    this.correo = document.getElementById("correo").value;
    this.telefono = document.getElementById("telefono").value;
}

function sacarTurno() {
    cambios = 1;
    let edad = document.getElementById("edad").value;
    edad = parseInt(edad);
    let no = document.getElementById("inscripcionCorrecta");
    let nuevoIngreso = new ingresante(edad);
    //Los datos se guardaran en el local storage en cualquier caso para tener un registro de todos los contactos
    datosGuardados = JSON.parse(localStorage.getItem("Datos"));
    datosGuardados.push(nuevoIngreso);
    localStorage.setItem("Datos", JSON.stringify(datosGuardados));
    if (edad < 4 || edad > 60) {
        mensajeInscripcion(2);
    }
    else {
        if (edad < 19) {
            if (disponibilidad(adolescentes)) {
                adolescentes = JSON.parse(localStorage.getItem("Adolescentes"));
                adolescentes.push(nuevoIngreso);
                localStorage.setItem("Adolescentes", JSON.stringify(adolescentes));
                mensajeInscripcion(1);
            }
            else {
                mensajeInscripcion(0);
            }
        }
        else {
            if (edad < 41) {
                if (disponibilidad(adultos)) {
                    adultos = JSON.parse(localStorage.getItem("Adultos"));
                    adultos.push(nuevoIngreso);
                    localStorage.setItem("Adultos", JSON.stringify(adultos));
                    mensajeInscripcion(1);
                }
                else {
                    mensajeInscripcion(0);
                }
            }
            else {
                if (disponibilidad(mayores)) {
                    mayores = JSON.parse(localStorage.getItem("Mayores"));
                    mayores.push(nuevoIngreso);
                    localStorage.setItem("Mayores", JSON.stringify(mayores));
                    mensajeInscripcion(1);
                }
                else {
                    mensajeInscripcion(0);
                }
            }
        }

    }

    let formulario = document.getElementById("formuJs");

    function habilitarFormulario() {
        formulario.reset();

        const inputs = formulario.querySelectorAll("input");
        inputs.forEach(input => input.disabled = false);

        no.removeChild(recargar);
        no.removeChild(confirmo);
    }

    let recargar = document.createElement("button");
    recargar.className = "botonCentro";
    recargar.textContent = "¿Quiere cargar otros datos?";
    no.appendChild(recargar);
    recargar.addEventListener("click", habilitarFormulario);

    let confirmo = document.createElement("button");
    confirmo.textContent = "Confirmo los datos ingresados";
    confirmo.className = "botonCentro";
    no.appendChild(confirmo);
    confirmo.addEventListener("click", function () {
        formulario.reset();
        no.removeChild(recargar);
        no.removeChild(confirmo);
    });
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------

function refrescarPagina() {
    setTimeout(function () {
        location.reload(); // Recarga la página
    }, 2500);
}

function noRecibir(nombre, apellido) {
    let contacto = document.createElement("button");
    contacto.textContent = `Para no recibir mas informacion haga click aqui`;
    formularioBaja.appendChild(contacto);
    contacto.addEventListener("click", function (event) {
        event.preventDefault();
        datosGuardados = JSON.parse(localStorage.getItem("Datos"));
        const posicion = datosGuardados.findIndex(dato => dato.nombre === nombre && dato.apellido === apellido);
        if (posicion >= 0) {
            datosGuardados.splice(posicion, 1);
            localStorage.setItem("Datos", JSON.stringify(datosGuardados));
        }
        let regreso = document.createElement("p");
        regreso.textContent = `Que pena. Esperamos verte nuevamente. En breve se reiniciará la pagina`;
        formularioBaja.appendChild(regreso);
        refrescarPagina();
    });
}

function cartelEliminaBien(){
    Swal.fire({
        title: "Usted se ha dado de baja correctamente",
        icon: "success"
    });
}

function cartelNoExiste(){
    Swal.fire({
        title: "Usted no se encuentra inscripto",
        icon: "error"
    });
}

function baja() {
    cambios=1;
    let nombre = (document.getElementById("nombreBaja").value).toLowerCase();
    let apellido = (document.getElementById("apellidoBaja").value).toLowerCase();
    let edad = parseInt(document.getElementById("edadBaja").value);
    let posicion;

    if (edad < 4 || edad > 60) {
        cartelNoExiste();
        refrescarPagina();
    }
    else {
        if (edad < 19) {
            posicion = adolescentes.findIndex(adol => adol.nombre === nombre && adol.apellido === apellido);
            if (posicion >= 0) {
                adolescentes = JSON.parse(localStorage.getItem("Adolescentes"));
                adolescentes.splice(posicion, 1);
                localStorage.setItem("Adolescentes", JSON.stringify(adolescentes));
                cartelEliminaBien();
            }
            else {
                cartelNoExiste();
                refrescarPagina();
            }
        }
        else {
            if (edad < 41) {
                posicion = adultos.findIndex(adult => adult.nombre === nombre && adult.apellido === apellido);
                if (posicion >= 0) {
                    adultos = JSON.parse(localStorage.getItem("Adultos"));
                    adultos.splice(posicion, 1);
                    localStorage.setItem("Adutlos", JSON.stringify(adultos));
                    cartelEliminaBien();
                }
                else {
                    cartelNoExiste();
                    refrescarPagina();
                }
            }
            else {
                posicion = mayores.findIndex(may => may.nombre === nombre && may.apellido === apellido);
                if (posicion >= 0) {
                    mayores = JSON.parse(localStorage.getItem("Mayores"));
                    mayores.splice(posicion, 1);
                    localStorage.setItem("Mayores", JSON.stringify(mayores));
                    cartelEliminaBien();
                }
                else {
                    cartelNoExiste();
                    refrescarPagina();
                }
            }
        }
    }
    rep = 1;
    if (posicion >= 0) {
        noRecibir(nombre, apellido);
    }

}

//-----------------------------------------------------------------------------------------------------------------------------------------------------

getData('/json/productos.json', "Productos");
let productos = JSON.parse(localStorage.getItem("Productos")) || [];

getData('/json/carrito.json',"Carrito");
let carrito = JSON.parse(localStorage.getItem("Carrito")) || [];

// let cubres = document.getElementById("cubres");
// let remera = document.getElementById("remera");
// let bolsos = document.getElementById("bolsos");
// let campera = document.getElementById("campera");
// let gala = document.getElementById("gala");

// function agregandoCarrito(elem,val){
//     const existe = carrito.find(prod => prod.nombre === elem);
//     if(existe){
//         existe.cantidad++;
//     }else{
//         carrito.push({
//             nom:elem,cantidad:1,precio:val
//         })
//     }
// }

// cubres.addEventListener("click",agregandoCarrito("cubres",5000));
// remera.addEventListener("click",agregandoCarrito("remera",10000));
// bolsos.addEventListener("click",agregandoCarrito("bolsos",12000));
// campera.addEventListener("click",agregandoCarrito("campera",20000));
// gala.addEventListener("click",agregandoCarrito("gala",70000));

const contenedor = document.getElementById("ventas");

/** Crea las tarjetas de productos teniendo en cuenta la lista en bicicletas.js */
function crearProductos(productos){
  productos.forEach(producto => {
    const nuevoAccesorio = document.createElement("div");
    nuevoAccesorio.classList = "tarjeta-producto"
    nuevoAccesorio.innerHTML = `
    <img src="/images/${producto.nom}.jpg" alt="Accesorio patin artistico">
    <h3>${producto.nom}</h3>
    <p class="precio">$${producto.precio}</p>
    <button class="boton-carrito">Agregar al carrito</button>`
    contenedor.appendChild(nuevoAccesorio);
    nuevoAccesorio.getElementsByTagName("button")[0].addEventListener("click",() => agregarAlCarrito(producto))
  });
}
crearProductos(productos);

function agregarAlCarrito(producto){
    if(!carrito || carrito.length === 0){ //En caso de que aun no haya nada en el carrito
        const nuevoProducto = producto;
        nuevoProducto.cantidad = 1;
        localStorage.setItem("Carrito",JSON.stringify([nuevoProducto]));
    }else{ //Hay algo pero tengo que ver si del producto que agrego es el primero o no 
        const ind = carrito.findIndex(car=> car.nom === producto.nom);
        const nuevoCarrito = carrito;
        if(ind === -1){ //Primero que agrego de ese producto
            producto.cantidad = 1;
            nuevoCarrito.push(producto);
        }else{ //Ya se habia pedido algo de ese producto
            nuevoCarrito[ind].cantidad++;
        }
        localStorage.setItem("Carrito",JSON.stringify(nuevoCarrito));
        actualizarNumero();
    }
} 

const cuentaCarrito = document.getElementById("cuenta-carrito");

function actualizarNumero(){
    const suma = carrito.reduce((acum,current)=>acum + current.cantidad, 0);
    cuentaCarrito.innerText = suma;
}

actualizarNumero(); // Asi cuando refresco la pagina sigue apareciendo el numero y no se me pone en 0
//-----------------------------------------------------------------------------------------------------------------------------------------------------

//Inicializar "Base de Datos"
cargaAlumnos();

let cambios=0;

//SACAR TURNO - 1ER FUNCION

document.getElementById("formuJs").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita que se recargue la pagina al enviar el formulario
    sacarTurno();
});


//DARSE DE BAJA - 2DA FUNCION
//AL DARSE DE BAJA, ¿QUIERE SEGUIR RECIBIENDO INFORMACIÓN? - 3ER FUNCION

let botonBaja = document.getElementById("botonBaja");
let bajaTeam = document.getElementById("baja");
let formularioBaja = document.createElement("form");
formularioBaja.id = "formuBaja";
botonBaja.addEventListener("click", function () {
    formularioBaja.innerHTML = `        
        <label for="nombreBaja">Nombre</label>
        <input type="text" id="nombreBaja" name="nombre" class="baja" required>
        <label for="apellidoBaja">Apellido</label>
        <input type="text" id="apellidoBaja" name="apellido" class="baja" required>
        <label for="edadBaja">Edad</label>
        <input type="numeric" id="edadBaja" name="edad" class="baja" required>
        <button type="submit" id="confirma">Enviar</button>`
});


bajaTeam.appendChild(formularioBaja);

let rep = 0;

document.getElementById("formuBaja").addEventListener("submit", function (event) {
    if (rep == 0) {
        event.preventDefault();
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: "btn btn-success",
              cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
          });
          swalWithBootstrapButtons.fire({
            title: "¿Estas seguro?",
            text: "No podrás revertir esto",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si, estoy seguro",
            cancelButtonText: "No, cancelar por favor!",
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                baja();
              swalWithBootstrapButtons.fire({
                title: "Eliminado",
                text: "Esperamos verte nuevamente",
                icon: "success"
              });
            } else if (
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire({
                title: "Cancelado",
                text: "Nos alegra seguir teniendote en nuestras clases",
                icon: "error"
              });
            }
          });

    }
});