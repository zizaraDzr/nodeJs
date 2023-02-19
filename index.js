import express from 'express';

const app = express();
const port = 8000;

app.get('/hello', (req, res) => {
  res.send({ succes: true });
});

app.listen(port, () => {
  console.log(`сервер запущен ${port}`);
});
