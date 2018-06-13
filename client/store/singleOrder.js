//action type
const GET_SINGLE_ORDER = 'GET_SINGLE_ORDER'


//action creator
export const getSingleOrder = orderid => ({ type: GET_SINGLE_ORDER, orderid })

//thunk


//intitial state

const defaultOrder = {}

//reducer
export default function (state = defaultOrder, action) {
  switch (action.type) {
    case GET_SINGLE_ORDER:
      return action.orderid
    default:
      return state
  }
}
