import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { fetchProducts } from '../store/index'


const productListStyles = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
}

const productCardStyles = {
  maxWidth: "30%",
  minWidth: "150px",
  flex: "1",
  margin: "5px",
}


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
         <h2 style={{marginBottom: "0.5em", marginTop: "0.5em"}}>Products</h2>

        <div style={productListStyles}>
          {
            arr.map(product => {
            return (
              <div key={product.id} style={productCardStyles} className="pt-card pt-elevation-1 pt-interactive">
                <img src ={product.photo} />
                <Link to={`/products/${product.id}`}>
                  <p>{product.title}</p>
                </Link>
                <p>{product.price}</p>
              </div>
            )})
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
