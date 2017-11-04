import React from 'react';
import {Link} from 'react-router-dom';
import {Rate} from 'antd';

const Review = props => {
    const content = props.newReview.content;
    const rating = props.newReview.rating;

    return (
        <div className="review-container">
            <div>
            <Rate
                className="review-stars"
                value={rating}
                diabled={true}
            />
            </div>
            <div className="review-content">
                {content}
            </div>
        </div>
    )
}

export default Review;
