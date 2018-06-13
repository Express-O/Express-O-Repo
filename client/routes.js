import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Login, Signup, UserHome, SingleProduct, AllProducts, HomePage, NewProduct, EditProduct, ReviewForm, Cart, EditProfile, Inventory, AdminHome, AllUsers, AllOrders, EditOrder } from './components'
import { me } from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const { isLoggedInUser, isLoggedInAdmin } = this.props

    return (
      <Switch>
        <Route exact path="/" component={AllProducts} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/cart" component={Cart} />
        <Route path="/products/:productId/:userId/review" component={ReviewForm} />
        <Route path="/products/:productId" component={SingleProduct} />
        <Route exact path="/product" component={AllProducts} />
        <Route exact path="/product/coffee" component={AllProducts} />
        <Route exact path="/product/swag" component={AllProducts} />
        <Route exact path="/product/all" component={AllProducts} />
        <Route path="/aboutUs" component={HomePage} />
        {
          isLoggedInUser &&
          <Switch>
            <Route path="/home" component={UserHome} />
            <Route path="/editprofile" component={EditProfile} />
            <Route path="/cart" component={Cart} />
          </Switch>
        }
        {
          isLoggedInAdmin &&
          <Switch>
            <Route path="/admin/home" component={AdminHome} />
            <Route exact path="/admin/editproduct/:productId" component={EditProduct} />
            <Route exact path="/admin/inventory" component={Inventory} />
            <Route path="/admin/addproduct" component={NewProduct} />
            <Route exact path="/admin/useraccounts" component={AllUsers} />
            <Route path="/admin/editprofile" component={EditProfile} />
            <Route exact path="/admin/allorders" component={AllOrders} />
            <Route exact path="/admin/completedorders" component={AllOrders} />
            <Route exact path="/admin/cartorders" component={AllOrders} />
            <Route exact path="/admin/processingorders" component={AllOrders} />
            <Route exact path="/admin/cancelledorders" component={AllOrders} />
            <Route exact path="/admin/editorder/:orderId" component={EditOrder} />
          </Switch>
        }
        {/* Displays our Login component as a fallback if the route does not match any of the aboves*/}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedInUser: !!state.user.id && !state.user.isAdmin,
    isLoggedInAdmin: !!state.user.isAdmin
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedInUser: PropTypes.bool.isRequired,
  isLoggedInAdmin: PropTypes.bool.isRequired
}
