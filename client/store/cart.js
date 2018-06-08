import axios from 'axios'

//Action types
const GET_CART = 'GET_CART'
const SET_CART = 'SET_CART'
// const SET_UPDATED_CART = 'SET_UPDATED_CART'


//Action creator
const getCart = cart => ({
  type: GET_CART,
  cart
})


const setCart = cart => ({
  type: SET_CART,
  cart
})


//Thunk Creator
export const fetchCart = () => {
  return async (dispatch) => {
    const res = await axios.get(`/api/cart`);
    const data = res.data;
    dispatch(getCart(data))
  }
}

export const addCart = (product) => {
  return async (dispatch) => {
    const res = await axios.put('/api/cart', product);
    const data = res.data;
    dispatch(setCart(data));
    return data;
  }
}


//Initial State
const defaultCart = []

//REDUCER
export default function (state = defaultCart, action) {
  switch (action.type) {

    case GET_CART:
      return action.cart

    case SET_CART:
      return action.cart

    default:
      return state
 }
}