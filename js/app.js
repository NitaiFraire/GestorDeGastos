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
        
        console.log(cantidad);

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

        console.log('error');
        // 2 parametros: mensaje y tipo 
        gui.imprimirMensaje('Hubo un error', 'error');
    }else{
        
        console.log('no error');
    }

});