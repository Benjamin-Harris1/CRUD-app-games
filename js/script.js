"use strict";

const endpoint = "https://database-fce4a-default-rtdb.europe-west1.firebasedatabase.app/";

let games;

window.addEventListener("load", start);

function start() {
  updateGamesGrid();

  document.querySelector("#button-create-post").addEventListener("click", showCreateGameDialog);
  document.querySelector("#form-create-game-post").addEventListener("submit", createGameClicked);
  document.querySelector("#form-update-game-post").addEventListener("submit", updateGameClicked);
  document.querySelector("#form-delete-game-post").addEventListener("submit", deleteGameClicked);
  document.querySelector("#form-delete-game-post .btn-cancel").addEventListener("click", deleteCancelClicked);
}

function showCreateGameDialog() {
  document.querySelector("#dialog-create-game-post").showModal();
}

async function createGameClicked(event) {
  const form = event.target;
  const title = form.title.value;
  const body = form.body.value;
  const image = form.image.value;
  createGame(title, body, image);
  form.reset();

  const response = await createGame(title, body, image);
  if (response.ok) {
    console.log("created");
    updateGamesGrid();
  }
}

async function updateGameClicked(event) {
  const form = event.target;
  const title = form.title.value;
  const body = form.body.value;
  const image = form.image.value;
  const id = form.getAttribute("data-id");

  const response = await updateGame(id, title, body, image);
  if (response.ok) {
    console.log("UPDATED BITCH");
    updateGamesGrid();
  }
}

async function deleteGameClicked(event) {
  const id = event.target.getAttribute("data-id");
  deleteGame(id);

  const response = await deleteGame(id);
  if (response.ok) {
    console.log("Deleted");
    updateGamesGrid();
  }
}

function deleteCancelClicked() {
  document.querySelector("#dialog-delete-game-post").close();
}

// GAME FUNCTIONS //

function showGames(listOfPosts) {
  document.querySelector("#games").innerHTML = "";

  for (const game of listOfPosts) {
    showGame(game);
  }
}

function showGame(gameObject) {
  const html = /*html*/ `
        <article class="grid-item">
        <h3>${gameObject.title}</h3>
            <img src="${gameObject.image}" />
            <p>${gameObject.body}</p>
            <p>${gameObject.genre}</p>
            <div class="btns">
                <button class="btn-delete">Delete</button>
                <button class="btn-update">Update</button>
            </div>
        </article>
    `;
  document.querySelector("#games").insertAdjacentHTML("beforeend", html); // append html to the DOM - section#posts

  document.querySelector("#games article:last-child .btn-delete").addEventListener("click", () => deleteClicked(gameObject));
  document.querySelector("#games article:last-child .btn-update").addEventListener("click", () => updateClicked(gameObject));
}

function deleteClicked(gameObject) {
  document.querySelector("#dialog-delete-game-post-title").textContent = gameObject.title;
  document.querySelector("#form-delete-game-post").setAttribute("data-id", gameObject.id);
  document.querySelector("#dialog-delete-game-post").showModal();
}

function updateClicked(gameObject) {
  const updateForm = document.querySelector("#form-update-game-post");
  updateForm.title.value = gameObject.title;
  updateForm.body.value = gameObject.body;
  updateForm.image.value = gameObject.image;
  updateForm.setAttribute("data-id", gameObject.id);
  document.querySelector("#dialog-update-game-post").showModal();
}

async function updateGamesGrid() {
  games = await getGames();
  showGames(games);
}

// REST-SERVICES //

async function getGames() {
  const response = await fetch(`${endpoint}/games.json`);
  const data = await response.json();
  const games = prepareGameData(data);
  return games;
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
  const response = await fetch(`${endpoint}/games/${id}.json`, {
    method: "PUT",
    body: json,
  });
  return response;
}

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
