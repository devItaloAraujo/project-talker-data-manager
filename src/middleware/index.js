const fieldValidator = require('./fieldValidator');
const tokenValidator = require('./tokenValidator');
const { nameValidator, ageValidator } = require('./nameValidator'); 
const { talkValidator, rateValidator } = require('./talkValidator');
const addTalker = require('./addTalker');
const editTalker = require('./editTalker');
const deleteTalker = require('./deleteTalker');

module.exports = {
  fieldValidator,
  tokenValidator,
  nameValidator,
  ageValidator,
  talkValidator,
  rateValidator,
  addTalker,
  editTalker,
  deleteTalker,
};