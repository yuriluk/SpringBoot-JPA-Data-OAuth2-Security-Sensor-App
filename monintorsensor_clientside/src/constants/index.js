export const SENSOR_NAME_MIN_LENGTH = 2
export const SENSOR_NAME_MAX_LENGTH = 30
export const SENSOR_MODEL_MIN_LENGTH = 2
export const SENSOR_MODEL_MAX_LENGTH = 15
export const SENSOR_LOCATION_MAX_LENGTH = 40
export const SENSOR_DESCRIPTION_MAX_LENGTH = 200
export const SENSOR_RANGE_MIN = -5000
export const SENSOR_RANGE_MAX = 5000

export const NAME_MIN_LENGTH = 3
export const NAME_MAX_LENGTH = 30

export const EMAIL_MAX_LENGTH = 30
export const LOGIN_MAX_LENGTH = 20

export const PASSWORD_MIN_LENGTH = 6
export const PASSWORD_MAX_LENGTH = 20

export const BASE_URL = 'http://localhost:8080/'
export const ACCESS_TOKEN = 'accessToken'
export const TOKEN = 'token'
export const USER_ID = 'id'
export const LANGUAGE = 'language'
export const ROLE_ADMIN = 'Administrator'
export const ROLE_USER = 'Viewer'
export const SUCCESS = 'success'
export const ERROR = 'error'

export const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth2/redirect'

export const GITHUB_AUTH_URL = BASE_URL + 'oauth2/authorize/github?redirect_uri=' + OAUTH2_REDIRECT_URI
export const GOOGLE_AUTH_URL = BASE_URL + 'oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI
export const FACEBOOK_AUTH_URL = BASE_URL + 'oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI
