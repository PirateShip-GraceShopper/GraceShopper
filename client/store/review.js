import axios from 'axios';

const GET_REVIEW = 'GET_REVIEW';
const POST_REVIEW = 'POST_REVIEW';
const REMOVE_REVIEW = 'REMOVE_REVIEW';

const getReviews = reviews => ({
    type: GET_REVIEW,
    reviews
})

const postReview = newReview => ({
    type: POST_REVIEW,
    newReview
})

const removeReview = targetReview => ({
    type: REMOVE_REVIEW,
    targetReview
})


const initialState = { reviews: [] }

export default const reducer = (prevState = initialState, action) => {
    switch (action.type) {
        case GET_REVIEWS:
            return Object.assign({}, prevState, {reviews: action.reviews})
        case POST_REVIEW:
            return Object.assign({}, prevState, {reviews: prevState.reviews.concat(action.reviews)})
        default:
            return prevState
    }
}
