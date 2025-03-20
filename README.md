# Patín Artístico

##### Aclaración: al final, estan los datos que se pueden utilizar de prueba para abarcar todo lo desarrollado en el proyecto.

## ¿Cuál es el objetivo de este proyecto?
El objetivo es crear una página en al cual se puedan realizar varias funcionalidades:
- Conocer mas sobre nosotras y nuestro equipo.
- Poder anotarse para probar una clase de patína artístico.
- En caso de ser alumna, poder darse de bajas de estas clases.
- Si te das de baja, ¿queres seguir recibiendo información?
- Carrito de compras.

## ¿Cómo está organizado?
El proyecto contiene:
- 2 archivos HTML: index.html y carrito.html (en donde se puede ver lo que se ha agregado al carrito de compras).
- 2 archivos CSS: para los diferentes HTML y .js
- 2 archivos JS: para las funcionalidades de cada uno de los HTML.
- Carpeta con imagenes.
- Carpeta .json, donde se encuentran todos los datos que se utilizan a lo largo del proyecto.

## Tecnologías utilizadas
- HTML
- CSS
- JAVASCRIPT
- Librería: sweetAlert

### Datos de prueba
Una vez que se entró a la página, F5 nuevamente para que se carguen los datos en la clave: "Datos" en localStorage
- Inscripción a las clases (formulario):
Entre cada prueba seleccionar la opcion de cargar nuevos datos para reiniciar el formulario.
  - 1er prueba:
    - Nombre: Camila
    - Apellido: Serafini
    - Edad: 3
    - Mail: camii@gmail.com
    - Telefono: 2237647839
  - 2da prueba: lo mismo pero edad: 70
  - 3er prueba:
    - Nombre: Alejandra
    - Apellido: Fernandez
    - Edad: 15
    - Mail: camii@gmail.com
    - Telefono: 2237647839
  - 4ta prueba:
    - Nombre: Camila
    - Apellido: Rodriguez
    - Edad: 30
    - Mail: camii@gmail.com
    - Telefono: 2237647839
  - 5ta prueba:
    - Nombre: Andrea
    - Apellido: Ventrice
    - Edad: 52
    - Mail: camii@gmail.com
    - Telefono: 2237647839
  Al finalizar las cargas necesarias -> Confirmar datos!

- Dar de baja:
  - 1er prueba:
    - Nombre: Camila
    - Apellido: Serafini
    - Edad: 3
    - Mail: camii@gmail.com
    - Telefono: 2237647839
  - 2da prueba: lo mismo pero edad: 70
  - 3er prueba:
    - Nombre: Juana
    - Apellido: Barrios
    - Edad: 15
    - Mail: camii@gmail.com
    - Telefono: 2237647839
  - 4ta prueba:
    - Nombre: Camila
    - Apellido: Rodriguez
    - Edad: 30
    - Mail: camii@gmail.com
    - Telefono: 2237647839

- Carrito:
En la pagina principal (index.html) se pueden añadir productos al carrito, viendo como arriba a la derecha la imagen del carrito se actualiza, y ademas ver el carrito ya sea apretando en "Ver carrito" o haciendo click en la imagen fija del carrito.
Luego al ir al carrito (carrito.html), se pueden agregar mas items o restar. En caso de llegar a 0 en algun item este se elimina. 
Va acumulando la cantidad y el precio debajo y ademas tenemos el boton para comprar o el boton para reinicar el carrito.

- Todo lo dicho anteriormente para realizar de prueba, ademas se puede ver como va funcionando en LocalStorage.

