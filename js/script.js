"use strict";

const endpoint = "https://database-fce4a-default-rtdb.europe-west1.firebasedatabase.app/";

let games;

window.addEventListener("load", start);

async function start() {
  games = await getGames();
  showGames(games);
  updateGamesGrid();
}

function prepareGameData(dataObject) {
  const gameArray = [];
  for (const key of Object.keys(dataObject)) {
    const game = dataObject[key];
    game.id = key;
    gameArray.push(game);
  }
  return gameArray;
}

// GAME FUNCTIONS //
async function getGames() {
  const response = await fetch(`${endpoint}/games.json`);
  const data = await response.json();
  const game = prepareGameData(data);
  return game;
}

function showGames(listofGames) {
  document.querySelector("#games").innerHTML = "";
  for (const game of listofGames) {
    showGame(game);
  }
}

function showGame(games) {
  const html =
    /*html*/
    `
    <article class="grid-item">
    <p>${games.title}</p>
    <img src = "${games.image}">
    <p></p>${games.body}</p>
    <p>${games.genre}</p>
    </article>
    <div class="buttons">
    <button class="button-delete">Delete</button>
    <button class="button-update">Update</button>
    </div>
    `;
  document.querySelector("#games").insertAdjacentHTML("beforeend", html);

  document.querySelector("#games article:last-child .button-delete").addEventListener("click", () => deleteClicked(gameObject));
}

async function deleteGame(id) {
  const response = await fetch(`${endpoint}/games/${id}.json`, {
    method: "DELETE",
  });
  return response;
}

function deleteClicked(game) {
  document.querySelector("#dialog-delete-game-title").textContent = game.title;
  document.querySelector("#form-delete-game-post").setAttribute("data-id", game.id);
  document.querySelector("#dialog-delete-game").showModal();
}

async function updateGamesGrid() {
  games = await getGames();
  showGames(games);
}
