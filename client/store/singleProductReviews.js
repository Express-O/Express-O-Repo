//Action types
const GET_ALL_REVIEWS = 'GET_ALL_REVIEWS'
const ADD_REVIEW = 'ADD_REVIEW'

//Action creator
const getAllReviews = allReviews => ({
    type: GET_ALL_REVIEWS,
    allReviews
})

const addReview = review => ({
    type: ADD_REVIEW,
    review
})

//Thunk Creator
export const fetchAllReviews = (productId) => {
    return async (dispatch, getState, {axios}) => {
        const res = await axios.get(`/api/products/${productId}/reviews`);
        const data = res.data;
        dispatch(getAllReviews(data));
    }
}

export const postReview = (productId, userId, review) => {
    return async (dispatch, getState, {axios}) => {
      const res = await axios.post(`/api/products/${productId}/${userId}/review`, review);
      const data = res.data;
      dispatch(addReview(data));
      return data;
    }
}

//Initial State
const defaultAllReviews = [];

 //REDUCER
export default function (state = defaultAllReviews, action) {
 switch (action.type) {
    case GET_ALL_REVIEWS:
        return action.allReviews
    case ADD_REVIEW:
        return [...state, action.review]
    default:
        return state
 }
}
