export function addItem(input, array, cookieStorage) {
    array.push(input.value);
    cookieStorage.setCookie(array.length - 1, input.value);
  }

export function deleteItem(idx, array, cookieStorage,clearItem) {
    const cookies = cookieStorage.getCookie();
    for (let key in cookies) {
      if (cookies[key] === array[idx]) {
        cookieStorage.deleteCookie(key, cookies[key]);
      }
    }
    array.splice(idx, 1);
    if (array.length === 0) {
      clearItem.style.display = "none";
    }
  }

  export function editItem(input, array, currentElement, cookieStorage) {
    let oldCookie = array[currentElement];
    array[currentElement] = input.value;
    let allCookies = cookieStorage.getCookie();
    for (let key in allCookies) {
      if (oldCookie === allCookies[key]) {
        cookieStorage.setCookie(key, input.value);
      }
    }
  }

  export function editFlags(button, input, array, idx) {
    button.textContent = "Edit";
    input.value = array[idx];
  }

  export function clearArray(array) {
    array.splice(0, array.length);
  }