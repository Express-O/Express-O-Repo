import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { postReview } from '../store';

class ReviewForm extends Component {
    constructor() {
        super()
        this.state = {
          title: '',
          body: '',
          rating: ''
      }
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)    
    }

    handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value
        })
    }

    async handleSubmit(event) {
        event.preventDefault();

        let newReview = {
          title: this.state.title,
          body: this.state.body,
          rating: this.state.rating,
          date: new Date()
        }
        const { selectedProductId, userIdNum } = this.props;
        let posted = await this.props.postReview(selectedProductId, userIdNum, newReview)
        this.props.history.push(`/products/${posted.productId}/${posted.userId}/review`)

        this.setState({
          title: '',
          body: '',
          rating: ''
      })
    }

    render() {       
        return (
            <div>
            <form onSubmit={this.handleSubmit}>
              <label>
                Title:
              </label>
              <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
    
              <label>
                Rating:
              </label>
              <input type="number" min="1" max="5" name="rating" value={this.state.rating} onChange={this.handleChange} />

              <label>
                Write your review here:
              </label>
              <input type="text" name="body" value={this.state.body} onChange={this.handleChange} />

              <button type="submit">Add Review</button>
            </form>
            </div>
        )
    }
}

const authDummyUser =
{
    id: 1,
    firstName: 'Jenny',
    email: 'jenny@email.com'
};

const mapDispatch = (dispatch, ownProps) => {
    const productId = +ownProps.match.params.productId;
    const userId = authDummyUser.id
    return {
        postReview: (productId, userId, review) => dispatch(postReview(productId, userId, review)),
        selectedProductId: productId,
        userIdNum: userId
    }
}

export default withRouter(connect(null, mapDispatch)(ReviewForm))
