const fs = require('fs/promises');

const readFile = async () => {
  try {
    const arrayTalkers = await fs.readFile('src/talker.json', 'utf8');
    return JSON.parse(arrayTalkers);
  } catch (error) {
    const err = new Error('Error opening file');
    err.statusCode = 500;
    throw err;
  }
};

const insertTalker = async (talker) => {
  try {
    const arrayTalkers = await readFile();
    arrayTalkers.push(talker);

    return await fs.writeFile('src/talker.json', JSON.stringify(arrayTalkers));
  } catch (error) {
    const err = new Error('Error writing file');
    err.statusCode = 500;
    throw err;
  }
};

const editTalkerArray = async (talker) => {
  try {
    const arrayTalkers = await readFile();

    const talkerTobeEdited = arrayTalkers.find((item) => Number(item.id) === talker.id);

    const index = arrayTalkers.indexOf(talkerTobeEdited);

    if (index !== -1) {
      arrayTalkers[index] = talker;
    }
    
    return await fs.writeFile('src/talker.json', JSON.stringify(arrayTalkers));
  } catch (error) {
    const err = new Error('Error writing file');
    err.statusCode = 500;
    throw err;
  }
};

module.exports = {
  readFile,
  insertTalker,
  editTalkerArray,
};