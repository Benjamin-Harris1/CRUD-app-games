function prepareGameData(dataObject) {
  const gameArray = [];
  for (const key in dataObject) {
    const object = dataObject[key];
    object.id = key;
    gameArray.push(object);
  }
  return gameArray;
}

export { prepareGameData };
