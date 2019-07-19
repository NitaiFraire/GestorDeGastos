// variables
const presupuestoUsuario = prompt('Cual es tu presupuesto semanal?');
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

}


// event listeners

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