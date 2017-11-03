import ReactStars from 'react-stars'
import React, {Component} from 'react'
import {Rate} from 'antd'

export default class ReviewStars extends Component {
    constructor(props) {
        super(props)
        this.state = { rating: 1 }
        this.ratingChanged = this.ratingChanged.bind(this)
    }

    ratingChanged(newRating) {
        this.setState({ rating: newRating})
        this.props.handleStarChange(newRating)
    }

    render() {
        return (
                <Rate
                    value={this.state.rating}
                    onChange={this.ratingChanged}
                />
        )
    }
}
