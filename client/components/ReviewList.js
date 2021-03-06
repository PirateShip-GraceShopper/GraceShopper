import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Review from './Review';

const ReviewList = ({ reviews }) => {
    return (
        <div>
            {console.log('reviews', reviews)}
            <h1>Reviews</h1>
            <ul>
                {reviews && reviews.map(review => {
                    return <Review newReview={review} key={review.id} />
                })}
            </ul>
        </div>
    )
}

const mapStateToProps = ({ reviews }) => ({ reviews })


export default connect(mapStateToProps)(ReviewList)

ReviewList.propTypes = {
    reviews: PropTypes.array
}
