import React, {Component} from 'react';
import {connect} from 'react-redux';
import {postReviewThunk, putReviewThunk} from '../store';
import ReviewStars from './ReviewStars';

class ReviewContentForm extends Component {
    constructor(props) {
        super(props)
        this.state = { content: '' }
        this.handleChange = this.handleChange.bind(this)
        // this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    handleChange(event) {
        console.log('CHANGE EVENT', event)
       const input = event.target.value
       this.setState({content: input})
    }

    render() {
        return (
            <div>
                <ReviewStars />
                <form onSubmit={this.props.handleSubmit}>
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
        handleSubmit(event) {
            console.log('HELLO FROM HANDLE SUBMIT')
            event.preventDefault()
            const review = {
                content: event.target.content.value
            }
            dispatch(postReviewThunk(review))
        }
    }
}




export default connect(mapStateToProps, mapDispatchToProps)(ReviewContentForm)
