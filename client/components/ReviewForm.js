import React, {Component} from 'react';
import {connect} from 'react-redux';
import {postReviewThunk, putReviewThunk, fetchReviewsThunk} from '../store';
import ReviewStars from './ReviewStars';
import {Button, Rate, Carousel} from 'antd';

class ReviewContentForm extends Component {
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

    render() {
        return (
            <div>
                {console.log('USERID', this.state.userId)}
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
            </div>
        )
    }
}

const mapStateToProps = ({ reviews }) => ({ reviews })
const mapDispatchToProps = dispatch => {
    return {
        handleSubmit(review) {
            dispatch(postReviewThunk(review))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewContentForm)
