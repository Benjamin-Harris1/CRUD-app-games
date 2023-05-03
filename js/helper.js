// HELPER //

function prepareGameData(dataObject) {
  const gameArray = [];
  for (const key in dataObject) {
    const object = dataObject[key];
    object.id = key;
    gameArray.push(object);
  }
  return gameArray;
}

function compareGenre(game1, game2) {
  return game1.genre.localeCompare(game2.genre);
}

function compareTitle(game1, game2) {
  return game1.title.localeCompare(game2.title);
}

export { prepareGameData, compareGenre, compareTitle };
