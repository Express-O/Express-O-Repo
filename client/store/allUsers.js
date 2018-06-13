import axios from 'axios'

//Action types
const GET_ALL_USERS = 'GET_ALL_USERS'

//Action creator
const getAllUsers = allUsers => ({
  type: GET_ALL_USERS,
  allUsers
})


//Thunk Creator
export const fetchUsers = () => {
  return async (dispatch) => {
    const res = await axios.get(`/auth/users`);
    const data = res.data;
    dispatch(getAllUsers(data))
  }
}


//Initial State
const defaultAllUsers = []

//REDUCER
export default function (state = defaultAllUsers, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.allUsers

    default:
      return state
  }
}
