import axios from 'axios'

//Action types
const GET_CART = 'GET_CART'
const SET_CART = 'SET_CART'
const REMOVED_PRODUCT = 'REMOVED_PRODUCT'
const SET_EMPTY_CART = 'SET_EMPTY_CART'
const SET_UPDATED_CART = 'SET_UPDATED_CART'

//Action creator
const getCart = cart => ({
  type: GET_CART,
  cart
})

const setCart = cart => ({
  type: SET_CART,
  cart
})

const removedProduct = cart => ({
  type: REMOVED_PRODUCT,
  cart
})

const setEmptyCart = cart => ({
  type: SET_EMPTY_CART,
  cart
})

const setUpdatedCart = updatedCart => ({
  type: SET_UPDATED_CART,
  updatedCart
})

//Thunk Creator
export const updateCart = (product) => {
  return async (dispatch) => {
    const res = await axios.put('/api/cart', product);
    const data = res.data;
    dispatch(setUpdatedCart(data));
  }
}

export const fetchCart = () => {
  return async (dispatch) => {
    const res = await axios.get('/api/cart');
    const data = res.data;
    dispatch(getCart(data))
  }
}

export const emptyCart = () => {
  return async (dispatch) => {
    const res = await axios.delete('/api/cart')
    const data = res.data
    dispatch(setEmptyCart(data))
  }
}

export const submitOrder = (order) => {
  return async (dispatch) => {
    const res = await axios.post('/api/orders', order)
    const data = res.data
  }
}

export const removeProduct = (productId) => {
  return async (dispatch) => {
    const res = await axios.delete(`/api/cart/${productId}`)
    const data = res.data;
    dispatch(removedProduct(data))
  }
}

//Initial State
const defaultCart = {}

//REDUCER
export default function (state = defaultCart, action) {
  switch (action.type) {

    case GET_CART:
      return action.cart

    case SET_CART:
      return action.cart

    case REMOVED_PRODUCT:
      return action.cart

    case SET_EMPTY_CART:
      return action.cart

    case SET_UPDATED_CART:
       return action.updatedCart

    default:
      return state
 }
}
