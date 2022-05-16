class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers; 
  }

  _executeGetRequest(path) {
    return fetch(this.baseUrl + path, {
      headers: this.headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getUserInfo() {
    return this._executeGetRequest('/users/me');
  }

  getInitialCards() {
    return this._executeGetRequest('/cards');
  }

  _executePatchRequest(path, data) {
    return fetch(this.baseUrl + path, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(data)
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  patchUserInfo(data) {
    return this._executePatchRequest('/users/me', data);
  }

  patchUserAvatar(data) {
    return this._executePatchRequest('/users/me/avatar', data);
  }

  postCard({name, link}) {
    return fetch(this.baseUrl + '/cards', {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  _executeDeleteRequest(path) {
    return fetch(this.baseUrl + path, {
      method: 'DELETE',
      headers: this.headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  deleteCard(cardId) {
    return this._executeDeleteRequest('/cards/' + cardId);
  }

  deleteLikes(cardId) {
    return this._executeDeleteRequest('/cards/' + cardId + '/likes');
  }

  putLikes(cardId) {
    return fetch(this.baseUrl + '/cards/' + cardId + '/likes', {
      method: 'PUT',
      headers: this.headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-41',
  headers: {
    authorization: '2e7341e4-43c9-49f8-bd0b-0cf4b57667fa',
    'Content-Type': 'application/json'
  }
});