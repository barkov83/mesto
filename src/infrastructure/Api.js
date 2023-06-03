export class Api {
  constructor(baseUrl, headers) {
    this._baseUrl = baseUrl;
    this._headers = { ...headers };
  }

  _checkResponse(response) {
    // проверяется только успешный ответ. ошибки всплывают в клиентский код
    // и должны быть обработаны там
    return response.ok ? response.json() : Promise.reject(new Error(`${response.status} ${response.statusText}`));
  }

  _request(slug, options = {}) {
    const url = `${this._baseUrl}${slug}`;
    const fetchOptions = {
      headers: { ...this._headers },
      ...options,
    }

    return fetch(url, fetchOptions).then(this._checkResponse);
  }

  getUserData() {
    const slug = `/users/me`;

    return this._request(slug);
  }

  updateAvatar(avatar) {
    const slug = `/users/me/avatar`;
    const options = {
      method: 'PATCH',
      body: JSON.stringify({ avatar }),
    };

    return this._request(slug, options);
  }

  getCardData() {
    const slug = `/cards`;

    return this._request(slug);
  }

  updateUserData({ name, about }) {
    const slug = `/users/me`;
    const options = {
      method: 'PATCH',
      body: JSON.stringify({ name, about }),
    };

    return this._request(slug, options);
  }

  addCard(payload) {
    const slug = `/cards`;
    const options = {
      method: 'POST',
      body: JSON.stringify(payload),
    };

    return this._request(slug, options);
  }
  
  deleteCard(cardId) {
    const slug = `/cards/${cardId}`;
    const options = {
      method: 'DELETE',
    };

    return this._request(slug, options);
  }

  addLike(cardId) {
    const slug = `/cards/${cardId}/likes`;
    const options = {
      method: 'PUT',
    };

    return this._request(slug, options);
  }

  deleteLike(cardId) {
    const slug = `/cards/${cardId}/likes`;
    const options = {
      method: 'DELETE',
    };

    return this._request(slug, options);
  }
}