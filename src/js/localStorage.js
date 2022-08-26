import {arrayCarrinho} from "./app.js   "


class LocalStorage {

    static updateLocalStorage () {
      localStorage.setItem('arrayCarrinho', JSON.stringify(arrayCarrinho))
    }
}

export {LocalStorage}