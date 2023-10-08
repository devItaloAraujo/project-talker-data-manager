const randtoken = require('rand-token');
const validator = require('email-validator');

function validateEmail(email) {
  if (!email) {
    return [false, 'O campo "email" é obrigatório'];
  }
  if (!validator.validate(email)) {
    return [false, 'O "email" deve ter o formato "email@email.com"'];
  }
  return [true];
}

function validatePassword(password) {
  if (!password) {
    return [false, 'O campo "password" é obrigatório'];
  }
  if (password.length < 6) {
    return [false, 'O "password" deve ter pelo menos 6 caracteres'];
  }
  return [true];
}

function fieldValidator(req, res) {
  const { email, password } = req.body;
  if (!validateEmail(email)[0]) {
    return res.status(400).json({
      message: validateEmail(email)[1],
    });
  }

  if (!validatePassword(password)[0]) {
    return res.status(400).json({
      message: validatePassword(password)[1],
    });
  }
  
  const token = randtoken.generate(16);
  return res.status(200).json({ token });
}

module.exports = fieldValidator; 