import { prepareGameData } from "./helper.js";

const endpoint = "https://database-fce4a-default-rtdb.europe-west1.firebasedatabase.app/";

async function getGames() {
  const response = await fetch(`${endpoint}/games.json`);
  const data = await response.json();
  const games = prepareGameData(data);
  return games;
}

async function createGame(title, body, image, genre) {
  const newGame = { title, body, image, genre };
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

async function updateGame(id, title, body, image, genre) {
  const gameToUpdate = { title, body, image, genre };
  const json = JSON.stringify(gameToUpdate);
  const response = await fetch(`${endpoint}/games/${id}.json`, {
    method: "PUT",
    body: json,
  });
  return response;
}

export { getGames, createGame, deleteGame, updateGame };
