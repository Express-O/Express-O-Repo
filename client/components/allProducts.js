import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchProducts} from '../store'

class AllProducts extends React.Component {
  constructor(){
    super()
    this.state = {

    }
  }

  componentDidMount(){
    this.props.fetchProducts();
  }

  render() {
    const drinks = this.props.allProducts.filter(drink => {
      return drink.category === 'drink'
    })
    const swag = this.props.allProducts.filter(mugs => {
      return mugs.category === 'swag'
    })

    const all = this.props.allProducts

    let arr = all

    if (this.props.location === "/products/coffee"){
      arr = drinks
    } else if (this.props.location === "/products/swag"){
      arr = swag
    }

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
      allProducts: state.allProducts
    }
  )
}
const mapDispatchToProps = dispatch => {
  return ({
    fetchProducts: () => dispatch(fetchProducts)
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
