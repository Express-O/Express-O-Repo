import React from 'react';
import ProductForm from './ProductForm'
import AdminHome from './AdminHome'

const NewProduct = () => {
  return (
    <div>
      <AdminHome />
      <h1>New Product Form</h1>
      <ProductForm />
    </div>
  )
}

export default NewProduct
