import axios from 'axios'

//action types
const GET_ALL_ORDERS = 'GET_ALL_ORDERS'

//action creators
const getAllOrders = orders => ({ type: GET_ALL_ORDERS, orders })

//thunk creator

export const fetchOrders = () => {
  return async (dispatch) => {
    const { data } = await axios.get(`/auth/orders`)
    dispatch(getAllOrders(data))
  }
}

//initial state
const defaultAllOrders = []

//reducer
export default function (state = defaultAllOrders, action) {
  switch (action.type) {
    case GET_ALL_ORDERS:
      return action.orders
    default:
      return state
  }
}

