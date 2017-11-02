import ReactStars from 'react-stars'
import React, {Component} from 'react'

export default class ReviewStars extends Component {
    constructor() {
        super()
    }

    ratingChanged(newRating) {
        console.log(newRating);
    }

    render() {
        return (
            <div>
                <ReactStars
                    count={5},
                    onChange={ratingChanged},
                    size={24},
                    color2={'#ffd700'} 
                />
            </div>
        )
    }
}