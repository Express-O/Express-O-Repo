import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { fetchProducts } from '../store/index'
import AdminHome from './AdminHome'

class Inventory extends Component {
  componentDidMount() {
    this.props.fetchProducts()
  }
  render() {
    const { inventory } = this.props
    return (
      <div>
        <hr />
        <AdminHome />
        <table>
          <tbody>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Category</th>
              <th>In-Depth</th>
            </tr>
          </tbody>
          {
            inventory.map(item => {
              return (
                <tbody key={item.id}>
                  <tr>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.inventory}</td>
                    <td>{item.price}</td>
                    <td>{item.category}</td>
                    <td><Link to={`/admin/editproduct/${item.id}`}>Edit/Details</Link></td>
                  </tr>
                </tbody>
              )
            })
          }
        </table>
        <div className="userhomepageimg">
          <img src="https://www.healthline.com/hlcmsresource/images/AN_images/espresso-ground-coffee-beans-1296x728.jpg" />
        </div>
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
