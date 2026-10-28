const botonesFiltro = document.querySelectorAll(".filtro");
const carreras = document.querySelectorAll(".carrera");

botonesFiltro.forEach(function (boton) {
  boton.addEventListener("click", function () {
    botonesFiltro.forEach(function (otro) {
      otro.classList.remove("active");
    });
    boton.classList.add("active");

    const filtro = boton.dataset.filtro;

    carreras.forEach(function (carrera) {
      if (filtro === "todas" || carrera.dataset.distancia === filtro) {
        carrera.classList.remove("d-none");
      } else {
        carrera.classList.add("d-none");
      }
    });
  });
});

const formulario = document.querySelector("#formInscripcion");

function mostrarError(campo, mensaje) {
  campo.classList.add("is-invalid");
  campo.classList.remove("is-valid");
  campo.parentElement.querySelector(".invalid-feedback").textContent = mensaje;
}

function marcarCorrecto(campo) {
  campo.classList.remove("is-invalid");
  campo.classList.add("is-valid");
}

if (formulario) {
  formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    let valido = true;

    const nombre = document.querySelector("#nombre");
    const correo = document.querySelector("#correo");
    const telefono = document.querySelector("#telefono");
    const distancia = document.querySelector("#distancia");
    const nivel = document.querySelector('input[name="nivel"]:checked');
    const errorNivel = document.querySelector("#errorNivel");
    const objetivo = document.querySelector("#objetivo");
    const terminos = document.querySelector("#terminos");

    if (nombre.value.trim().length < 5) {
      mostrarError(nombre, "Escribe tu nombre completo.");
      valido = false;
    } else {
      marcarCorrecto(nombre);
    }

    if (!correo.value.includes("@") || !correo.value.includes(".")) {
      mostrarError(correo, "Escribe un correo válido.");
      valido = false;
    } else {
      marcarCorrecto(correo);
    }

    if (telefono.value.length !== 10 || isNaN(telefono.value)) {
      mostrarError(telefono, "El teléfono debe tener 10 números.");
      valido = false;
    } else {
      marcarCorrecto(telefono);
    }

    if (distancia.value === "") {
      mostrarError(distancia, "Elige una distancia.");
      valido = false;
    } else {
      marcarCorrecto(distancia);
    }

    if (nivel === null) {
      errorNivel.classList.add("d-block");
      valido = false;
    } else {
      errorNivel.classList.remove("d-block");
    }

    if (objetivo.value.trim().length < 10) {
      mostrarError(objetivo, "Escribe al menos 10 letras.");
      valido = false;
    } else {
      marcarCorrecto(objetivo);
    }

    if (!terminos.checked) {
      mostrarError(terminos, "Debes aceptar el reglamento.");
      valido = false;
    } else {
      marcarCorrecto(terminos);
    }

    if (!valido) {
      Swal.fire({
        icon: "error",
        title: "Revisa el formulario",
        text: "Hay campos en rojo."
      });
      return;
    }

    const inscripciones = JSON.parse(localStorage.getItem("inscripciones")) || [];
    inscripciones.push({
      nombre: nombre.value,
      correo: correo.value,
      distancia: distancia.value
    });
    localStorage.setItem("inscripciones", JSON.stringify(inscripciones));

    Swal.fire({
      icon: "success",
      title: "¡Inscripción enviada!",
      text: "Bienvenido al grupo, " + nombre.value + "."
    });

    formulario.reset();
    document.querySelectorAll(".is-valid").forEach(function (campo) {
      campo.classList.remove("is-valid");
    });
  });
}
