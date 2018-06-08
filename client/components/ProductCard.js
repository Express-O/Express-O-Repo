import React from 'react';
import { NavLink, Link } from 'react-router-dom'

const ProductCard = props => {
  const { product, removeProduct } = props

  return (
    <div>
      <NavLink
          to={`/products/${product.id}`}>
            <span>{product.title}</span>
      </NavLink>

      <p>{product.description}</p>
      <label>Quantity</label>
      <input type="number" min="1" max="5" name="rating" />  
      {/* value={} onChange={}  */}

      <label>Price</label>
      <p>{product.price}</p>
      <button type='button' onClick={() => removeProduct(product.id)}>Remove Item</button>
    </div>
  )
}

export default ProductCard
