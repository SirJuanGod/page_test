let intentos = 0;  // Variable para contar las veces que se ha respondido "no"

function iniciar() {
  // Obtener el nombre del usuario
  const nombre = document.getElementById("nombre").value;
  if (nombre.trim() === "") {
    document.getElementById("popup-no-name").classList.remove("oculto");
    return;
  }

  // Ocultar el cuadro de texto y mostrar la bienvenida
  document.getElementById("nombre-container").classList.add("oculto");
  document.getElementById("bienvenida-container").classList.remove("oculto");

  // Mostrar el mensaje de bienvenida con el nombre
  document.getElementById("mensaje-bienvenida").textContent = `Hola, ${nombre}! Vamos a ver si sabes de matemáticas.`;
  
  setTimeout(() => {
    document.getElementById("bienvenida-container").classList.add("oculto");
    document.getElementById("suma-container").classList.remove("oculto");
  }, 3000);
}

function verificarSuma() {
  const respuesta = document.getElementById("respuesta").value;
  if (respuesta === "4") {
    // Respuesta correcta, mostrar el slider, el canvas del corazón y el popup
    document.getElementById("suma-container").classList.add("oculto");
    document.getElementById("popup").classList.remove("oculto");  // Muestra el popup
  } else {
    document.getElementById("popup-fondo").classList.remove("oculto");
    document.getElementById("popup-incorrecto").classList.remove("oculto");
  }
}

function mostrarSlider() {
  // Ocultar el popup cuando se presiona "Continuar"
  document.getElementById("popup").classList.add("oculto");

  // Mostrar el slider, ya que la respuesta fue correcta
  document.getElementById("slider-container").classList.remove("oculto");
  document.getElementById("canvas-wrapper").classList.remove("oculto");
}

function dibujarCorazon() {
  const slider = document.getElementById("slider");
  const progreso = slider.value / 100; // Determina el progreso del slider
  const canvas = document.getElementById("corazonCanvas");
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpia el canvas

  const scale = canvas.width / 35;
  const offsetX = canvas.width / 2;
  const offsetY = canvas.height / 2;

  let primero = true;
  const path = new Path2D();

  // Dibuja el corazón de manera progresiva
  for (let t = 0; t <= Math.PI * 2 * progreso; t += 0.01) {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y =
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t);

    const px = offsetX + x * scale;
    const py = offsetY - y * scale;

    if (primero) {
      path.moveTo(px, py);
      primero = false;
    } else {
      path.lineTo(px, py);
    }
  }

  ctx.strokeStyle = "#ff6b81";
  ctx.lineWidth = 3;
  ctx.stroke(path);

  // Cuando el slider llega a 100% (corazón completo), rellena el corazón y muestra el mensaje
  if (progreso === 1) {
    ctx.fillStyle = "#ffb6c1";
    ctx.fill(path);
    mostrarMensaje();  // Muestra el mensaje romántico
    
    // Ocultar solo el slider
    document.getElementById("slider-container").classList.add("oculto");

    // Mostrar el mensaje final con los botones
    document.getElementById("mensaje-final").classList.remove("oculto");
  } else {
    document.getElementById("mensaje-final").classList.add("oculto");  // Oculta el mensaje final mientras el slider no ha llegado a 100%
  }
}

function mostrarMensaje() {
  // Asegúrate de que este código funcione y no haya problemas con el DOM
  document.getElementById("mensaje-final").classList.remove("oculto");
}

function respuesta(opcion) {
  // Se genera el confeti si el usuario responde "Sí"
  if (opcion === "Sí") {
    // Mostrar mensaje "Te amo" y luego generar el confeti
    mostrarMensajeTeAmoYConfeti();
  } else if (opcion === "No") {
    intentos++;
    if (intentos === 2) {
      // Si el usuario ha fallado 2 veces, mostrar el popup de intentos
      document.getElementById("popup-intentos").classList.remove("oculto");
      setTimeout(() => {
        location.reload(); // Recargar la página después de 300 ms
      }, 300);
    } else {
      document.getElementById("popup-no").classList.remove("oculto");
    }
  }
}

function mostrarMensajeTeAmoYConfeti() {
  // Ocultar todo el contenido actual
  document.getElementById("mensaje-final").classList.add("oculto");
  document.getElementById("slider-container").classList.add("oculto");
  document.getElementById("canvas-wrapper").classList.add("oculto");
  document.getElementById("popup").classList.add("oculto");
  
  // Mostrar el mensaje "Te amo"
  const mensajeTeAmo = document.createElement("div");
  mensajeTeAmo.style.position = "absolute";
  mensajeTeAmo.style.top = "50%";
  mensajeTeAmo.style.left = "50%";
  mensajeTeAmo.style.transform = "translate(-50%, -50%)";
  mensajeTeAmo.style.fontSize = "2em";
  mensajeTeAmo.style.color = "#ff6b81";
  mensajeTeAmo.style.fontWeight = "bold";
  mensajeTeAmo.style.textAlign = "center";
  mensajeTeAmo.style.zIndex = "9999"; // Asegurarse de que se vea por encima de todo
  mensajeTeAmo.innerText = "¡Te amo! ❤️";

  // Añadir el mensaje al DOM
  document.body.appendChild(mensajeTeAmo);

  // Después de mostrar el mensaje, generar el confeti
  setTimeout(() => {
    for (let i = 0; i < 30; i++) {
      generarBasuraFiesta();
    }

    // Después de 3 segundos, recargar la página
    setTimeout(() => {
      location.reload(); // Recargar la página después de mostrar el confeti
    }, 3000);
  }, 500); // Esperar 1 segundo antes de generar el confeti
}

function reiniciar() {
  // Limpiar el campo de respuesta
  document.getElementById("respuesta").value = "";

  // Ocultar el popup de respuesta incorrecta y el fondo oscuro
  document.getElementById("popup-fondo").classList.add("oculto");  // Ocultar el fondo oscuro
  document.getElementById("popup-incorrecto").classList.add("oculto");  // Ocultar el popup de error

  // Ocultar el mensaje de respuesta incorrecta
  document.getElementById("respuesta-incorrecta").classList.add("oculto");

  // Mostrar la pregunta de suma nuevamente
  document.getElementById("suma-container").classList.remove("oculto");

  // Ocultar otras partes que pueden haber estado visibles
  document.getElementById("slider-container").classList.add("oculto");
  document.getElementById("mensaje-final").classList.add("oculto");

  // Reiniciar el slider
  document.getElementById("slider").value = 0;

  // Limpiar el canvas (el corazón)
  const canvas = document.getElementById("corazonCanvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function reiniciarpregunta() {
    document.getElementById('popup-no').classList.add('oculto');
    document.getElementById('mensaje-final').classList.remove('oculto');
}

function generarBasuraFiesta() {
  // Crear un elemento "basura de fiesta"
  const confeti = document.createElement("div");
  confeti.classList.add("confeti");

  // Asignar color aleatorio
  const colores = ["#ff6b81", "#ff9b9b", "#ff4d6d", "#ff3b55", "#f3a8b8"];
  confeti.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)];

  // Asignar tamaño aleatorio
  const tamaño = Math.random() * (25 - 10) + 10; // Tamaño entre 10px y 25px
  confeti.style.width = `${tamaño}px`;
  confeti.style.height = `${tamaño}px`;

  // Posición aleatoria en el eje X (siempre comienza desde la parte superior)
  const x = Math.random() * window.innerWidth;  // Posición aleatoria en el eje X
  const y = 0; // Siempre comienza desde la parte superior

  // Establecer la posición inicial
  confeti.style.position = "absolute";
  confeti.style.top = `${y}px`;
  confeti.style.left = `${x}px`;

  // Añadir el confeti al DOM
  document.body.appendChild(confeti);

  // Establecer las animaciones de dispersión
  const duracion = Math.random() * (3 - 2) + 2;  // Duración aleatoria de la animación (entre 2s y 3s)
  const dispersarX = Math.random() * 300 - 150; // Movimiento aleatorio horizontal
  const dispersarY = Math.random() * 300 + 500; // Movimiento aleatorio vertical (cae desde arriba)

  // Asignar las propiedades CSS para el movimiento de dispersión
  confeti.style.setProperty('--confeti-x', `${dispersarX}px`);
  confeti.style.setProperty('--confeti-y', `${dispersarY}px`);

  // Asignar la animación de caída y dispersión
  confeti.style.animation = `caer ${duracion}s ease-in-out forwards, dispersarse ${duracion}s ease-in-out forwards`;

  // El confeti desaparecerá después de 3 segundos
  setTimeout(() => {
    confeti.remove();
  }, 3000);
}



function continuar() {
  // Esta función se llama cuando el usuario presiona "Continuar"
  document.getElementById("popup").classList.add("oculto");
  document.getElementById("suma-container").classList.remove("oculto");
}

function cancelar() {
  // Esta función se llama cuando el usuario presiona "Cancelar" en el popup
  document.getElementById("popup").classList.add("oculto");
  document.getElementById("mensaje-final").classList.add("oculto");
}

function reiniciar_name() {
  // Ocultar el popup de nombre no ingresado
  document.getElementById("popup-no-name").classList.add("oculto");

  // Limpiar el campo de nombre
  document.getElementById("nombre").value = "";

  // Volver a mostrar el contenedor del nombre
  document.getElementById("nombre-container").classList.remove("oculto");
}