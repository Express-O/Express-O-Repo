import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { fetchInventory } from '../store/index'


const Inventory = (props) => {
  const { inventory } = props
  return (
    <table>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Category</th>
      </tr>
      {
        inventory.map(item => {
          return (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.inventory}</td>
              <td>{item.category}</td>
            </tr>
          )
        })
      }
    </table>
  )
}
const mapStateToProps = state => ({ inventory: state.inventory })
const mapDispatchToProps = dispatch => {
  return ({
    fetchInventory: () => dispatch(fetchInventory())
  })
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Inventory))
