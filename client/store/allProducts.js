import axios from 'axios'
import AllProducts from '../components';

//Action types
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'

//Action creator
const getAllProducts = allProducts => ({
    type: GET_ALL_PRODUCTS,
    allProducts
})

//Thunk Creator
export const fetchProducts = () => {
    return async (dispatch) => {
        const res = await axios.get(`/api/products`);
        const data = res.data;
        dispatch(getAllProducts(data))
    }
}

//Initial State
const defaultAllProducts = []

 //REDUCER
export default function (state = defaultAllProducts, action) {
 switch (action.type) {
   case GET_ALL_PRODUCTS:
     return action.allProducts
   default:
     return state
 }
}

