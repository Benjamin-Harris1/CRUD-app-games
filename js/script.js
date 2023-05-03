"use strict";

const endpoint = "https://crud-app-games-default-rtdb.europe-west1.firebasedatabase.app/";

window.addEventListener("load", start);

function start() {}

function prepareGameData(dataObject) {
  const gameArray = [];
  for (const key of dataObject) {
    const games = dataObject[key];
    games.id = key;
    gameArray.push(post);
  }
  return gameArray;
}

// GAME FUNCTIONS //
async function getGames() {
  const response = await fetch(`${endpoint}/games.json`);
  const data = await response.json;
  const game = prepareGameData(data);
  return game;
}

function showGames(listofGames) {
  document.querySelector("#games").innerHTML = "";
  for (const game of listofGames) {
    showGames(game);
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
}

async function deleteGame(id) {
  console.log(id);
  const response = await fetch(`${endpoint}/games/${id}.json`, {
    method: "DELETE",
  });
  return response;
}

function deleteClicked(gameObject) {
  document.querySelector("#dialog-delete-game-title");
}
