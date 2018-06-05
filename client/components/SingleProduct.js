import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchSingleProduct } from '../store/index';

 class SingleProduct extends Component {
    componentDidMount() {
        this.props.fetchSingleProduct(this.props.selectedProduct)
    }

    render() {
        const { product, selectedProduct } = this.props;
        const selected = selectedProduct || {};
        const loading = <h1>Loading...</h1>
        const content = (
            <div>
                <h1>{product.title}</h1>
                <hr />
                <img src={product.photo} />
                <p>Details: {product.description}</p>
                <p>Price: ${product.price}</p>
                <button type="button">ADD TO CART</button>
            </div>
        )

        return (
            <div>
                {
                selected ? content : loading
                }
            </div>
        )
    }
}

const mapState = (state, ownProps) => {
    const productId = +ownProps.match.params.productId;
    return {
        product: state.product,
        selectedProduct: productId
    }
}

const mapDispatch = (dispatch) => {
    return {
        fetchSingleProduct: (productId) => dispatch(fetchSingleProduct(productId))
    }
}

export default withRouter(connect(mapState, mapDispatch)(SingleProduct))

