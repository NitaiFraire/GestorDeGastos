// variables
const presupuestoUsuario = prompt('Cual es tu presupuesto semanal?');
const formulario = document.getElementById('agregar-gasto');
let cantidadPresupuesto;



// clases

// controla presupuesto del usuario
class Presupuesto{

    constructor(presupuesto){

        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
    }

    // restar del presupuesto actual
    presupuestoRestante(cantidad = 0){

        return this.restante -= Number(cantidad);
    }
}

// controla lo relacionado a el html
class Interfaz{

    insertarPresupuesto(cantidad){

        const presupuestoSpan = document.querySelector('span#total');
        const restanteSpan = document.querySelector('span#restante');

        // insertar al html
        presupuestoSpan.innerHTML = `${cantidad}`;
        restanteSpan.innerHTML = `${cantidad}`;
    }

    imprimirMensaje(mensaje, tipo){

        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');

        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success');
        }

        divMensaje.appendChild(document.createTextNode(mensaje));

        // insertar div en el dom
        document.querySelector('.primario').insertBefore(divMensaje, formulario);

        // eliminar alert despues de 3 segundos
        setTimeout(function(){

            document.querySelector('.primario .alert').remove();
            formulario.reset();

        }, 3000)
    }

    // inserta los gastos a la lista
    agregarGastoListado(nombre, cantidad){

        // seleccion de listado
        const gastosListado = document.querySelector('#gastos ul');

        // crear li
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';

        // inertar el gasto
        li.innerHTML = `${nombre}
                        <span class="badge badge-primary badge-pill"> $ ${cantidad} </span>`;

        // insertar al html
        gastosListado.appendChild(li);
    }

    // comprueba el presupuesto restante
    presupuestoRestante(cantidad){

        // campo de presupuesto restante
        const restante = document.querySelector('span#restante');

        // leer presupuesto restante del objeto global cantidadPresupuesto que se crea apartir de insertar presupuesto en el prompt
        const presupuestoRestanteUsuario = cantidadPresupuesto.presupuestoRestante(cantidad);

        // insertar al html
        restante.innerHTML = `${presupuestoRestanteUsuario}`;

        console.log(presupuestoRestanteUsuario);
    }
}


// event listeners

// insertar presupuesto al cargar la pagina
document.addEventListener('DOMContentLoaded', function(){

    if(presupuestoUsuario === null || presupuestoUsuario === ''){
        
        window.location.reload();
    }else{

        // instanciar presupuesto
        cantidadPresupuesto = new Presupuesto(presupuestoUsuario);

        // instancias interfaz
        const gui = new Interfaz();
        gui.insertarPresupuesto(cantidadPresupuesto.presupuesto);
    }

});


// obtener valores del formulario
formulario.addEventListener('submit', function(e){

    e.preventDefault();

    // leer del formulario de gastos
    const nombreGasto = document.querySelector('#gasto').value;
    const cantidadGasto = document.querySelector('#cantidad').value;

    // instanciar la interfaz
    const gui = new Interfaz();

    // validar datos del formulario
    if(nombreGasto === '' || cantidadGasto === ''){

        // 2 parametros: mensaje y tipo 
        gui.imprimirMensaje('Hubo un error', 'error');
    }else{
        
        // insertar en el html
        gui.imprimirMensaje('Correcto', 'correcto');
        gui.agregarGastoListado(nombreGasto, cantidadGasto);
        gui.presupuestoRestante(cantidadGasto);
    }

});