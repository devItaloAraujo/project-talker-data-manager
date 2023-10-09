const validateDate = require('validate-date');

const responseType = 'boolean';
const dateFormat = 'dd/mm/yyyy';

function talkValidator(req, res, next) {  
  const { talk } = req.body;  
  if (!talk) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório',
    });
  } 
  const { watchedAt } = talk;
  if (!watchedAt) {
    return res.status(400).json({
      message: 'O campo "watchedAt" é obrigatório',
    });
  }
  if (!validateDate(watchedAt, responseType, dateFormat)) {
    return res.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  next();
}
  
function testRateNumber(number) {
  return Number(number) <= 5 && Number(number) >= 1 && Number.isInteger(number);
}

function rateValidator(req, res, next) {    
  const { talk } = req.body;
  const { rate } = talk;    
 
  if (!rate && rate !== 0) {
    return res.status(400).json({
      message: 'O campo "rate" é obrigatório',
    });
  }
  if (!testRateNumber(rate)) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
    });
  }
  next();
}
    
module.exports = { talkValidator, rateValidator };