const display = document.getElementById("display");
const clickSound = document.getElementById("clickSound");
const bgMusic = document.getElementById("bgMusic");
const historialDiv = document.getElementById("historial");

let operacion = "";

function agregar(valor) {
  clickSound.play();
  operacion += valor;
  display.textContent = operacion;
}

function operar(func) {
  clickSound.play();
  operacion += `Math.${func}`;
  display.textContent = operacion;
}

function calcular() {
  clickSound.play();
  try {
    const resultado = eval(operacion);
    guardarHistorial(operacion + " = " + resultado);
    display.textContent = resultado;
    operacion = "" + resultado;
  } catch (e) {
    display.textContent = "Error";
  }
}

function limpiar() {
  operacion = "";
  display.textContent = "0";
}

function borrar() {
  operacion = operacion.slice(0, -1);
  display.textContent = operacion || "0";
}

function guardarHistorial(item) {
  let historial = JSON.parse(localStorage.getItem("historial")) || [];
  historial.unshift(item);
  localStorage.setItem("historial", JSON.stringify(historial));
  mostrarHistorial();
}

function mostrarHistorial() {
  const historial = JSON.parse(localStorage.getItem("historial")) || [];
  historialDiv.innerHTML = historial.map(op => `<p>${op}</p>`).join("");
}

function borrarHistorial() {
  localStorage.removeItem("historial");
  mostrarHistorial();
}

document.getElementById("modo").onclick = () => {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
};

document.getElementById("musicaBtn").onclick = () => {
  if (bgMusic.paused) bgMusic.play();
  else bgMusic.pause();
};

mostrarHistorial();

// Agrega sonido al hacer clic en cualquier botón
document.querySelectorAll('button').forEach(boton => {
  boton.addEventListener('click', () => {
    const sonido = document.getElementById('clickSound');
    if (sonido) {
      sonido.currentTime = 0;
      sonido.play().catch(err => console.warn("Error al reproducir el sonido:", err));
    }
  });
});
