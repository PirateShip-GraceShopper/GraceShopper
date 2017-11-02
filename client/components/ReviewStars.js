import ReactStars from 'react-stars'
import React, {Component} from 'react'

export default class ReviewStars extends Component {
    constructor() {
        super()
        this.ratingChanged = this.ratingChanged.bind(this)
    }

    ratingChanged(newRating) {
        
    }

    render() {
        return (
            <div>
                <ReactStars
                    count={5}
                    onChange={this.ratingChanged}
                    size={24}
                    color2={'#ffd700'}
                />
            </div>
        )
    }
}