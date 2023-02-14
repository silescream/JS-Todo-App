import { cookieStorage } from "./cookieStorage.js";
import {
  addItem,
  deleteItem,
  editItem,
  editFlags,
  clearArray,
} from "./itemsManipulation.js";

const input = document.querySelector(".grocery-form__input");
const inputButton = document.querySelector(".grocery-form__input-button");
const contentList = document.querySelector(".grocery-content__list");
const clearItemsButton = document.querySelector(".grocery-content__clear");
const error = document.querySelector(".grocery-form__error");

let itemsArray = [];
let editFlag = false;
let currentElement = "";

inputButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (input.value === " " || input.value === "") {
    error.style.display = "block";
    input.value = "";
  } else {
    if (!editFlag) {
      addItem(input, itemsArray, cookieStorage);
    } else {
      editItem(input, itemsArray, currentElement, cookieStorage);
      editFlag = false;
      inputButton.textContent = "Add";
    }
    renderItemList(contentList, itemsArray);
    input.value = "";
    clearItemsButton.style.display = "block";
    error.style.display = "none";
  }
});

clearItemsButton.addEventListener("click", () => {
  clearArray(itemsArray);
  cookieStorage.clearCookies();
  contentList.innerHTML = "";
  clearItemsButton.style.display = "none";
});

function onLoad() {
  let onLoadCookies = cookieStorage.getCookie();
  for (let key in onLoadCookies) {
    if (onLoadCookies[key]) {
      itemsArray.push(onLoadCookies[key]);
    }
  }
  if (itemsArray.length !== 0) {
    clearItemsButton.style.display = "block";
  }
  renderItemList(contentList, itemsArray);
}

function renderItemList(contentSelector, array) {
  contentSelector.innerHTML = "";
  array.forEach((e) => {
    let listItem = document.createElement("li");
    listItem.classList.add("grocery-content__item");
    listItem.innerHTML = `<span class ="grocery-content__text">${e}</span>
                        <div class="grocery-content__icons">
                            <img class="grocery-content__edit-icon" src="icons/edit.svg" alt="edit-icon">
                            <img class="grocery-content__delete-icon" src="icons/delete.svg" alt="delete-icon">
                        </div> `;
    contentSelector.append(listItem);
  });
  document
    .querySelectorAll(".grocery-content__delete-icon")
    .forEach((btn, idx) => {
      btn.addEventListener("click", () => {
        deleteItem(idx, itemsArray, cookieStorage, clearItemsButton);
        renderItemList(contentList, itemsArray);
      });
    });

  document
    .querySelectorAll(".grocery-content__edit-icon")
    .forEach((btn, idx) => {
      btn.addEventListener("click", () => {
        editFlags(inputButton, input, itemsArray, idx);
        editFlag = true;
        currentElement = idx;
        console.log(currentElement);
      });
    });
}

onLoad();
