const { readFile, insertTalker } = require('../util/readAndWrite');

async function addTalker(req, res) {
  const talkerList = await readFile();
  const newTalker = { id: talkerList.length + 1, ...req.body };
  await insertTalker(newTalker);
  res.status(201).json(newTalker);
}
        
module.exports = addTalker;