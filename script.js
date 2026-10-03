const canvas = document.getElementById('paintCanvas');
const ctx = canvas.getContext('2d');

// Configuración inicial del pincel
let isDrawing = false;
let currentColor = '#000000';
let currentLineWidth = 3;

// Manejo de eventos para pintar
function startDrawing(e) {
  isDrawing = true;
  draw(e);
}

function stopDrawing() {
  isDrawing = false;
  ctx.beginPath();
}

function draw(e) {
  if (!isDrawing) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  ctx.lineWidth = currentLineWidth;
  ctx.lineCap = 'round';
  ctx.strokeStyle = currentColor;

  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
}

// Event Listeners para el Canvas
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseleave', stopDrawing);

// Cambio de Colores
const colorButtons = document.querySelectorAll('.color-btn');
colorButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    colorButtons.forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    currentColor = e.target.getAttribute('data-color');
  });
});

// Cambio de Grosor de Pluma
const sizeButtons = document.querySelectorAll('.size-btn');
sizeButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    sizeButtons.forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    currentLineWidth = parseInt(e.target.getAttribute('data-size'));
  });
});

// Botón para Borrar Todo
const clearBtn = document.getElementById('clear-btn');
clearBtn.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
