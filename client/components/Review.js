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
                value={rating}
                diabled={true}
            />
            </div>
            <div>
                {content}
            </div>
        </div>
    )
}

export default Review;
