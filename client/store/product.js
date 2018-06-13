//Action types
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'

//Action creator
export const getSingleProduct = id => ({
    type: GET_SINGLE_PRODUCT,
    id
})

//Initial State
const defaultProduct = {}

//REDUCER
export default function (state = defaultProduct, action) {
    switch (action.type) {
        case GET_SINGLE_PRODUCT:
            return action.id
        default:
            return state
    }
}
