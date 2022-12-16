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
            .then(res => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status} ${res.statusText}`))
            // .then((res) => {
            //     if (res.ok) {
            //         return res.json();//Promise.resolve()
            //     } else {
            //         return Promise.reject(`Ошибка ${res.status} ${res.statusText}`)
            //     }
            // })
                .catch(console.log)
    }
    // изменить данные пользователя (PATCH)
    patchUser(formValue) {
        // console.log(formValue)
        return fetch(`${this._apiConfig.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._apiConfig.headers,
            body: JSON.stringify({
                name: formValue.name,
                about: formValue.about,
            })
        })
            .then(res => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status} ${res.statusText}`))
            // .then((res) => {
            //     if (res.ok) {
            //         return res.json();//Promise.resolve()
            //     } else {
            //         return Promise.reject(`Ошибка ${res.status} ${res.statusText}`)
            //     }
            // })
            .catch(console.log)
    }

    // - заменить аватар (PATCH)
    patchAvatar(formDataObject) {
        console.log(formDataObject)
        return fetch(`${this._apiConfig.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._apiConfig.headers,
            body: JSON.stringify(formDataObject)// avatar: formValue.avatar,
        })
            .then(res => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status} ${res.statusText}`))
            .catch(console.log)
    }

    getAllCards() {
        return fetch(`${this._apiConfig.baseUrl}/cards/`, {
            method: 'GET',
            headers: this._apiConfig.headers,
        }) //response - это ответ сервера
            .then(res => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status} ${res.statusText}`))
            .catch(console.log)
    }

    addNewCard({ name, link }) {
        return fetch(`${this._apiConfig.baseUrl}/cards/`, {
            method: 'POST',
            headers: this._apiConfig.headers,
            body: JSON.stringify({ name, link }),
        })
            .then(res => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status} ${res.statusText}`))
            .catch(console.log)
    }

    deleteCard(id) {
        // console.log(`${this._apiConfig.baseUrl}/cards/${id}`)
        return fetch(`${this._apiConfig.baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this._apiConfig.headers
        })
            .then(res => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status} ${res.statusText}`))
            .catch(console.log)
    }

    // - “залайкать” карточку (PUT)
    putLike(id) {//нужно работать с id !!!!!!!!!!!!!!! По сути  тоже что и удаление !!! чуть иначе используется
        return fetch(`${this._apiConfig.baseUrl}/cards/likes/${id}`, {
            method: 'PUT',
            headers: this._apiConfig.headers,
            body: JSON.stringify({ id }),
        })
            .then(res => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status} ${res.statusText}`))
            // .then((res) => {
            //     if (res.ok) {
            //         return res.json();//Promise.resolve()
            //     } else {
            //         return Promise.reject(`Ошибка ${res.status} ${res.statusText}`)
            //     }
            // })
            .catch(console.log)
    }

    // - удалить лайк карточки (DELETE)
    deleteLike(id) {//нужно работать с id !!!!!!!!!!!!!!! По сути  тоже что и удаление !!! чуть иначе используется
        return fetch(`${this._apiConfig.baseUrl}/cards/likes/${id}`, {
            method: 'DELETE',
            headers: this._apiConfig.headers
        })
            .then(res => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status} ${res.statusText}`))
            // .then((res) => {
            //     if (res.ok) {
            //         return res.json();//Promise.resolve()
            //     } else {
            //         return Promise.reject(`Ошибка ${res.status} ${res.statusText}`)
            //     }
            // })
            .catch(console.log)
    }

}

export const apiConfig = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-51',
    headers: {
        "content-type": "application/json",
        "Authorization": "428b584a-5472-4fac-aca2-5c3d80bec64e"
    }
}