import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { fetchProducts } from '../store/index'

//need to add a ternary in return for if it is admin show add button
class AllProducts extends Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    const { allProducts, allDrinks, allSwag, location } = this.props;
    let arr;
    if (location.pathname === '/product/coffee'){
      arr = allDrinks;
    } else if (location.pathname === '/product/swag'){
      arr = allSwag;
    } else {
      arr = allProducts;
    }
    return (
      <div>
        <ul>
          {
            arr.map(product => {
            return (
              <div key={product.id}>
                <img src ={product.photo} />
                <Link to={`/products/${product.id}`}>
                  <p>{product.title}</p>
                </Link>
                <p>{product.price}</p>
              </div>
            )})
          }
        </ul>
      </div>
    )
  }
}
const mapStateToProps = state => {
  const allProducts = state.allProducts
  return (
    {
      allProducts: allProducts,
      allDrinks: allProducts.filter(drink => drink.category === 'drink'),
      allSwag: allProducts.filter(swag => swag.category === 'swag')
    }
  )
}
const mapDispatchToProps = dispatch => {
  return ({
    fetchProducts: () => dispatch(fetchProducts())
  })
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllProducts));
