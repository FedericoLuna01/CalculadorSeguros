// variables


// Constructores
function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo
}

// cotizacion con los datos
Seguro.prototype.cotizarSeguro = function() {
    let cantidad;
    const base = 2000;

    switch (this.marca) {
        case '1':
            cantidad = base * 1.15;
            break;
        case '2':
            cantidad = base * 1.05;
            break;
        case '3':
            cantidad = base * 1.35;
            break;
        default:
            break;
    }

    //leer año
    let diferencia = new Date().getFullYear() - this.year;

    // cada año se reduce el valor
    diferencia -= ((diferencia * 3) * cantidad) / 100;

    // si el seguro es basico se multiplica por 30 de lo contrario 50
    if (this.tipo === 'basico') {
        cantidad *= 1.30;

    } else {
        cantidad *= 1.50;
    }
    return cantidad;

}


function UI() {}

// lenar opciones de años
UI.prototype.llenarOpciones = function() {
    const max = new Date().getFullYear();
    const min = max - 20;
    const selectYear = document.querySelector('#year');


    for (let i = max; i > min; i--) {
        let option = document.createElement('OPTION');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
}

// muestra alertas en pantallas
UI.prototype.mostrarMensaje = function(mensaje, tipo) {
    const div = document.createElement('DIV');
     
    if (tipo === 'error') {
        div.classList.add('error')
    } else {
        div.classList.add('correcto')
    };

    div.classList.add('mensaje', 'mt-10'); 
    div.textContent = mensaje;

    // agregar al html
    const formulario = document.querySelector('#cotizar-seguro')
    formulario.insertBefore(div, document.querySelector('#resultado'))

    setTimeout(() => {
        div.remove()
    }, 3000);

}

UI.prototype.mostrarResultado = function(total, seguro) {
    // crear resultado
    const div = document.createElement('DIV');
    div.classList.add('mt-10');
    div.innerHTML = `
        <p class="header">Tu resumen<p>
        <p class='font-bold'>Total: ${total}<p>
    `;

    const resultadoDiv = document.querySelector('#resultado');

    //mostrar spinner
    const spinner = document.querySelector('#cargando')
    spinner.style.display = 'block';

    setTimeout(() => {
        spinner.style.display = 'none'
        resultadoDiv.appendChild(div);
    }, 3000)
}

// instanciar UI
const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
    ui.llenarOpciones();
})


eventListeners();
function eventListeners() {
    const formulario = document.querySelector('#cotizar-seguro')
    formulario.addEventListener('submit', cotizarSeguro);


}

function cotizarSeguro(e) {
    e.preventDefault();

    // leer la marca
    const marca = document.querySelector('#marca').value;


    // leer año
    const year = document.querySelector('#year').value;

    // leer tipo
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    if (marca === '' || year === '' || tipo === '') {
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error');        
        return;
    } 

    ui.mostrarMensaje('Cotizando...', 'correcto')

    // ocultar cotizaciones anteriores
    const resultados = document.querySelector('#resultado div')
    if (resultados != null) {
        resultados.remove()

    }
    

    // instanciar el seguro
    const seguro = new Seguro(marca, year, tipo);
    const total = seguro.cotizarSeguro()
    // utilizar el proto que va a cotizar
    ui.mostrarResultado(total, seguro);
}
