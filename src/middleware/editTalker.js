const { readFile, editTalkerArray } = require('../util/readAndWrite');

async function editTalker(req, res) {
  const editID = req.params.id; 
  const newTalker = { id: Number(editID), ...req.body };
  const arrayTalkers = await readFile();
  if (arrayTalkers.find((item) => Number(item.id) === Number(newTalker.id)) === undefined) {
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }
  await editTalkerArray(newTalker);
  res.status(200).json(newTalker);
}
        
module.exports = editTalker;