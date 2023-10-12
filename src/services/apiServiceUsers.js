const API_URL = 'https://jsonplaceholder.typicode.com/users'

async function sendRequest(url, options) {
  const response = await fetch(url, options)
  return await response.json()
}

function createRequestOptions(method, body) {
  return {
    method,
    body: JSON.stringify(body),
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
    }
  }
}

async function fetchUsers() {
  return await sendRequest(API_URL)
}

async function createUser(user) {
  const options = createRequestOptions('POST', user)
  return await sendRequest(API_URL, options)
}

async function updateUser(userId,user) {
  const options = createRequestOptions('PUT', user)
  return await sendRequest(`${API_URL}/${userId}`, options)
}

async function deleteUser(userId) {
  const options = createRequestOptions('DELETE')
  return await sendRequest(`${API_URL}/${userId}`, options)
}
export default {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser
}
