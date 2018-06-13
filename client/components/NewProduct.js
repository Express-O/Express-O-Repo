import React from 'react';
import ProductForm from './ProductForm'
import AdminHome from './AdminHome'

const NewProduct = () => {
  return (
    <div>
      <AdminHome />
      <h1>New Product Form</h1>
      <ProductForm />
      <div className="userhomepageimg">
          <img src="https://www.healthline.com/hlcmsresource/images/AN_images/espresso-ground-coffee-beans-1296x728.jpg" />
        </div>
    </div>
  )
}

export default NewProduct
