/* 1- Simulador para sacar turno a clases de patin artistico segun edades y cupos, esta funcion, segun cada caso, llama a otras funciones
2- Darse de baja de las clases
3- Recibir informacion sobre las clases*/ 

let adolescentes = ["juana","delfina","maria"];
let adultos = ["sabrina","martina","morena","eugenia","andrea","mariela","sol","abril","luz","aldana"];
let mayores = [];

function disponibilidad(cupos){
    if(cupos.length<10){
        return 1;
    }else{
        return 0;
    }
}

function mensajeInscripcion(num,nombre){
    if(num){
        alert("Inscripcion exitosa, estaremos publicando las fechas de comienzo");
        console.log("Se ha añadido al turno de adolescentes a " +  nombre);
    }else{
        alert("Lo sentimos " + nombre + ", el cupo está completo");
        console.error("No se ha podido inscribir por falta de cupos");
    }
    
}

function sacarTurno(cantidad){
    for(let j=1;j<=cantidad;j++){
        alert("Inscripcion persona " + j);
        let edad = prompt("Ingrese su edad");
        parseInt(edad);
        if(edad<4 || edad>60){
            alert("Lo sentimos, no disponemos de clases para la edad ingresada");
            console.error("Edad no aceptada");
        }
        else{
            let nombre = prompt("Por favor ingrese su nombre para anotarse en las clases");
            nombre.toLowerCase();
            if(edad<19){
                if(disponibilidad(adolescentes)){
                    adolescentes.push(nombre);
                    console.log(adolescentes);
                    mensajeInscripcion(1,nombre);
                }
                else{
                    mensajeInscripcion(0,nombre);
                }
            }
            else{
                if(edad<41){
                    if(disponibilidad(adultos)){
                        adultos.push(nombre);
                        console.log(adultos);
                        mensajeInscripcion(1,nombre);
                    }
                    else{
                        mensajeInscripcion(0,nombre);
                    }
                }
                else{
                    if(disponibilidad(mayores)){
                        mayores.push(nombre);
                        console.log(mayores);
                        mensajeInscripcion(1,nombre);
                    }
                    else{
                        mensajeInscripcion(0,nombre);
                    }
                }
            }
                
        }
    }

}

//-----------------------------------------------------------------------------------------------------------------------------------------------------

function buscar(alumnos,nombre){
    let i = 0;
    if(alumnos.length>0){
        while(i<alumnos.length && alumnos[i] != nombre){
            i++;
        }
        if(alumnos[i] != nombre){
            return 0;     
        }
        else{
            alert("Ha sido eliminado de la lista, " + nombre + " ¡esperamos verte de nuevo!");
            console.log("Alumno eliminado, se desocupa una vacante");
            return i; 
        }
    }
}

function baja(){
    let nombre = prompt("Por favor ingrese su nombre");
    nombre.toLowerCase();
    let edad = prompt("Tambien solicitamos su edad");
    if(edad<4 || edad>60){
        alert("Usted no se encuentra inscripto");
        console.error("Persona no inscripta");
    }
    else{
        if(edad<19){
            let posicion = buscar(adolescentes,nombre);
            if(posicion != 0){
                adolescentes.splice(posicion,1);
                console.log(adolescentes);
            }
            else{
                alert("Usted no se encuentra inscripto");
            }
        }
        else{
            if(edad<41){
                let posicion = buscar(adultos,nombre);
                if(posicion != 0){
                    adultos.splice(posicion,1);
                }
                else{
                    alert("Usted no se encuentra inscripto");
                }
            }
            else{
                let posicion = buscar(mayores,nombre);
                if(posicion != 0){
                    mayores.splice(posicion,1);
                }
                else{
                    alert("Usted no se encuentra inscripto");
                }
            }
        }
    }
} 

//-----------------------------------------------------------------------------------------------------------------------------------------------------

const informacion = () =>{
    let telefono = prompt("Para recibir información por favor ingrese su numero de telefono y a la brevedad nos estaremos comunicando");
    alert("El numero ingresado fue " + telefono);
    let asegurar = confirm("¿Es correcto?");
    if(asegurar){
        alert("¡Excelente!");
        console.log("Enviar informacion a " + telefono);
    }
    else{
        alert("Cualquier cosa estamos disponibles ante cualquier consulta");
    }
}
    
//-----------------------------------------------------------------------------------------------------------------------------------------------------

let cantidad = prompt("¿Cuantas personas quieren inscribirse?");
sacarTurno(cantidad);

let confirmar = confirm("¿Esta seguro que quiere darse de baja?");
if(confirmar){
    baja();
}
else{
    alert("Nos alegra que continues con nuestras clases");
    console.log("El alumno ha decido continuar con la clase");
}

informacion();
