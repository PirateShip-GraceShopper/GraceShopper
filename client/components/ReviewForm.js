import React, {Component} from 'react';
import {connect} from 'react-redux';
import {postReviewThunk, putReviewThunk, fetchReviewsThunk} from '../store';
import ReviewStars from './ReviewStars';
import Review from './Review';
import ReviewEditButton from './ReviewEditButton';
import {Button, Rate, Carousel} from 'antd';

class ReviewForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: '',
            rating: null,
            productId: props.productId,
            userId: 0
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleStarChange = this.handleStarChange.bind(this)
        this.filterReviews = this.filterReviews.bind(this)
        this.handleEditClick = this.handleEditClick.bind(this)
    }

    handleChange(event) {
       const input = event.target.value
       this.setState({ content: input })
    }

    handleStarChange(rating) {
        this.setState({
            rating,
            userId: this.props.userId
        })
    }

    //This method checks to see if the current user has any reviews for the specific product passed into to ReviewForm as props
    filterReviews() {
       return this.props.review.filter(review => {
            return review.productId === parseInt(this.props.productId, 10) && review.userId === this.props.userId
        })
    }

    handleEditButtonClick() {
        
    }

    render() {
        return (
            <div>
                {(this.props.review && !this.filterReviews().length) ?
                    <form onSubmit={(evt) => {
                        evt.preventDefault()
                        this.setState({ content: '' })
                        this.props.handleSubmit(this.state)
                        }}>
                        <label>
                            Rate This Product!
                        </label>
                        <ReviewStars handleStarChange={this.handleStarChange} />
                        <textarea
                            onChange={this.handleChange}
                            name="content"
                            value={this.state.content}
                        />
                        <input type="submit" value="Submit" />
                    </form>
                    :
                    <div>
                        <h1>Your Review</h1>
                        <Review newReview={this.filterReviews()[0]} />
                        <ReviewEditButton
                            handleClick={this.handleEditClick}
                            review={this.filterReviews()[0]}
                        />
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = ({ review }) => ({ review })
const mapDispatchToProps = (dispatch) => {
    return {
        handleSubmit(review) {
            dispatch(postReviewThunk(review))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm)
