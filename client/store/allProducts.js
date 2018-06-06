import axios from 'axios'
import AllProducts from '../components';

//Action types
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'
const SET_UPDATED_PRODUCT = 'SET_UPDATED_PRODUCT'


//Action creator
const getAllProducts = allProducts => ({
  type: GET_ALL_PRODUCTS,
  allProducts
})

const addProduct = product => ({
  type: ADD_PRODUCT,
  product
})

const setUpdatedProduct = product => ({
  type: SET_UPDATED_PRODUCT,
  product
})

//Thunk Creator
export const fetchProducts = () => {
  return async (dispatch) => {
    const res = await axios.get(`/api/products`);
    const data = res.data;
    dispatch(getAllProducts(data))
  }
}

export const postProduct = (product) => {
  return async (dispatch) => {
    const res = await axios.post('/api/products', product);
    const data = res.data;
    dispatch(addProduct(data));
    return data;
  }
}

export const editProduct = (product) => {
  console.log('Edit Product action triggered ================')
  console.log('product to update with', product)
  return async (dispatch) => {
    const res = await axios.put(`/api/products/${product.id}`, product);
    const data = res.data;
    dispatch(setUpdatedProduct(data));
    return data;
  }
}

//Initial State
const defaultAllProducts = []

//REDUCER
export default function (state = defaultAllProducts, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.allProducts

    case ADD_PRODUCT:
      return [...state, action.product]

    case SET_UPDATED_PRODUCT:
      console.log('update product action triggered ==========')
      const updateProductId = action.product.id;
      const productCopy = state.slice();
      const updatedProduct = productCopy.map(product => {
        if (product.id === updateProductId) {
          return action.product
        }
        return product
      })
      return updateProduct;

    default:
      return state
 }
}

