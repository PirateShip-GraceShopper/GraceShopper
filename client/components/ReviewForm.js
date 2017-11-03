import React, {Component} from 'react';
import {connect} from 'react-redux';
import {postReviewThunk, putReviewThunk} from '../store';
import ReviewStars from './ReviewStars';

class ReviewContentForm extends Component {
    constructor(props) {
        super(props)
        this.state = { content: '', rating: null }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
       const input = event.target.value
       this.setState({content: input})
    }

    render() {
        return (
            <div>
                <form onSubmit={(evt) => {
                    evt.preventDefault()
                    this.props.handleSubmit(this.state)
                    }}>
                    <label>
                        Rate This Product!
                    </label>
                    <ReviewStars />
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
