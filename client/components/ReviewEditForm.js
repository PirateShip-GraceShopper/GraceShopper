import React from 'react';
import ReviewStars from './ReviewStars';

const ReviewEditForm = props => {
    return (
        <div>
            {props && console.log('PROPS', props)}
            <form onSubmit={props.handleEditSubmit}>
            <label>
                Rate This Product!
            </label>
            <ReviewStars handleStarChange={props.handleStarChange} />
            <textarea
                onChange={props.handleChange}
                name="content"
                value={props.content}
            />
            <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default ReviewEditForm
