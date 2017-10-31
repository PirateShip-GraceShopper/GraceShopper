import React from 'react';

const Review = props => {
    const review = props.newReview;
    return (
        <div>
            {review.content}
        </div>
    )
}

export default Review;