//класс не связан с пользовательским интерфейсом, а полностью занят отправкой запросов на сервер и получением от них ответа.

export class Api {
    constructor(configApi) {
        this._baseUrl = configApi.baseUrl;
        this._headers = configApi.headers;
        //console.log(configApi)
        //console.log(this._baseUrl)
    }

    #onResponse(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`ошибка ${res.status}`)
    }

    //методы которые должен осуществлять данный класс:
    // - получить список всех карточек в виде массива (GET)
    getAllCards() {
      return fetch(`${this._baseUrl}/cards`, {
          headers: this._headers
      })
          .then(this.#onResponse)
     }

    // - удалить карточку (DELETE)
    deleteCard(idCard) {
        return fetch(`${this._baseUrl}/cards/${idCard}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this.#onResponse)
    }

    // - добавить карточку (POST)
    postCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data)
        })
            .then(this.#onResponse)
    }

    // - получить данные пользователя (GET)
    // - заменить данные пользователя (PATCH)
    // - заменить аватар (PATCH)
    // - “залайкать” карточку (PUT)
    // - удалить лайк карточки (DELETE)
}