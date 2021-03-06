import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const EDIT_USER = 'EDIT_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user })
const removeUser = () => ({ type: REMOVE_USER })
const editUser = user => ({ type: EDIT_USER, user })

/**
 * THUNK CREATORS
 */
export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res =>
        dispatch(getUser(res.data || defaultUser)))
      .catch(err => console.log(err))

export const auth = (userInfo) =>
  dispatch =>
    axios.post(`/auth/${userInfo.formName}`, userInfo)
      .then(res => {
        dispatch(getUser(res.data))
        res.data.isAdmin ? history.push('/admin/home') : history.push('/product/all')
      }, authError => { // rare example: a good use case for parallel (non-catch) error handler
        dispatch(getUser({ error: authError }))
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

export const editProfile = (userInfo) => {
  return async (dispatch) => {
    try {
      const updated = await axios.patch(`/auth/editProfile`, userInfo)
      dispatch(editUser(updated.config.data))
      history.push('/home')
      // (authError) => dispatch(getUser({ error: authError }))
    }
    catch (error) { console.log(error) }
  }
}

export const deleteAcct = (id) => {
  return async (dispatch) => {
    try {
      const deleted = await axios.delete(`/auth/${id}`)
      dispatch(removeUser())
      history.push('/product/all')
    }
    catch (error) { console.log(error) }
  }
}

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(_ => {
        dispatch(removeUser())
        history.push('/login')
      })
      .catch(err => console.log(err))


/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case EDIT_USER:
      return { ...state, user: action.user }
    default:
      return state
  }
}

