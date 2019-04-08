import request from 'superagent'

const rootUrl = '/api/v1/fruits'

export function getFruits () {
  return request.get(rootUrl)
    .then(res => res.body.fruits)
    .catch(logError)
}

export function addFruit (fruit) {
  return request.post(rootUrl)
    .send(fruit)
    .then(res => res.body.fruits)
    .catch(logError)
}

export function updateFruit (fruit) {
  return request.put(rootUrl)
    .send(fruit)
    .then(res => res.body.fruits)
    .catch(logError)
}

export function deleteFruit (id) {
  return request.delete(`${rootUrl}/${id}`)
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
