/**
 * Services for interacting with books api
 */
const API_URL = 'http://localhost:3333';

export function getBooks() {
  return fetch(`${API_URL}/books`)
  .then((res) => res.json());
}

export function getBookById(id) {
  return fetch(`${API_URL}/books/${id}`)
  .then((res) => res.json())
}

export function addBook(book) {
  return fetch(`${API_URL}/books`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(book)
  })
  .then((res) => res.json());
}

export function updateBook(book) {
  return fetch(`${API_URL}/books/${book.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(book)
  })
  .then((res) => res.json());
}

export function deleteBookById(id) {
  return fetch(`${API_URL}/books/${id}`, {
    method: 'DELETE',
  })
  .then((res) => res.json());
}
