const fs = require('fs/promises');
const { readFile } = require('../util/readAndWrite');

async function deleteTalker(req, res) {
  const deleteID = req.params.id; 
  const arrayTalkers = await readFile();
  const newArray = arrayTalkers.filter((item) => Number(item.id) !== Number(deleteID));
  await fs.writeFile('src/talker.json', JSON.stringify(newArray));
  res.status(204).send();
}
        
module.exports = deleteTalker;