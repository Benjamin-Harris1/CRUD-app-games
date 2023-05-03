const endpoint = "https://database-fce4a-default-rtdb.europe-west1.firebasedatabase.app/";

async function getGames() {
  const response = await fetch(`${endpoint}/games.json`);
  const data = await response.json();
  const game = prepareGameData(data);
  return game;
}

async function createGame(title, body, image) {
  const newGame = { title, body, image };
  const json = JSON.stringify(newGame);
  const response = await fetch(`${endpoint}/games.json`, {
    method: "POST",
    body: json,
  });
  return response;
}

async function deleteGame(id) {
  const response = await fetch(`${endpoint}/games/${id}.json`, {
    method: "DELETE",
  });
  return response;
}

async function updateGame(id, title, body, image) {
  const gameToUpdate = { title, body, image };
  const json = json.stringify(gameToUpdate);
  const response = await fetch(`${endpoint}/${id}.json`, {
    method: "PUT",
    body: json,
  });
}
