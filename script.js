let adolescentes = [
    {
        nombre:"juana",
        apellido:"barrios",
        edad: 16,
        correo:"juanabarrios2@gmail.com",
        telefono: 223573839
    },
    {
        nombre:"delfina",
        apellido:"juarez",
        edad: 15,
        correo:"delfit@gmail.com",
        telefono: 223573848
    },
    {
        nombre:"maria",
        apellido:"solani",
        edad: 18,
        correo:"smaria20@gmail.com",
        telefono: 223570659
    }
];

let adultos = [
    {
        nombre:"sabrina",
        apellido:"sult",
        edad: 22,
        correo:"sabrisult@gmail.com",
        telefono: 223578839
    },
    {
        nombre:"martina",
        apellido:"terranova",
        edad: 32,
        correo:"martaterra@gmail.com",
        telefono: 223579732
    },
    {
        nombre:"morena",
        apellido:"hernandez",
        edad: 29,
        correo:"morehernandez@gmail.com",
        telefono: 2235997439
    },
    {
        nombre:"eugenia",
        apellido:"rosales",
        edad: 20,
        correo:"rosaleseuge@gmail.com",
        telefono: 223958572
    },
    {
        nombre:"andrea",
        apellido:"ventra",
        edad: 40,
        correo:"ventrandre@gmail.com",
        telefono: 223573065
    },
    {
        nombre:"mariela",
        apellido:"molina",
        edad: 38,
        correo:"molimari@gmail.com",
        telefono: 223573234
    },
    {
        nombre:"sol",
        apellido:"avenado",
        edad: 27,
        correo:"avenadosolcito@gmail.com",
        telefono: 223532432
    },
    {
        nombre:"abril",
        apellido:"ardona",
        edad: 24,
        correo:"ardonaabru@gmail.com",
        telefono: 223523425
    },
    {
        nombre:"luz",
        apellido:"solpa",
        edad: 26,
        correo:"solpaluz@gmail.com",
        telefono: 223573823
    },
    {
        nombre:"aldana",
        apellido:"rodas",
        edad: 35,
        correo:"rodasaldi@gmail.com",
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

function mensajeInscripcion(num) {
    if (num) {
        let correcta = document.getElementById("inscripcionCorrecta");
        let inscrCorrecta = document.createElement("p");
        inscrCorrecta.textContent = "Inscripcion exitosa, estaremos publicando las fechas de comienzo";
        correcta.appendChild(inscrCorrecta);
        //alert("Inscripcion exitosa, estaremos publicando las fechas de comienzo");
        //console.log("Se ha añadido a un alumno nuevo");
    } else {
        //alert("Lo sentimos, el cupo está completo");
        //console.error("No se ha podido inscribir por falta de cupos");
        let incorrecta = document.getElementById("inscripcionCorrecta");
        let inscrIncorrecta = document.createElement("p");
        inscrIncorrecta.textContent = "No se ha podido inscribir por falta de cupos";
        incorrecta.appendChild(inscrCorrecta);
    }

}

function sacarTurno() {
        let edad = document.getElementById("edad").value;
        //let edad = prompt("Inscripción persona " + j + " - Ingrese su edad");
        parseInt(edad);
        if (edad < 4 || edad > 60) {
            let no = document.getElementById("inscripcionCorrecta");
            console.log(no);
            if(no){
                console.log("Existe");
            }
            else{
                console.log("No existe");
            }
            let noHayClases = document.createElement("p");
            noHayClases.textContent = "Lo sentimos, no disponemos de clases para la edad ingresada";
            noHayClases.className = "description";
            no.appendChild(noHayClases);
            //alert("Lo sentimos, no disponemos de clases para la edad ingresada");
            //console.error("Edad no aceptada");
        }
        else {
            if (edad < 19) {
                if (disponibilidad(adolescentes)) {
                    adolescentes.push({
                        nombre : (document.getElementById("nombre").value).toLowerCase(),
                        apellido : (document.getElementById("apellido").value).toLowerCase(),
                        edad : edad,
                        correo : document.getElementById("correo").value,
                        telefono : document.getElementById("telefono").value
                    });
                    

                    
                    mensajeInscripcion(1);
                }
                else {
                    mensajeInscripcion(0);
                }
            }
            else {
                if (edad < 41) {
                    if (disponibilidad(adultos)) {
                        let nombre = pedirNombre();
                        adultos.push(nombre);
                        mensajeInscripcion(1);
                    }
                    else {
                        mensajeInscripcion(0);
                    }
                }
                else {
                    if (disponibilidad(mayores)) {
                        let nombre = pedirNombre();
                        mayores.push(nombre);
                        mensajeInscripcion(1);
                    }
                    else {
                        mensajeInscripcion(0);
                    }
                }
            }

        }

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

sacarTurno();

let confirmar = confirm("¿Esta seguro que quiere darse de baja?");
if (confirmar) {
    baja();
}
else {
    alert("Nos alegra que continues con nuestras clases");
    console.log("El alumno ha decido continuar con la clase");
}

informacion();
