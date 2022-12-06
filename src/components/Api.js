//класс не связан с пользовательским интерфейсом, а полностью занят отправкой запросов на сервер и получением от них ответа.
export class Api {
    constructor(apiConfig) {
        this._apiConfig = apiConfig;
        // this._baseUrl = baseUrl;
        // this._headers = headers;
    }

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
    // - получить данные пользователя (GET)
    // - заменить данные пользователя (PATCH)
    // - заменить аватар (PATCH)
    // - “залайкать” карточку (PUT)
    likeCard({id}) {
        return fetch(`${this._apiConfig.baseUrl}/cards/`, {
            method: 'PUT',
            headers: this._apiConfig.headers,
            body: JSON.stringify({ id }),
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
}