"use strict";

import { getGames, createGame, deleteGame, updateGame } from "./rest-service.js";
import { compareGenre, compareTitle } from "./helper.js";

let games;

window.addEventListener("load", start);

function start() {
  updateGamesGrid();

  document.querySelector("#form-update-game-post").addEventListener("submit", updateGameClicked);
  document.querySelector("#button-create-post").addEventListener("click", showCreateGameDialog);
  document.querySelector("#form-create-game-post").addEventListener("submit", createGameClicked);
  document.querySelector("#form-delete-game-post").addEventListener("submit", deleteGameClicked);
  document.querySelector("#form-delete-game-post .btn-cancel").addEventListener("click", deleteCancelClicked);
  document.querySelector("#input-search").addEventListener("keyup", inputSearchChanged);
  document.querySelector("#input-search").addEventListener("search", inputSearchChanged);
  document.querySelector("#select-sort-by").addEventListener("change", sortByChanged);
  document.querySelector("#pg").addEventListener("change", filterGamesByPegi);
  document.querySelector("#pg-filter").addEventListener("click", (event) => {
    if (event.target.matches("button")) {
      const selectedValue = event.target.dataset.value;
      filterGamesByPegi(selectedValue);
    } else if (event.target.matches("#resetbtn")) {
      showGames();
    }
  });
}

function showCreateGameDialog() {
  document.querySelector("#dialog-create-game-post").showModal();
}

async function createGameClicked(event) {
  const form = event.target;
  const title = form.title.value;
  const body = form.body.value;
  const image = form.image.value;
  const genre = form.genre.value;
  const release = form.release.value;
  const pg = form.pg.value;
  form.reset();

  const response = await createGame(title, body, image, genre, release, pg);
  if (response.ok) {
    console.log("created");
    updateGamesGrid();
  } else {
    console.log(response.status, response.statusText);
    console.log("Error, please try again😎");
  }
}

async function updateGameClicked(event) {
  event.preventDefault();
  const form = event.target;
  const title = form.title.value;
  const body = form.body.value;
  const image = form.image.value;
  const genre = form.genre.value;
  const release = form.release.value;
  const pg = form.pg.value;
  const id = form.getAttribute("data-id");

  const response = await updateGame(id, title, body, image, genre, release, pg);
  if (response.ok) {
    console.log("UPDATED");
    updateGamesGrid();
    document.querySelector("#dialog-update-game-post").close();
  } else {
    console.log(response.status, response.statusText);
    console.log("Error, please try again😎");
  }
}

async function deleteGameClicked(event) {
  const id = event.target.getAttribute("data-id");
  deleteGame(id);
  const response = await deleteGame(id);
  if (response.ok) {
    console.log("Deleted");
    updateGamesGrid();
  } else {
    console.log(response.status, response.statusText);
    console.log("Error, please try again😎");
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
            <p>Genre: ${gameObject.genre}</p>
            <div class="btns">
            <button class="btn-update">Update</button>
            <button class="btn-delete">Delete</button>
            </div>
        </article>
    `;
  document.querySelector("#games").insertAdjacentHTML("beforeend", html);

  document.querySelector("#games article:last-child .btn-delete").addEventListener("click", () => deleteClicked(gameObject));
  document.querySelector("#games article:last-child .btn-update").addEventListener("click", () => updateClicked(gameObject));
  document.querySelector("#games article:last-child h3").addEventListener("click", () => gameClicked(gameObject));
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
  updateForm.genre.value = gameObject.genre || "";
  updateForm.release.value = gameObject.release;
  updateForm.pg.value = gameObject.pg;
  updateForm.setAttribute("data-id", gameObject.id);
  document.querySelector("#dialog-update-game-post").showModal();
}

function gameClicked(gameObject) {
  document.querySelector("#dialog-image").src = gameObject.image;
  document.querySelector("#dialog-title").textContent = gameObject.title;
  document.querySelector("#dialog-description").textContent = gameObject.body;
  document.querySelector("#dialog-genre").textContent = gameObject.genre;
  document.querySelector("#dialog-release-year").textContent = gameObject.release;
  document.querySelector("#dialog-pg").textContent = gameObject.pg;
  document.querySelector("#dialog-clicked").showModal();
}

async function updateGamesGrid() {
  games = await getGames();
  showGames(games);
}

// SEARCH AND FILTER FUNCTIONS //

function inputSearchChanged(event) {
  const value = event.target.value;
  const gamesToShow = searchGames(value);
  showGames(gamesToShow);
}

function searchGames(searchValue) {
  return games.filter((game) => game.title.toLowerCase().includes(searchValue.toLowerCase()));
}

function sortByChanged(event) {
  const selectedValue = event.target.value;
  if (selectedValue === "genre") {
    games.sort(compareGenre);
  } else if (selectedValue === "title") {
    games.sort(compareTitle);
  }

  showGames(games);
}

async function filterGamesByPegi(selectedValue) {
  const games = await getGames();
  let filteredGames;
  if (selectedValue) {
    filteredGames = games.filter((game) => {
      return game.pg === selectedValue;
    });
  } else {
    filteredGames = games;
  }
  showGames(filteredGames);
}

// SCROLL TO TOP FUNCTION //

document.querySelector("#top-btn").addEventListener("click", () => {
  document.documentElement.scrollTop = 0;
});
