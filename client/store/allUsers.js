import axios from 'axios'

//Action types
const GET_ALL_USERS = 'GET_ALL_USERS'
// const SET_USER = 'SET_USER'

//Action creator
const getAllUsers = allUsers => ({
  type: GET_ALL_USERS,
  allUsers
})

// const setUpdatedUser = user => ({ type: SET_USER, user })

//Thunk Creator
export const fetchUsers = () => {
  return async (dispatch) => {
    const res = await axios.get(`/auth/users`);
    const data = res.data;
    dispatch(getAllUsers(data))
  }
}

// export const editUser = (product) => {
//   return async (dispatch) => {
//     const res = await axios.put(`/api/products/${product.id}`, product);
//     const data = res.data;
//     dispatch(setUpdatedUser(data));
//     return data;
//   }
// }

//Initial State
const defaultAllUsers = []

//REDUCER
export default function (state = defaultAllUsers, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.allUsers

    // case SET_UPDATED_PRODUCT:
    //   const updateProductId = action.product.id;
    //   const productCopy = state.slice();
    //   const updatedProduct = productCopy.map(product => {
    //     if (product.id === updateProductId) {
    //       return action.product
    //     }
    //     return product
    //   })
    //   return updatedProduct;

    default:
      return state
  }
}
