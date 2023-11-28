document.addEventListener("DOMContentLoaded", function() {
    
    const titleContent = document.title;
    console.log("Contenido del título:", titleContent);

    
    function mostrarNombresCompletos() {
        const primerIntegrante = document.getElementById("primerIntegrante");
        const segundoIntegrante = document.getElementById("segundoIntegrante");

        const nombreCompleto1 = obtenerNombreCompleto(primerIntegrante);
        const nombreCompleto2 = obtenerNombreCompleto(segundoIntegrante);

        console.log("-----");
        console.log(`Integrante 1: "${nombreCompleto1}"`);
        console.log(`Integrante 2: "${nombreCompleto2}"`);
        console.log("-----");
    }

    function obtenerNombreCompleto(integrante) {
        const primerNombre = integrante.querySelector("dd:nth-of-type(1)").textContent;
        const segundoNombre = integrante.querySelector("dd:nth-of-type(2)").textContent;
        const primerApellido = integrante.querySelector("dd:nth-of-type(3)").textContent;
        const segundoApellido = integrante.querySelector("dd:nth-of-type(4)").textContent;

        const nombreCompleto = [primerNombre, segundoNombre, primerApellido, segundoApellido]
            .filter(nombre => nombre !== "")
            .join(" ");

        return nombreCompleto.toUpperCase();
    }

    
    function verificarCoincidencias() {
        const nombres = document.querySelectorAll("dd:nth-of-type(1), dd:nth-of-type(2)");
        const colorElegido = prompt("Ingresa un color para resaltar los nombres coincidentes:");

        let coincidencias = false;

        nombres.forEach(nombre => {
            const coincidencia = Array.from(nombres).filter(n => n.textContent === nombre.textContent);

            if (coincidencia.length > 1) {
                coincidencias = true;
                aplicarEstilo(nombre, colorElegido);
            }
        });

        if (coincidencias) {
            console.log("Hubo coincidencias.");
        } else {
            console.log("No hubo coincidencias.");
        }
    }

    
    const compararApellidos = confirm("¿Deseas comparar los apellidos?");
    
    if (compararApellidos) {
        verificarCoincidenciasApellidos();
    }

    
    function iniciarEjercicio() {
        mostrarNombresCompletos();
        verificarCoincidencias();
        
        const compararApellidos = confirm("¿Deseas comparar los apellidos?");
        if (compararApellidos) {
            verificarCoincidenciasApellidos();
        }
    }

    iniciarEjercicio();

    
    const form = document.createElement("form");

    for (let i = 1; i <= 2; i++) {
        const h2 = document.createElement("h2");
        h2.textContent = `Integrante ${i}`;
        form.appendChild(h2);

        const dl = document.createElement("dl");

        const inputPrimerNombre = crearInput("Primer nombre");
        const inputSegundoNombre = crearInput("Segundo nombre");
        const inputPrimerApellido = crearInput("Primer apellido");
        const inputSegundoApellido = crearInput("Segundo apellido");

        dl.appendChild(crearElemento("dt", "Primer nombre"));
        dl.appendChild(crearElemento("dd", inputPrimerNombre));
        dl.appendChild(crearElemento("dt", "Segundo nombre"));
        dl.appendChild(crearElemento("dd", inputSegundoNombre));
        dl.appendChild(crearElemento("dt", "Primer apellido"));
        dl.appendChild(crearElemento("dd", inputPrimerApellido));
        dl.appendChild(crearElemento("dt", "Segundo apellido"));
        dl.appendChild(crearElemento("dd", inputSegundoApellido));

        form.appendChild(dl);
    }

    const completarButton = document.createElement("button");
    completarButton.textContent = "Completar";
    completarButton.addEventListener("click", function() {
        completarDatosDesdeFormulario(form);
    });

    form.appendChild(completarButton);
    document.body.appendChild(form);

    function completarDatosDesdeFormulario(formulario) {
        const integrantes = formulario.querySelectorAll("dl");

        integrantes.forEach((integrante, index) => {
            const nombres = Array.from(integrante.querySelectorAll("dd")).map(input => input.value);
            const nombreCompleto = nombres.filter(nombre => nombre.trim() !== "").join(" ").toUpperCase();
            console.log(`Integrante ${index + 1}: "${nombreCompleto}"`);
        })
    }

    
    function aplicarEstilo(elemento, color) {
        elemento.style.color = color;
        elemento.style.fontWeight = "bold";
    }

    function crearElemento(tag, contenido) {
        const elemento = document.createElement(tag);
        elemento.textContent = contenido;
        return elemento;
    }

    function crearInput(placeholder) {
        const input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("placeholder", placeholder);
        return input;
    }
});