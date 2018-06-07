import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { fetchSingleProduct, fetchAllReviews, postCartProduct } from '../store/index';



 class SingleProduct extends Component {
    componentDidMount() {
        const { selectedProduct } = this.props;
        this.props.fetchSingleProduct(selectedProduct);
        this.props.fetchAllReviews(selectedProduct);
    }

    render() {
        const { product, selectedProduct, singleProductReviews } = this.props;
        const selected = selectedProduct || {};
        const loading = <h1>Loading...</h1>
        const content = (
            <div>
                <h1>{product.title}</h1>
                <hr />
                <img src={product.photo} />
                <p>Details: {product.description}</p>
                <p>Price: ${product.price}</p>
                <button type="button" onClick={() => postCartProduct(product)}>ADD TO CART</button>

                <Link to={`/products/edit/${product.id}`}>
                   <button type="button">EDIT PRODUCT</button>
                </Link>

                <Link to={`/products/edit/${product.id}`}>
                   <button type="button">DELETE PRODUCT</button>
                </Link>
                <hr />
                <h2>Customer Reviews</h2>
                <div>
                    <ul>
                    {
                        singleProductReviews.map(review => {
                            return (
                                <div key={review.id} >
                                        <h2>{review.title}</h2>
                                        <p>By {review.user.firstName} on {review.date.slice(0, 10)}</p>
                                        <p>Rating: {review.rating}</p>
                                        <p>{review.body}</p>
                                        <hr />
                                    {/* <button className='remove' onClick={() => {deletingCountry(country.id)}}>Remove</button> */}
                                </div>
                            )
                        })
                    }
                    </ul>
                </div>
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
        selectedProduct: productId,
        singleProductReviews: state.singleProductReviews
    }
}

const mapDispatch = (dispatch) => {
    return {
        fetchSingleProduct: (productId) => dispatch(fetchSingleProduct(productId)),
        fetchAllReviews: (productId) => dispatch(fetchAllReviews(productId))
    }
}

export default withRouter(connect(mapState, mapDispatch)(SingleProduct))

