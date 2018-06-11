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

const removedProduct = productId => ({
  type: REMOVED_PRODUCT,
  productId: productId
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
export const updateCart = (newCart) => {
  return async (dispatch) => {
    const res = await axios.put('/api/cart/newCart', newCart);
    console.log("THis is the data from thunk", res.data) // old data
    console.log("THis is the data from thunk", res) // old data
    const data = res.data;
    console.log('Cart Data from SERVER: ', data)
    dispatch(setUpdatedCart(data));
  }
}

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

export const emptyCart = () => {
  console.log('empty cart action triggered ===================')
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
    //todo: when payment info page is set up it needs to redirect to there here

  }
}
export const removeProduct = (productId) => {
  return async (dispatch) => {
    const res = await axios.delete(`/api/cart/${productId}`)
    dispatch(removedProduct(productId))
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

    case REMOVED_PRODUCT:
      const productId = action.productId
      const cartCopy = state.slice()
      const filtered = cartCopy.filter(product => productId !== product.id)
      return filtered

    case SET_EMPTY_CART:
      return action.cart

    case SET_UPDATED_CART:
       console.log('UPDATE!', action.updatedCart)
       return action.updatedCart

    default:
      return state
 }
}
