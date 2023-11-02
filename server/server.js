const path = require('path');
const express = require('express');

const app = express();

const PORT = 3000;

const textController = require('./controllers/textController');

/**
 * handle parsing request body
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api', textController.createTitle, (req, res) => {
  return res.status(200).json(res.locals.text);
});

app.get('/api', textController.getAll, (req, res) => {
  return res.status(200).json(res.locals.titles);
})

app.get('/api/:title', textController.view, (req, res) => {
  return res.status(200).json(res.locals.text);
})

app.delete('/api', textController.delete, (req, res) => {
  return res.status(200).json('deleted')
})

app.use('/deleteAll', textController.deleteAll, (req, res) => {
  return res.status(200).json('deleted all');
})


app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;