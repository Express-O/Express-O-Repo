import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import axios from 'axios'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import product from './product'
import allProducts from './allProducts'
import singleProductReviews from './singleProductReviews'

const reducer = combineReducers({user, product, allProducts, singleProductReviews})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware.withExtraArgument({axios}),
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './product'
export * from './allProducts'
export * from './singleProductReviews'

