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

function mensajeInscripcion(num){
    if(num){
        alert("Inscripcion exitosa, estaremos publicando las fechas de comienzo");
        console.log("Se ha añadido a un alumno nuevo");
    }else{
        alert("Lo sentimos, el cupo está completo");
        console.error("No se ha podido inscribir por falta de cupos");
    }
    
}

const pedirNombre = () => {
    let nom = prompt("Por favor ingrese su nombre para anotarse en las clases");
    nom.toLowerCase();
    return nom;
}

function sacarTurno(){
    for(let j=1;j<=cantidad;j++){
        let edad = prompt("Inscripción persona " + j +" - Ingrese su edad");
        parseInt(edad);
        if(edad<4 || edad>60){
            alert("Lo sentimos, no disponemos de clases para la edad ingresada");
            console.error("Edad no aceptada");
        }
        else{
            if(edad<19){
                if(disponibilidad(adolescentes)){
                    let nombre = pedirNombre();
                    adolescentes.push(nombre);
                    mensajeInscripcion(1);
                }
                else{
                    mensajeInscripcion(0);
                }
            }
            else{
                if(edad<41){
                    if(disponibilidad(adultos)){
                        let nombre = pedirNombre();
                        adultos.push(nombre);
                        mensajeInscripcion(1);
                    }
                    else{
                        mensajeInscripcion(0);
                    }
                }
                else{
                    if(disponibilidad(mayores)){
                        let nombre = pedirNombre();
                        mayores.push(nombre);
                        mensajeInscripcion(1);
                    }
                    else{
                        mensajeInscripcion(0);
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
    let nombre = pedirNombre();
    let edad = prompt("Tambien solicitamos su edad");
    if(edad<4 || edad>60){
        alert("Usted no se encuentra inscripto ya que no disponemos clases para esa edad");
        console.error("Persona no inscripta");
    }
    else{
        if(edad<19){
            let posicion = buscar(adolescentes,nombre);
            if(posicion != 0){
                adolescentes.splice(posicion,1);
            }
            else{
                alert("Usted no se encuentra inscripto, verifique si los datos son correctos y vuelva a intentar");
            }
        }
        else{
            if(edad<41){
                let posicion = buscar(adultos,nombre);
                if(posicion != 0){
                    adultos.splice(posicion,1);
                }
                else{
                    alert("Usted no se encuentra inscripto, verifique si los datos son correctos y vuelva a intentar");
                }
            }
            else{
                let posicion = buscar(mayores,nombre);
                if(posicion != 0){
                    mayores.splice(posicion,1);
                }
                else{
                    alert("Usted no se encuentra inscripto, verifique si los datos son correctos y vuelva a intentar");
                }
            }
        }
    }
} 

//-----------------------------------------------------------------------------------------------------------------------------------------------------

const informacion = () =>{
    let asegurar = false;
    let telefono = prompt("Para recibir información por favor ingrese su numero de telefono y a la brevedad nos estaremos comunicando");
    while(!asegurar){
        asegurar = confirm("El numero ingresado fue " + telefono + " ¿Es correcto?");
        if(!asegurar){
            telefono = prompt("Por favor vuelva a ingresar su telefono");
        }
        else{
            asegurar=true;
        }
    }
    console.log("Enviar informacion a " + telefono); 
}
    
//-----------------------------------------------------------------------------------------------------------------------------------------------------

let cantidad = prompt("¿Cuantas personas quieren inscribirse?");
sacarTurno();

let confirmar = confirm("¿Esta seguro que quiere darse de baja?");
if(confirmar){
    baja();
}
else{
    alert("Nos alegra que continues con nuestras clases");
    console.log("El alumno ha decido continuar con la clase");
}

informacion();
