// Variables
let carrito = document.querySelector('#carrito');
let listaCursos = document.querySelector('#lista-cursos');
let contenedorCarrito = document.querySelector('#lista-carrito tbody'); // almacenara los eventos del carrito
let vaciarCarrito = document.querySelector('#vaciar-carrito'); //boton que escuchara cuando desee eliminar todo del carrito
let articulosCarritos = []; // arreglo que almacenara los elementos del carrito

cargarEventos();

function cargarEventos() {
    //Cuando agregas un curso presionando 'Agregar al carrito'
    listaCursos.addEventListener('click', agregarCurso);

    //Elimina cursos del carrito
    carrito.addEventListener('click', eliminaCurso);

    //vaciar carrito

    vaciarCarrito.addEventListener('click', () => {
        articulosCarritos = [];
        limpiarHtml(); //Eliminamos todo el html
    });
}

function agregarCurso(event) {
    event.preventDefault(); // quito el efecto por default que me despliega hacia arriba
    if (event.target.classList.contains('agregar-carrito')) { //consulto exactamente en que parte se esta dando click 
        let cursoSeleccionado = event.target.parentElement.parentElement; // con esta linea hago un traversing hacia el padre y con eso puedo seleccionar el contenido del curso
        leerDatosCurso(cursoSeleccionado);
    }

}

//Elimina curso del carrito
function eliminaCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {
        let cursoId = e.target.getAttribute('data-id'); //obtengo el id del elemento que quiero eliminar
        //Elimina del arreglo de articuloCarrito por el data-id
        articulosCarritos = articulosCarritos.filter(curso => curso.id !== cursoId); //filter quita los elementos del carrito de esa forma
        carritoHTML(); //iteramos sobre carrito y mostramos el html
    }

}


//Lee ek contenido del html al que le dimos click y extrae la informacion del curso
function leerDatosCurso(curso) {
    console.log(curso);

    // crearemos un objeto con el contenido del curso actual
    let infoCurso = {
            imagen: curso.querySelector('img').src,
            titulo: curso.querySelector('h4').textContent,
            precio: curso.querySelector('.precio span').textContent,
            id: curso.querySelector('a').getAttribute('data-id'),
            cantidad: 1


        }
        //Revisa si un elemento existe en el carrito
        // some me permite iterar sobre un arreglo de objetos y verificar si un elemento existe en el carrito
    let existe = articulosCarritos.some(curso => curso.id == infoCurso.id);
    if (existe == true) {
        //Actualizamos la cantidad
        let cursos = articulosCarritos.map(curso => {
            if (curso.id == infoCurso.id) {
                curso.cantidad++;
                return curso; //retorna el objeto actualizado
            } else {
                return curso; // retorna los objetos no duplicados
            }
        });

        articulosCarritos = [...cursos];
    } else {
        //  agrega elementos al carrito
        articulosCarritos = [...articulosCarritos, infoCurso];
    }
    console.log(articulosCarritos);
    carritoHTML();

}

//Muestra el carrito de compras en el HTML
function carritoHTML() {

    //limpiar html
    limpiarHtml();

    //recorre el carrito
    articulosCarritos.forEach(curso => {
        let { imagen, titulo, precio, cantidad, id } = curso; //Destruction
        let row = document.createElement('tr');
        row.innerHTML = `
       <td>
       <img src="${imagen}" width="100"/>
       </td>
       
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td> 
        <a href="#" class="borrar-curso" data-id="${id}">X <a/>
        </td>
        `
            //Agrega el elemento del carrito en el Tbody
        contenedorCarrito.appendChild(row);
    });
}

function limpiarHtml() {
    //forma lenta de limpiar html
    //contenedorCarrito.innerHTML = '';

    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}