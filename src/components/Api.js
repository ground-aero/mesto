//класс не связан с пользовательским интерфейсом, а полностью занят отправкой запросов на сервер и получением от них ответа.
import {configApi} from "../utils/constants";

export class Api {
    constructor(configApi) {
        this._url = configApi.url;
        this._headers = configApi.headers;
         console.log(configApi)
        console.log(this._url)
    }
    //методы которые должен осуществлять данный класс:
    // - получить список всех карточек в виде массива (GET)
    getAllCards() {
      return fetch(`${this._url}/cards`, {
          headers: this._headers
      })
          .then(function(res) {
              return res.json()
          })
          // .catch((err) => {
          //     console.log("текст ошибки", err)
          // })
    }
    // - добавить карточку (POST)
    // - удалить карточку (DELETE)
    // - получить данные пользователя (GET)
    // - заменить данные пользователя (PATCH)
    // - заменить аватар (PATCH)
    // - “залайкать” карточку (PUT)
    // - удалить лайк карточки (DELETE)
}