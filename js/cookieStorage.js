export const cookieStorage = {
  setCookie: (key, value) => {
    document.cookie = `${key}=${value};max-age=360000`;
  },

  deleteCookie: (key, value) => {
    document.cookie = `${key}=${value};max-age=-1`;
  },

  getCookie: () => {
    const cookies = document.cookie
      .split(";")
      .map((cookie) => cookie.split("="))
      .reduce((acc, [key, value]) => ({ ...acc, [key.trim()]: value }), {});
    return cookies;
  },

  clearCookies: function () {
    let allCookies = this.getCookie();
    for (let key in allCookies) {
      this.deleteCookie(key, allCookies[key]);
    }
  }
  
};
