import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { fetchProducts } from '../store/index'

class AllProducts extends Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    const { allProducts, allDrinks, allSwag, location } = this.props;
    let arr;
    if (location.pathname === '/product/coffee') {
      arr = allDrinks;
    } else if (location.pathname === '/product/swag') {
      arr = allSwag;
    } else {
      arr = allProducts;
    }
    return (
      <div>
        <div className="allproducts">
          {
            arr.map(product => {
              return (
                <Link to={`/products/${product.id}`} key={product.id} className="singleproduct">
                  <div className="singleproductimg">
                    <img src={product.photo} />
                  </div>
                  <div className="singleproductinfo">
                    <p className="singleproducttitle">{product.title}  ${product.price}</p>
                  </div>
                </Link>
              )
            })
          }
        </div>
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
