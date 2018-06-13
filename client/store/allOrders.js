import axios from 'axios'

//action types
const GET_ALL_ORDERS = 'GET_ALL_ORDERS'
const SET_UPDATED_ORDER = 'SET_UPDATED_ORDER'

//action creators
const getAllOrders = orders => ({ type: GET_ALL_ORDERS, orders })
const setUpdatedOrder = order => ({ type: SET_UPDATED_ORDER, order })

//thunk creator

export const fetchOrders = () => {
  return async (dispatch) => {
    const { data } = await axios.get(`/auth/orders`)
    dispatch(getAllOrders(data))
  }
}

export const editOrder = (order) => {
  return async (dispatch) => {
    const res = await axios.put(`/auth/orders`, order)
    const data = res.data
    dispatch(setUpdatedOrder(data))
  }
}

//initial state
const defaultAllOrders = []

//reducer
export default function (state = defaultAllOrders, action) {
  switch (action.type) {
    case GET_ALL_ORDERS:
      return action.orders
    case SET_UPDATED_ORDER:
      const updatedOrderId = action.order.id
      const orderCopy = state.slice()
      const updateOrder = orderCopy.map(order => {
        if (order.id === updatedOrderId) {
          return action.order
        }
        return order
      })
      return updateOrder
    default:
      return state
  }
}

