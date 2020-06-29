import { ACCESS_TOKEN, BASE_URL } from '../../constants'

const request = (options) => {
  const headers = new Headers({
    'Content-Type': 'application/json'
  })

  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
  }

  const defaults = { headers: headers }
  options = Object.assign({}, defaults, options)

  return fetch(options.url, options)
    .then(response => {
      if (!response.ok) {
        throw response
      }
      if (response.status !== 204) {
        return response.json()
      }
    }).then(json => {
      return json
    })
}

export function getAllSensors (searchCriteria) {

  const page = 'page=' + Number(searchCriteria.page === 0 ? searchCriteria.page : searchCriteria.page - 1)
  const size = '&size=' + Number(searchCriteria.size)
  const searchString = searchCriteria.searchString === undefined ? '' : '&searchString=' + searchCriteria.searchString

  const url = BASE_URL + 'sensors?' + page + size + searchString

  return request({
    url: url,
    method: 'GET'
  })
}

export function createSensor (sensor) {
  return request({
    url: BASE_URL + 'sensors',
    method: 'POST',
    body: JSON.stringify(sensor)
  })
}

export function editSensor (sensor) {
  return request({
    url: BASE_URL + 'sensors/' + Number(sensor.id),
    method: 'PUT',
    body: JSON.stringify(sensor)
  })
}

export function deleteSensor (sensorId) {
  console.log(sensorId)
  const uri = BASE_URL + 'sensors/' + Number(sensorId)
  return request({
    url: uri,
    method: 'DELETE'
  })
}

export function getAllTypes () {
  const url = BASE_URL + 'types'

  return request({
    url: url,
    method: 'GET'
  })
}

export function getAllUnits () {
  const url = BASE_URL + 'units'

  return request({
    url: url,
    method: 'GET'
  })
}

export function login (loginRequest) {
  return request({
    url: BASE_URL + 'auth/login',
    method: 'POST',
    body: JSON.stringify(loginRequest)
  })
}

export function signUp (signupRequest) {
  return request({
    url: BASE_URL + 'auth/sign-up',
    method: 'POST',
    body: JSON.stringify(signupRequest)
  })
}

export function getCurrentUser () {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject('No access token set.')
  }

  return request({
    url: BASE_URL + 'users/me',
    method: 'GET'
  })
}

export function checkLoginAvailability (login) {
  return request({
    url: BASE_URL + 'auth/checkLoginAvailability?login=' + login,
    method: 'GET'
  })
}
