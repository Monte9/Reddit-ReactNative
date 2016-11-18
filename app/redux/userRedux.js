import { setToken, getToken, clearToken, tokenHasExpired } from '../api/Storage'

const types = {
  AUTHENTICATION_PENDING: 'AUTHENTICATION_PENDING',
  AUTHENTICATION_SUCCESS: 'AUTHENTICATION_SUCCESS',
  AUTHENTICATION_FAILURE: 'AUTHENTICATION_FAILURE'
}

const authenticationSuccess = (token) => {
  setToken(token)
  return {
    type: types.AUTHENTICATION_SUCCESS,
    token: token
  }
}

const startAuthentication = () => async (dispatch, getState) => {
  // Try and retrieve token from Storage
  const tokenExpired = await tokenHasExpired()
  const token = await getToken()
  if (tokenExpired) {
    clearToken()
  }
  return (token && !tokenExpired) ? (
    // succesfully retrieved it
    dispatch(authenticationSuccess(token))
  ) : dispatch({
    // failed to retrieve it
    type: types.AUTHENTICATION_PENDING
  })
}

const authenticationFailure = (error) => {
  return {
    type: types.AUTHENTICATION_FAILURE,
    error: error
  }
}

export const actionCreators = {
  authenticationSuccess,
  startAuthentication,
  authenticationFailure
}

const initialState = {
  isAuthenticating: false,
  token: null,
  error: null
}

export const reducer = (state = initialState, action) => {
  const {type, payload} = action

  switch(type) {
    case types.AUTHENTICATION_PENDING: {
      return {
        isAuthenticating: true,
        token: null,
        error: null
      }
    }
    case types.AUTHENTICATION_SUCCESS: {
      return {
        isAuthenticating: false,
        token: action.token,
        error: null
      }
    }
    case types.AUTHENTICATION_FAILURE: {
      return {
        isAuthenticating: false,
        token: null,
        error: action.error
      }
    }
    default: {
      return state
    }
  }
}
