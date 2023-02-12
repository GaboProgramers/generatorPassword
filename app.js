(function () {
    /* < ------------------------- > */
    /* Variables y objetos generales */
    /* < ------------------------- > */

    const app = document.getElementById('app')
    let inputCaracteres = document.getElementById('numero-caracteres')

    let configuracion = {
        caracteres: parseInt(inputCaracteres.value),
        simbolos: true,
        numeros: true,
        mayusculas: true,
        minusculas: true
    }

    let caracteres = {
        numeros: '0 1 2 3 4 5 6 7 8 9',
        simbolos: '. # ? * % $ @ + = -',
        mayusculas: 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z',
        minusculas: 'a b c d e f g h i j k l m n o p q r s t u v w x y z'
    }

    /* < ------------------------- > */
    /* Eventos */
    /* < ------------------------- > */

    // ? Evento para evitar que la app un submit por defaul
    app.addEventListener('submit', function (e) {
        e.preventDefault()
    })

    // ? Aumentar la cantidad de caracteres
    app.elements.namedItem('btn-mas-uno').addEventListener('click', function () {
        configuracion.caracteres++
        inputCaracteres.value = configuracion.caracteres
    })

    // ? disminuir la cantidad de caracteres
    app.elements.namedItem('btn-menos-uno').addEventListener('click', function () {
        if (configuracion.caracteres > 1) {
            configuracion.caracteres--
            inputCaracteres.value = configuracion.caracteres
        }
    })

    app.elements.namedItem('input-password').addEventListener('click', function () {
        copiarPassword()
    })

    /* < ------------------------- > */
    /* Funciones */
    /* < ------------------------- > */

    // ? 
    const btnSimbol = document.getElementById('btn-simbolos')
    const btnNumeros = document.getElementById('btn-numeros')
    const btnMayus = document.getElementById('btn-mayusculas')

    btnSimbol.addEventListener('click', () => {
        btnSimbol.classList.toggle('false')
        if (!btnSimbol.childNodes[1].classList.toggle('fa-check')) {
            btnSimbol.childNodes[1].classList.toggle('fa-times')
        } else {
            btnSimbol.childNodes[1].classList.toggle('fa-times')
        }

        configuracion.simbolos = !configuracion.simbolos
    })

    btnNumeros.addEventListener('click', () => {
        btnNumeros.classList.toggle('false')

        if (!btnNumeros.childNodes[1].classList.toggle('fa-check')) {
            btnNumeros.childNodes[1].classList.toggle('fa-times')
        } else {
            btnNumeros.childNodes[1].classList.toggle('fa-times')
        }

        configuracion.numeros = !configuracion.numeros
    })

    btnMayus.addEventListener('click', () => {
        btnMayus.classList.toggle('false')

        if (!btnMayus.childNodes[1].classList.toggle('fa-check')) {
            btnMayus.childNodes[1].classList.toggle('fa-times')
        } else {
            btnMayus.childNodes[1].classList.toggle('fa-times')
        }

        configuracion.mayusculas = !configuracion.mayusculas
    })

    app.elements.namedItem('btn-generar').addEventListener('click', function () {
        generarPassword()
    })

    function generarPassword() {
        let caracteresFinales = ''
        let password = ''

        for (propiedad in configuracion) {
            if (configuracion[propiedad] === true) {
                caracteresFinales += caracteres[propiedad] + ' '
            }
        }

        caracteresFinales = caracteresFinales.trim()
        caracteresFinales = caracteresFinales.split(' ')

        for (let i = 0; i < configuracion.caracteres; i++) {
            password += caracteresFinales[Math.floor(Math.random() * caracteresFinales.length)]
        }

        app.elements.namedItem('input-password').value = password
    }

    async function copiarPassword() {
        const input = document.getElementById('input-password')
        const copy = input.value

        await navigator.clipboard.writeText(copy)

        document.getElementById('alerta-copiado').classList.add('active')

        setTimeout(function () {
            document.getElementById('alerta-copiado').classList.remove('active')
        }, 2000)
    }

    generarPassword()

}())
