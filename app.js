// Proyecto Final – Conversor 
let tasas = {};            // tabla cargada del JSON
let historial = [];        // últimas conversiones
const MAX_H = 5;           // tope del historial

document.addEventListener('DOMContentLoaded', () => {
  fetch('tasas.json')
    .then(r => r.json())
    .then(data => {
      tasas = data;
      dibujarUI(Object.keys(tasas));
      cargarHistorial();
      renderHistorial();
    })
    .catch(err => {
      console.error(err);
      Swal.fire('Error', 'No se pudo cargar tasas.json', 'error');
    });
});

function dibujarUI(codigos){
  const app = document.getElementById('app');
  app.innerHTML = `
    <section class="card">
      <h2>Ingresar datos</h2>
      <div class="row">
        <input id="monto" type="number" min="0" step="0.01" placeholder="Monto">
        <select id="desde">${ opciones(codigos) }</select>
        <select id="hacia">${ opciones(codigos) }</select>
        <button id="btnConvertir">Convertir</button>
        <button id="btnSwap" title="Intercambiar">↔</button>
      </div>
      <p class="muted">Tasas simuladas desde JSON. Editables en <code>tasas.json</code>.</p>
    </section>
    <section class="card">
      <h2>Resultado</h2>
      <div id="resultado">—</div>
    </section>
    <section class="card">
      <h2>Historial (últimos 5)</h2>
      <ul id="historial"></ul>
      <div class="row">
        <button id="btnGuardar">Guardar historial</button>
        <button id="btnCargar">Cargar historial</button>
        <button id="btnLimpiar" style="margin-left:auto">Limpiar</button>
      </div>
      <p class="muted">Historial guardado en localStorage.</p>
    </section>
  `;

  // valores por defecto + precarga del monto
  document.getElementById('desde').value = 'USD';
  document.getElementById('hacia').value = 'ARS';
  document.getElementById('monto').value = 1;

  // eventos
  document.getElementById('btnConvertir').addEventListener('click', convertir);
  document.getElementById('btnSwap').addEventListener('click', () => {
    const d = document.getElementById('desde');
    const h = document.getElementById('hacia');
    const aux = d.value;
    d.value = h.value;
    h.value = aux;
  });
  document.getElementById('monto').addEventListener('keyup', (e)=>{
    if(e.key === 'Enter') convertir();
  });
  document.getElementById('btnGuardar').addEventListener('click', ()=>{
    guardarHistorial(); Swal.fire('Guardado','Historial guardado','success');
  });
  document.getElementById('btnCargar').addEventListener('click', ()=>{
    cargarHistorial(); renderHistorial(); Swal.fire('Cargado','Historial cargado','info');
  });
  document.getElementById('btnLimpiar').addEventListener('click', ()=>{
    historial = []; guardarHistorial(); renderHistorial();
    Swal.fire('Listo','Historial limpiado','warning');
  });
}

function opciones(arr){
  return arr.map(c => `<option value="${c}">${c}</option>`).join('');
}

function convertir(){
  const monto = parseFloat(document.getElementById('monto').value);
  const desde = document.getElementById('desde').value;
  const hacia = document.getElementById('hacia').value;

  if(!monto || monto <= 0){
    Swal.fire('Atención', 'Ingresá un monto válido (> 0)', 'warning');
    return;
  }
  if(desde === hacia){
    const txt = `${fmt(monto)} ${hacia}`;
    actualizarResultado(txt);
    pushHist(`${fmt(monto)} ${desde} = ${fmt(monto)} ${hacia}`);
    renderHistorial();
    return;
  }

  const tDesde = tasas[desde];
  const tHacia = tasas[hacia];
  if(!tDesde || !tHacia){
    Swal.fire('Error', 'Moneda no encontrada', 'error');
    return;
  }

  const enUSD = monto / tDesde;
  const convertido = enUSD * tHacia;

  const salida = `${fmt(monto)} ${desde} = ${fmt(convertido)} ${hacia}`;
  actualizarResultado(salida);
  pushHist(`${fmt(monto)} ${desde} → ${fmt(convertido)} ${hacia}`);
  renderHistorial();
}

function actualizarResultado(texto){
  document.getElementById('resultado').textContent = texto;
}

function fmt(n){
  return Number(n).toLocaleString('es-AR', { maximumFractionDigits: 2 });
}

function pushHist(linea){
  historial.unshift(linea);
  if(historial.length > MAX_H) historial.pop();
  try{ localStorage.setItem('pf_hist', JSON.stringify(historial)); }catch{}
}

function guardarHistorial(){
  try{ localStorage.setItem('pf_hist', JSON.stringify(historial)); }catch{}
}

function cargarHistorial(){
  try{
    const raw = localStorage.getItem('pf_hist');
    if(raw){
      const arr = JSON.parse(raw);
      if(Array.isArray(arr)) historial = arr;
    }
  }catch{}
}

function renderHistorial(){
  const ul = document.getElementById('historial');
  ul.innerHTML = '';
  historial.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    ul.appendChild(li);
  });
}
