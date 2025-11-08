
# Proyecto Final – Conversor de Monedas / Criptos

**Alumno:** Iván Delgadillo  
**Curso:** JavaScript – Coderhouse  
**Entrega:** ProyectoFinal+Delgadillo

---

## Descripción
Simulador interactivo que convierte entre monedas/criptomonedas con tasas **simuladas** desde un archivo JSON cargado de forma **asíncrona**. La interfaz HTML se genera dinámicamente desde JavaScript. Se utiliza **SweetAlert2** como librería externa para los mensajes de usuario.

## Funcionalidades
- Conversión entre monedas/criptos (USD, EUR, ARS, BRL, CLP, USDT).
- **Swap** de moneda origen/destino.
- **Historial** de las últimas 5 conversiones (persistido en `localStorage`).
- **Precarga** de formulario: monto inicial en `1`, origen `USD`, destino `ARS`.
- **Tasas simuladas** en `tasas.json` (editables).

## Estructura del proyecto
```
ProyectoFinal+Delgadillo/
├─ index.html        # HTML base (incluye SweetAlert2 por CDN)
├─ styles.css        # Estilos básicos
├─ app.js            # Lógica + DOM + eventos + fetch + historial
└─ tasas.json        # Datos simulados (cargados asíncronamente)
```

## Cómo ejecutar
> Recomendado levantar un servidor estático para permitir `fetch` del JSON.

### Opción : VSCode (Live Server)
1. Instalar la extensión **Live Server**.
2. Click derecho en `index.html` → **Open with Live Server**.

---
## Notas
- Las tasas de cambio son **de ejemplo** para el TP. Se pueden ajustar en `tasas.json`.



