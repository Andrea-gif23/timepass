const express = require('express');
const app = express();
const PORT = 3000;


const horaMiddleware = (req, res, next) => {
  const ahora = new Date();
  req.horaActual = ahora.getHours();
  req.minutosActuales = ahora.getMinutes();
  next();
};


const validarHora = (req, res, next) => {
  if (req.horaActual >= 12 && req.horaActual <= 24) {
    next(); 
  } else {
    const mensaje = 'Aún no son las 12 de la mañana. Intenta más tarde.';
    return res.redirect('/?mensaje=' + encodeURIComponent(mensaje));
  }
};

app.get('/', horaMiddleware, (req, res) => {
  const mensaje = req.query.mensaje || `Bienvenido. La hora actual es ${req.horaActual}:${req.minutosActuales}`;
  res.send(`
    <h1>${mensaje}</h1>
    <form action="/endroute" method="GET">
      <button type="submit">Ir a Endroute</button>
    </form>
  `);
});


app.get('/endroute', horaMiddleware, validarHora, (req, res) => {
  res.send(`
    <h1>Bienvenido a la ruta /endroute</h1>
    <a href="/">Volver a Inicio</a>
  `);
});


app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
