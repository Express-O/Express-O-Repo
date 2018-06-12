import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { fetchProducts } from '../store/index'


class Inventory extends Component {
  componentDidMount() {
    this.props.fetchProducts()
  }
  render() {
    const { inventory } = this.props
    return (
      <div>
        <hr />
        <Link to="/admin/home">
          <button type="button">DASHBOARD</button>
        </Link>
        <Link to="/admin/useraccounts">
          <button type="button">USER ACCOUNTS</button>
        </Link>
        <Link to="/admin/addproduct">
          <button type="button">ADD NEW PRODUCT</button>
        </Link>
        <table>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Category</th>
            <th>In-Depth</th>
          </tr>
          {
            inventory.map(item => {
              return (
                <tbody key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.inventory}</td>
                  <td>{item.price}</td>
                  <td>{item.category}</td>
                  <td><Link to={`/admin/editproduct/${item.id}`}>Edit/Details</Link></td>
                </tbody>
              )
            })
          }
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => ({ inventory: state.allProducts })
const mapDispatchToProps = dispatch => {
  return ({
    fetchProducts: () => dispatch(fetchProducts())
  })
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Inventory))
