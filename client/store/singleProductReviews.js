//Action types
const GET_ALL_REVIEWS = 'GET_ALL_REVIEWS'

//Action creator
const getAllReviews = allReviews => ({
    type: GET_ALL_REVIEWS,
    allReviews
})

//Thunk Creator
export const fetchAllReviews = (productId) => {
    return async (dispatch, getState, {axios}) => {
        const res = await axios.get(`/api/products/${productId}/reviews`);
        const data = res.data;
        dispatch(getAllReviews(data));
    }
}

//Initial State
const defaultAllReviews = [];

 //REDUCER
export default function (state = defaultAllReviews, action) {
 switch (action.type) {
    case GET_ALL_REVIEWS:
        return action.allReviews
    default:
        return state
 }
}
