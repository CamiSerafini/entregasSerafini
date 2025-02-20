let adolescentes = [
    {
        nombre: "juana",
        apellido: "barrios",
        edad: 16,
        correo: "juanabarrios2@gmail.com",
        telefono: 223573839
    },
    {
        nombre: "delfina",
        apellido: "juarez",
        edad: 15,
        correo: "delfit@gmail.com",
        telefono: 223573848
    },
    {
        nombre: "maria",
        apellido: "solani",
        edad: 18,
        correo: "smaria20@gmail.com",
        telefono: 223570659
    }
];

let adultos = [
    {
        nombre: "sabrina",
        apellido: "sult",
        edad: 22,
        correo: "sabrisult@gmail.com",
        telefono: 223578839
    },
    {
        nombre: "martina",
        apellido: "terranova",
        edad: 32,
        correo: "martaterra@gmail.com",
        telefono: 223579732
    },
    {
        nombre: "morena",
        apellido: "hernandez",
        edad: 29,
        correo: "morehernandez@gmail.com",
        telefono: 2235997439
    },
    {
        nombre: "eugenia",
        apellido: "rosales",
        edad: 20,
        correo: "rosaleseuge@gmail.com",
        telefono: 223958572
    },
    {
        nombre: "andrea",
        apellido: "ventra",
        edad: 40,
        correo: "ventrandre@gmail.com",
        telefono: 223573065
    },
    {
        nombre: "mariela",
        apellido: "molina",
        edad: 38,
        correo: "molimari@gmail.com",
        telefono: 223573234
    },
    {
        nombre: "sol",
        apellido: "avenado",
        edad: 27,
        correo: "avenadosolcito@gmail.com",
        telefono: 223532432
    },
    {
        nombre: "abril",
        apellido: "ardona",
        edad: 24,
        correo: "ardonaabru@gmail.com",
        telefono: 223523425
    },
    {
        nombre: "luz",
        apellido: "solpa",
        edad: 26,
        correo: "solpaluz@gmail.com",
        telefono: 223573823
    },
    {
        nombre: "aldana",
        apellido: "rodas",
        edad: 35,
        correo: "rodasaldi@gmail.com",
        telefono: 223574563
    }
];

let mayores = [];

let datosGuardados = [];

//GUARDAR LOS DATOS QUE YA TENGO EN LOS VECTORES EN datosGuardados para incluir todo luego en localStorage, no solo los nuevos ingresos
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

function mensajeInscripcion(num, no, mensaje) {
    if (num) {
        mensaje.textContent = "Inscripcion exitosa, estaremos publicando las fechas de comienzo";
        mensaje.className = "desc-3";
    } else {
        mensaje.textContent = "No se ha podido inscribir por falta de cupos";
        mensaje.className = "desc-2";
    }
    no.appendChild(mensaje);
}

function ingresante(edad) {
    this.nombre = (document.getElementById("nombre").value).toLowerCase();
    this.apellido = (document.getElementById("apellido").value).toLowerCase();
    this.edad = edad;
    this.correo = document.getElementById("correo").value;
    this.telefono = document.getElementById("telefono").value;
}

function sacarTurno() {
    let edad = document.getElementById("edad").value;
    edad = parseInt(edad);
    let no = document.getElementById("inscripcionCorrecta");
    let mensaje = document.createElement("p");
    let nuevoIngreso = new ingresante(edad);
    //Los datos se guardaran en el local storage en cualquier caso para tener un registro de todos los contactos
    datosGuardados = JSON.parse(localStorage.getItem("Datos"));
    datosGuardados.push(nuevoIngreso);
    localStorage.setItem("Datos", JSON.stringify(datosGuardados));
    if (edad < 4 || edad > 60) {
        mensaje.textContent = "Lo sentimos, no disponemos de clases para la edad ingresada";
        mensaje.className = "desc-2";
        no.appendChild(mensaje);
    }
    else {
        if (edad < 19) {
            if (disponibilidad(adolescentes)) {
                adolescentes.push(nuevoIngreso);
                mensajeInscripcion(1, no, mensaje);
            }
            else {
                mensajeInscripcion(0, no, mensaje);
            }
        }
        else {
            if (edad < 41) {
                if (disponibilidad(adultos)) {
                    adultos.push(nuevoIngreso);
                    mensajeInscripcion(1, no, mensaje);
                }
                else {
                    mensajeInscripcion(0, no, mensaje);
                }
            }
            else {
                if (disponibilidad(mayores)) {
                    mayores.push(nuevoIngreso);
                    mensajeInscripcion(1, no, mensaje);
                }
                else {
                    mensajeInscripcion(0, no, mensaje);
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
        no.removeChild(mensaje);
        no.removeChild(confirmo);
    }

    let recargar = document.createElement("button");
    recargar.className = "botonCentro";
    recargar.textContent = "¿Quiere cargar otros datos?";
    no.appendChild(recargar);
    recargar.addEventListener("click", habilitarFormulario);

    let confirmo = document.createElement("button");
    confirmo.textContent = "Confirmo";
    confirmo.className = "botonCentro";
    no.appendChild(confirmo);
    confirmo.addEventListener("click", function () {
        formulario.reset();
        no.removeChild(recargar);
        no.removeChild(mensaje);
        no.removeChild(confirmo);
    });
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------

function refrescarPagina() {
    setTimeout(function () {
        location.reload(); // Recarga la página
    }, 3000);
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

function baja() {
    let nombre = (document.getElementById("nombreBaja").value).toLowerCase();
    let apellido = (document.getElementById("apellidoBaja").value).toLowerCase();
    let edad = parseInt(document.getElementById("edadBaja").value);
    let elimina = document.createElement("p");
    let posicion;

    if (edad < 4 || edad > 60) {
        elimina.textContent = "Usted no se encuentra inscripto ya que no disponemos clases para esa edad";
        refrescarPagina();
    }
    else {
        if (edad < 19) {
            posicion = adolescentes.findIndex(adol => adol.nombre === nombre && adol.apellido === apellido);
            if (posicion >= 0) {
                adolescentes.splice(posicion, 1);
                elimina.textContent = "Eliminado correctamente";
            }
            else {
                elimina.textContent = "Usted no se encuentra inscripto";
                refrescarPagina();
            }
        }
        else {
            if (edad < 41) {
                posicion = adultos.findIndex(adult => adult.nombre === nombre && adult.apellido === apellido);
                if (posicion >= 0) {
                    adultos.splice(posicion, 1);
                    elimina.textContent = "Eliminado correctamente";

                }
                else {
                    elimina.textContent = "Usted no se encuentra inscripto";
                    refrescarPagina();
                }
            }
            else {
                posicion = mayores.findIndex(may => may.nombre === nombre && may.apellido === apellido);
                if (posicion >= 0) {
                    mayores.splice(posicion, 1);
                    elimina.textContent = "Eliminado correctamente";
                }
                else {
                    elimina.textContent = "Usted no se encuentra inscripto";
                    refrescarPagina();
                }
            }
        }
    }
    rep = 1;
    formularioBaja.appendChild(elimina);
    if (posicion >= 0) {
        noRecibir(nombre, apellido);
    }

}

//-----------------------------------------------------------------------------------------------------------------------------------------------------

//Inicializar "Base de Datos"
cargaAlumnos();


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
        <button type="submit">Enviar</button>`
});

bajaTeam.appendChild(formularioBaja);

let rep = 0;

document.getElementById("formuBaja").addEventListener("submit", function (event) {
    if (rep == 0) {
        event.preventDefault();
        baja();
    }
});