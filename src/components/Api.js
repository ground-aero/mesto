//класс не связан с пользовательским интерфейсом, а полностью занят отправкой запросов на сервер и получением от них ответа.
export class Api {
    constructor(apiConfig) {
        this._apiConfig = apiConfig;
        // this._baseUrl = baseUrl;
        // this._headers = headers;
    }

    getAllInfo() {//метод ожидает массив промисов - Promise1, Promise2 ...
        return Promise.all([this.getUser(), this.getAllCards()])//вернет Promise
    }

    // - получить данные пользователя (GET)
    getUser() {
        return fetch(`${this._apiConfig.baseUrl}/users/me`, {
            method: 'GET',
            headers: this._apiConfig.headers
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();//Promise.resolve()
                } else {
                    return Promise.reject(`Ошибка ${res.status} ${res.statusText}`)
                }
            })
    }
    // - заменить данные пользователя (PATCH)
    // - заменить аватар (PATCH)

    getAllCards() {
        return fetch(`${this._apiConfig.baseUrl}/cards/`, {
            method: 'GET',
            headers: this._apiConfig.headers,
        }) //response - это ответ сервера
            .then((response) => {
                if (response.ok) {
                    return response.json(); //Promise.resolve()
                } else {
                    return Promise.reject(
                        `Ошибка ${response.status} ${response.statusText}`
                    );
                }
            });
    }

    addNewCard({ name, link }) {
        return fetch(`${this._apiConfig.baseUrl}/cards/`, {
            method: 'POST',
            headers: this._apiConfig.headers,
            body: JSON.stringify({ name, link }),
        }).then((response) => {
            if (response.ok) {
                return response.json(); //Promise.resolve()
            } else {
                return Promise.reject(
                    `Ошибка ${response.status} ${response.statusText}`
                );
            }
        });
    }

    deleteCard(id) {
        // console.log(`${this._apiConfig.baseUrl}/cards/${id}`)
        return fetch(`${this._apiConfig.baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this._apiConfig.headers
        }).then((response) => {
            if (response.ok) {
                return response.json(); //Promise.resolve()
            } else {
                return Promise.reject(`ошибка при удалении ${response.status} ${response.statusText}`)
            }
        })
    }

    // - “залайкать” карточку (PUT)
    likeCard(likes) {//нужно работать с id !!!!!!!!!!!!!!! По сути  тоже что и удаление !!! чуть иначе используется
        //1. метод ставить лайк
        //2. метод убирать лайк
        return fetch(`${this._apiConfig.baseUrl}/cards/${likes}`, {
            method: 'PUT',
            headers: this._apiConfig.headers,
            body: JSON.stringify({ likes }),
        }).then((response) => {
            if (response.ok) {
                return response.json(); //Promise.resolve()
            } else {
                return Promise.reject(
                    `Ошибка ${response.status} ${response.statusText}`
                );
            }
        });
    }
    // - удалить лайк карточки (DELETE)
    dislikeCard(id) {//нужно работать с id !!!!!!!!!!!!!!! По сути  тоже что и удаление !!! чуть иначе используется
        //1. метод ставить лайк
        //2. метод убирать лайк
        return fetch(`${this._apiConfig.baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this._apiConfig.headers
        }).then((response) => {
            if (response.ok) {
                return response.json(); //Promise.resolve()
            } else {
                return Promise.reject(
                    `Ошибка ${response.status} ${response.statusText}`
                );
            }
        });
    }
}