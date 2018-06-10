import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Login, Signup, UserHome, SingleProduct, AllProducts, HomePage, NewProduct, EditProduct, ReviewForm, Cart, EditProfile, Inventory, AdminHome, SingleInventory } from './components'
import { me } from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const { isLoggedIn } = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/cart" component={Cart} />
        <Route path="/products/add" component={NewProduct} />
        <Route path="/products/:productId/:userId/review" component={ReviewForm} />
        <Route exact path="/products/edit/:productId" component={EditProduct} />
        <Route path="/products/:productId" component={SingleProduct} />
        <Route exact path="/product" component={AllProducts} />
        <Route exact path="/product/coffee" component={AllProducts} />
        <Route exact path="/product/swag" component={AllProducts} />
        <Route exact path="/product/all" component={AllProducts} />
        <Route path="/aboutUs" component={HomePage} />
        {
          isLoggedIn &&
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
            <Route path="/editprofile" component={EditProfile} />
            <Route path="/admin/home" component={AdminHome} />
            <Route path="/admin/inventory" component={Inventory} />
            <Route path="admin/inventory/:inventoryid" component={SingleInventory} />
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
    isLoggedIn: !!state.user.id
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
  isLoggedIn: PropTypes.bool.isRequired
}
