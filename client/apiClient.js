import request from 'superagent'

const rootUrl = '/api/v1/fruits'

export function getFruits (url = rootUrl) {
  return request.get(url)
    .set({ 'Accept': 'application/json' })
    .then(res => {
      return res.body.fruits
    })
    .catch(logError)
}

export function addFruit (fruit, url = rootUrl) {
  return request.post(url)
    .send(fruit)
    .then(res => res.body.fruits)
    .catch(logError)
}

export function updateFruit (fruit, url = rootUrl) {
  return request.put(url)
    .send(fruit)
    .then(res => res.body.fruits)
    .catch(logError)
}

export function deleteFruit (id, url = rootUrl) {
  return request.delete(`${url}/${id}`)
    .then(res => res.body.fruits)
    .catch(logError)
}

function logError (err) {
  // eslint-disable-next-line no-console
  console.error(
    'Error consuming the API (in client/apiClient.js):',
    err.message
  )
}
