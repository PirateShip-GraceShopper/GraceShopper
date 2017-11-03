import ReactStars from 'react-stars'
import React, {Component} from 'react'

export default class ReviewStars extends Component {
    constructor(props) {
        super(props)
        this.state = { rating: 1 }
        this.ratingChanged = this.ratingChanged.bind(this)
    }

    ratingChanged(newRating) {
        this.setState({ rating: newRating})
        console.log(this.state)
    }

    render() {
        return (
                <ReactStars
                    count={5}
                    onChange={this.ratingChanged}
                    size={24}
                    color2={'#ffd700'}
                    value={this.state.rating}
                />
        )
    }
}
