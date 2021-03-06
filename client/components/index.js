/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export { default as Navbar } from './navbar'
export { UserProfile, UserDetail } from './user-home'
export { Login, Signup, EditProfile } from './auth-form'
export { default as SingleProduct } from './SingleProduct'
export { default as AllProducts } from './AllProducts'
export { default as NewProduct } from './NewProduct'
export { default as ProductForm } from './ProductForm'
export { default as HomePage } from './HomePage'
export { default as Footer } from './Footer'
export { default as EditProduct } from './EditProduct'
export { default as Cart } from './Cart'
export { default as ReviewForm } from './ReviewForm'
export { default as ProductCard } from './ProductCard'
export { default as AdminHome } from './AdminHome'
export { default as Inventory } from './Inventory'
export { default as AllUsers } from './AllUsers'
export { default as AllOrders } from './AllOrders'
export { default as EditOrder } from './EditOrder'
export { default as AddAdmin } from './AddAdmin'
