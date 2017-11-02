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

const createReview = newReview => ({
    type: CREATE_REVIEW,
    newReview
})

const removeReview = targetReview => ({
    type: REMOVE_REVIEW,
    targetReview
})

export const fetchReviewsThunk = () => dispatch => {
    axios.get('/api/reviews')
    .then(res => dispatch(getReviews(res.data)))
    .catch(error => dispatch(getReviews({error})))
}

export const putReviewThunk = () => dispatch => {
    axios.put('/api/reviews/:id')
    .then(res => res.data)
    .then(updatedReview => {
        dispatch(updateReview(updatedReview[1][0]))
    })
}

export const postReviewThunk = () => dispatch => {
    axios.post('/api/reviews')
    .then(res => dispatch(createReview(res.data)))
    .catch()
}

export const deleteReviewThunk = () => dispatch =>{
    axios.delete('/api/review/:id')
    .catch(error => dispatch(removeReview({error})));
}

const initialState = [];

const reducer = (prevState = initialState, action) => {
    switch (action.type) {
        case GET_REVIEWS:
            return action.reviews
        case CREATE_REVIEW:
            return [...state, action.review]
        case UPDATE_REVIEW:
            return prevState.map(review => (
                review.id !== action.item.id ? review : action.review
            ))
        default:
            return prevState
    }
}

export default reducer;
