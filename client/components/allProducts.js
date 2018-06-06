import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchProducts} from '../store'

//need to add a ternary in return for if it is admin show add button
class AllProducts extends Component {
  constructor(){
    super()
    this.state = {
      category: []
    }
  }

  componentDidMount(){
    this.props.fetchProducts();
  }

  render() {
    console.log('LOCAL STATE', this.state)
    // console.log('ALL PRODUCTS', this.props.allProducts)
    let arr;

    if (this.props.location === "/product/coffee"){
      arr = this.props.allDrinks
    } else if (this.props.location === "/product/swag"){
      arr = this.props.allSwag
    } else {
      arr = this.props.allProducts
    }

    console.log('ARRAY', arr)
    return (
      <div>
        <ul>
          {
            arr.map(product => {
            return (
              <li key={product.id}>
                <img src ={product.photo} />
                <Link to={`/products/${product.id}`}><p>{product.title}</p></Link>
                <p>{product.price}</p>
              </li>
            )})
          }
        </ul>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return (
    {
      allProducts: state.allProducts,
      allDrinks: state.allProducts.filter(drink=>drink.category === 'drink'),
      allSwag: state.allProducts.filter(swag=>swag.category === 'swag')
    }
  )
}
const mapDispatchToProps = dispatch => {
  return ({
    fetchProducts: () => dispatch(fetchProducts())
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
