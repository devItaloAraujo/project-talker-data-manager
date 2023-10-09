const express = require('express');
const fs = require('fs');
const { 
  fieldValidator, 
  tokenValidator, 
  nameValidator,
  ageValidator,
  talkValidator,
  rateValidator,
  addTalker,
} = require('./middleware');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;
const PORT = process.env.PORT || '3001';

const path = 'src/talker.json';

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (req, res) => {
  fs.readFile(path, 'utf8', (errFile, file) => {
  // check for any errors
    if (errFile) {
      console.error('Error while reading the file:', errFile);
      return;
    }
    if (file) {
      const data = JSON.parse(file);
      // output the parsed data
      res.status(HTTP_OK_STATUS).json(data);
    } else {
      res.status(HTTP_OK_STATUS).json([]);
    }
  });
});

app.get('/talker/:id', (req, res) => {
  fs.readFile(path, 'utf8', (errFile, file) => {
    if (file) {
      const data = JSON.parse(file);
      const arrayOfIds = data.map((element) => element.id);
      if (arrayOfIds.includes(Number(req.params.id))) {
        const result = data[req.params.id - 1];
        res.status(HTTP_OK_STATUS).json(result);
      } else {
        res.status(HTTP_NOT_FOUND_STATUS).json({
          message: 'Pessoa palestrante não encontrada',
        });
      }
    } else {
      res.status(HTTP_OK_STATUS).json([]);
    }
  });
});

app.post('/login', fieldValidator);

app.post('/talker', tokenValidator, 
  nameValidator, 
  ageValidator, 
  talkValidator, 
  rateValidator,
  addTalker);

app.listen(PORT, () => {
  console.log('Online');
});
