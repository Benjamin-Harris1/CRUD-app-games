function prepareGameData(dataObject) {
  const gameArray = [];
  for (const key in dataObject) {
    const game = dataObject[key];
    game.id = key;
    gameArray.push(game);
  }
  return gameArray;
}
