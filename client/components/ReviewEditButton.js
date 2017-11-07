import React, {Component} from 'react';
import {Button} from 'antd';


const ReviewEditButton = props => {
    return (
        <Button type="primary" onClick={props.handleClick}>Edit Your Review</Button>
    )
}


export default ReviewEditButton;