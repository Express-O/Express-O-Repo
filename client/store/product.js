import axios from 'axios'
import history from '../history'

//Action types
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'

//Action creator
const getSingleProduct = product => ({
    type: GET_SINGLE_PRODUCT,
    product
})


//Thunk Creator
export const fetchSingleProduct = (productId) => {
    return async (dispatch, getState, { axios }) => {
        const res = await axios.get(`/api/products/${productId}`);
        const data = res.data;
        dispatch(getSingleProduct(data));
    }
}


//Initial State
const defaultProduct = {}

//REDUCER
export default function (state = defaultProduct, action) {
    switch (action.type) {
        case GET_SINGLE_PRODUCT:
            return action.product
        default:
            return state
    }
}
