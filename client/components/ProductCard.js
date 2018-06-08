import React from 'react';
import { NavLink, Link } from 'react-router-dom'
import Cart from './Cart'


const ProductCard = props => {
  const { product, removeProduct, handleChange } = props

  console.log('Product Card Props', props)

  return (
    <div>
      <NavLink
          to={`/products/${product.id}`}>
            <span>{product.title}</span>
      </NavLink>

      <p>{product.description}</p>
      <label>Quantity</label>
      <input type="number" defaultValue="1" min="1" max="5" name="quantity" onChange={props.handleChange} />  
      <button type='button'>Update</button>

      <label>Price</label>
      <p>{product.price}</p>
      <button type='button' onClick={() => removeProduct(product.id)}>Remove Item</button>
    </div>
  )
}

export default ProductCard
