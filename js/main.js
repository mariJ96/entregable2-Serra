// Función para verificar si un número es positivo
function numeropositivo(valornumero) {
    return !isNaN(valornumero) && valornumero > 0
}

let usuarios = []
let valorm, valorh, genero, peso, altura, edad, tmbm, tmbh

// Función para guardar datos en localStorage
function guardarEnLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

// Función para recuperar datos de localStorage
function recuperarDatos(key) {
    return JSON.parse(localStorage.getItem(key))
}

// Función para borrar un dato de localStorage
function borrarDato(key) {
    localStorage.removeItem(key)
}

// Función para vaciar todo localStorage
function vaciarStorage() {
    localStorage.clear()
}

// Función de orden superior para procesar datos de los usuarios
function procesarUsuarios(callback) {
    usuarios.forEach(callback)
}

// Evento para obtener el género
document.getElementById('generoBtn').addEventListener('click', () => {
    genero = document.getElementById('genero').value
    if (genero === '1') {
        valorm = 447.6
    } else if (genero === '2') {
        valorh = 88.36
    }
    guardarEnLocalStorage('genero', genero)
    document.getElementById('pesoDiv').style.display = 'block'
});

// Evento para obtener el peso
document.getElementById('pesoBtn').addEventListener('click', () => {
    peso = parseInt(document.getElementById('peso').value)
    if (numeropositivo(peso)) {
        guardarEnLocalStorage('peso', peso)
        document.getElementById('alturaDiv').style.display = 'block'
    } else {
        mostrarMensaje('error', 'Ingrese un peso válido.')
    }
})

// Evento para obtener la altura
document.getElementById('alturaBtn').addEventListener('click', () => {
    altura = parseInt(document.getElementById('altura').value)
    if (numeropositivo(altura)) {
        guardarEnLocalStorage('altura', altura)
        document.getElementById('edadDiv').style.display = 'block'
    } else {
        mostrarMensaje('error', 'Ingrese una altura válida.')
    }
})

// Evento para obtener la edad
document.getElementById('edadBtn').addEventListener('click', () => {
    edad = parseInt(document.getElementById('edad').value)
    if (numeropositivo(edad)) {
        guardarEnLocalStorage('edad', edad)
        usuarios.push({ peso, altura, edad })
        document.getElementById('actividadDiv').style.display = 'block'
    } else {
        mostrarMensaje('error', 'Ingrese una edad válida.')
    }
})

// Calcular las calorías según el nivel de actividad
document.getElementById('actividadBtn').addEventListener('click', () => {
    let nivelActividad = document.getElementById('actividad').value
    let factoractividad = [1.2, 1.375, 1.55, 1.725][nivelActividad - 1]

    if (genero === '1') {
        let resultadopesom = peso * 9.2
        let resultadoalturam = altura * 3.1
        let resultadoedadm = edad * 4.3
        tmbm = (valorm + resultadopesom + resultadoalturam) - resultadoedadm
        let caloriasmujer = factoractividad * tmbm
        guardarEnLocalStorage('calorias', caloriasmujer)
        mostrarResultado('Tus calorías diarias son: ' + caloriasmujer)
    } else if (genero === '2') {
        let resultadopesoh = peso * 13.4
        let resultadoalturah = altura * 4.8
        let resultadoedadh = edad * 5.7
        tmbh = (valorh + resultadopesoh + resultadoalturah) - resultadoedadh
        let caloriashombre = factoractividad * tmbh
        guardarEnLocalStorage('calorias', caloriashombre)
        mostrarResultado('Tus calorías diarias son: ' + caloriashombre)
    }
});

// Función para mostrar el resultado en el DOM
function mostrarResultado(mensaje) {
    document.getElementById('resultadoCalorias').innerText = mensaje
}

// Función para mostrar mensajes de error o éxito
function mostrarMensaje(tipo, mensaje) {
    let mensajeDiv = document.createElement('div')
    mensajeDiv.className = tipo === 'error' ? 'error' : 'exito'
    mensajeDiv.innerText = mensaje
    document.body.appendChild(mensajeDiv)
    setTimeout(() => {
        mensajeDiv.remove()
    }, 3000)
}

// Función para procesar el array de objetos con una función de orden superior
procesarUsuarios(usuario => {
    console.log(`Usuario: Peso: ${usuario.peso}, Altura: ${usuario.altura}, Edad: ${usuario.edad}`)
})