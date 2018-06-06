import axios from 'axios'
import AllProducts from '../components';

//Action types
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'


//Action creator
const getAllProducts = allProducts => ({
    type: GET_ALL_PRODUCTS,
    allProducts
})

const addProduct = product => ({
    type: ADD_PRODUCT,
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
    console.log('post product action triggered========')
    return async (dispatch) => {
        const res = await axios.post('/api/products', product);
        const data = res.data;
        dispatch(addProduct(data));
        return data
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

        default:
            return state
 }
}

