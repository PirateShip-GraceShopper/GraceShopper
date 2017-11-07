import axios from 'axios';


const GET_REVIEWS = 'GET_REVIEWS';
const UPDATE_REVIEW = 'UPDATE_REVIEW';
const CREATE_REVIEW = 'CREATE_REVIEW';
const REMOVE_REVIEW = 'REMOVE_REVIEW';

const getReviews = reviews => ({
    type: GET_REVIEWS,
    reviews
})

const updateReview = review => ({
    type: UPDATE_REVIEW,
    review
})

const createReview = review => {
    return {
        type: CREATE_REVIEW,
        review
    }
}

const removeReview = targetReview => ({
    type: REMOVE_REVIEW,
    targetReview
})

export const fetchReviewsThunk = () => dispatch => {
    axios.get('/api/reviews')
    .then(res => dispatch(getReviews(res.data)))
    .catch(error => dispatch(getReviews({error})))
}

export const putReviewThunk = review => dispatch => {
    axios.put(`/api/reviews/${review.id}`, review)
    .then(res => res.data)
    .then(updatedReview => {
        dispatch(updateReview(updatedReview[0]))
    })
}

export const postReviewThunk = review => dispatch => {
    axios.post('/api/reviews', review)
    .then(res => dispatch(createReview(res.data)))
    .catch(error => dispatch(createReview({error})))
}

export const deleteReviewThunk = review => dispatch => {
    axios.delete(`/api/review/${review.id}`)
    .catch(error => dispatch(removeReview({error})));
}

const initialState = [];

const reducer = (prevState = initialState, action) => {
    switch (action.type) {
        case GET_REVIEWS:
            return action.reviews
        case CREATE_REVIEW:
            return [...prevState, action.review]
        case UPDATE_REVIEW:
            return prevState.map(review => (
                review.id !== action.review.id ? review : action.review
            ))
        default:
            return prevState
    }
}

export default reducer;
