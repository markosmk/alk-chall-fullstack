const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  /**
   * La pantalla de inicio deberá mostrar el balance actual, es decir,
   * el resultante de los ingresos y egresos de dinero cargados,
   * un listado de los últimos 10 registrados.
   */
  res.json({});
});

app.get('/operations/:id', (req, res, next) => {
  const id = req.params.id;
  console.log('normal');
  res.json({ ide: id });
});

app.post('/operations', (req, res, next) => {
  const data = req.body;
  console.log(data);
  res.json(data);
});

app.put('/operations/:id', (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  res.json({ data, id });
});

app.delete('/operations/:id', (req, res) => {
  const id = req.params.id;
  res.json(id);
});

app.listen(8000);
