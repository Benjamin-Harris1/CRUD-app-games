"use strict";

const endpoint = "https://database-fce4a-default-rtdb.europe-west1.firebasedatabase.app/";

let games;

window.addEventListener("load", start);

function start() {
  updateGamesGrid();

  document.querySelector("#form-delete-game-post").addEventListener("submit", deleteClicked);
  document.querySelector("#form-delete-game-post .btn-cancel").addEventListener("click", deleteCancelClicked);
}

function prepareGameData(dataObject) {
  const gameArray = [];
  for (const key in dataObject) {
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

function showGame(gameObject) {
  const html =
    /*html*/
    `
    <article class="grid-item">
    <p>${gameObject.title}</p>
    <img src = "${gameObject.image}">
    <p></p>${gameObject.body}</p>
    <p>${gameObject.genre}</p>
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

function deleteClicked(games) {
  document.querySelector("#dialog-delete-game-title").textContent = game.title;
  document.querySelector("#form-delete-game-post").setAttribute("data-id", game.id);
  document.querySelector("#dialog-delete-game").showModal();
}

function deleteCancelClicked() {
  document.querySelector("#dialog-delete-game-post").close();
}

async function updateGamesGrid() {
  games = await getGames();
  showGames(games);
}
