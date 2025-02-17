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

let datosGuardados = [];

function sacarTurno() {
    let edad = document.getElementById("edad").value;
    edad = parseInt(edad);
    let no = document.getElementById("inscripcionCorrecta");
    let mensaje = document.createElement("p");
    let nuevoIngreso = {};
    nuevoIngreso.nombre = (document.getElementById("nombre").value).toLowerCase();
    nuevoIngreso.apellido = (document.getElementById("apellido").value).toLowerCase();
    nuevoIngreso.edad = edad;
    nuevoIngreso.correo = document.getElementById("correo").value;
    nuevoIngreso.telefono = document.getElementById("telefono").value;
    //Los datos se guardaran en el local storage en cualquier caso para tener un registro de todos los contactos
    datosGuardados.push(nuevoIngreso);
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
    recargar.textContent = "¿Quiere cargar otros datos?";
    no.appendChild(recargar);
    recargar.addEventListener("click",habilitarFormulario);

    let confirmo = document.createElement("button");
    confirmo.textContent = "Confirmo";
    no.appendChild(confirmo);
    confirmo.addEventListener("click",function(){
        formulario.reset();
        localStorage.setItem("Datos",JSON.stringify(datosGuardados))
        no.removeChild(recargar);
        no.removeChild(mensaje);
        no.removeChild(confirmo);
    });
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------

function buscar(alumnos, nombre) {
    let i = 0;
    if (alumnos.length > 0) {
        while (i < alumnos.length && alumnos[i] != nombre) {
            i++;
        }
        if (alumnos[i] != nombre) {
            return 0;
        }
        else {
            alert("Ha sido eliminado de la lista, " + nombre + " ¡esperamos verte de nuevo!");
            console.log("Alumno eliminado, se desocupa una vacante");
            return i;
        }
    }
}

function baja() {
    let nombre = pedirNombre();
    let edad = prompt("Tambien solicitamos su edad");
    if (edad < 4 || edad > 60) {
        alert("Usted no se encuentra inscripto ya que no disponemos clases para esa edad");
        console.error("Persona no inscripta");
    }
    else {
        if (edad < 19) {
            let posicion = buscar(adolescentes, nombre);
            if (posicion != 0) {
                adolescentes.splice(posicion, 1);
            }
            else {
                alert("Usted no se encuentra inscripto, verifique si los datos son correctos y vuelva a intentar");
                console.error("El alumno que se quiere dar de baja no se encuentra inscripto");
            }
        }
        else {
            if (edad < 41) {
                let posicion = buscar(adultos, nombre);
                if (posicion != 0) {
                    adultos.splice(posicion, 1);
                }
                else {
                    alert("Usted no se encuentra inscripto, verifique si los datos son correctos y vuelva a intentar");
                    console.error("El alumno que se quiere dar de baja no se encuentra inscripto");
                }
            }
            else {
                let posicion = buscar(mayores, nombre);
                if (posicion != 0) {
                    mayores.splice(posicion, 1);
                }
                else {
                    alert("Usted no se encuentra inscripto, verifique si los datos son correctos y vuelva a intentar");
                    console.error("El alumno que se quiere dar de baja no se encuentra inscripto");
                }
            }
        }
    }
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------

const informacion = () => {
    let asegurar = false;
    let telefono = prompt("Para recibir información por favor ingrese su numero de telefono y a la brevedad nos estaremos comunicando");
    while (!asegurar) {
        asegurar = confirm("El numero ingresado fue " + telefono + " ¿Es correcto?");
        if (!asegurar) {
            telefono = prompt("Por favor vuelva a ingresar su telefono");
        }
        else {
            asegurar = true;
        }
    }
    console.log("Enviar informacion a " + telefono);
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------

document.getElementById("formuJs").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita la recarga de la página
    console.log("Formulario enviado correctamente"); // Verificar si el formulario se envió
    sacarTurno();
});



/*let confirmar = confirm("¿Esta seguro que quiere darse de baja?");
if (confirmar) {
    baja();
}
else {
    alert("Nos alegra que continues con nuestras clases");
    console.log("El alumno ha decido continuar con la clase");
}

informacion();*/
