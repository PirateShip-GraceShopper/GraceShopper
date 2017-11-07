import React from 'react';
import {connect} from 'react-redux'
import {deleteReviewThunk} from '../store';
import {Button} from 'antd';

const DeleteButton = props => {
    return <Button type="danger" onClick={props.handleClick}> Delete Your Review </Button>
}

const mapStateToProps = state => state
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleClick() {
            console.log('OWNPROPS', ownProps)
            dispatch(deleteReviewThunk(ownProps.review))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteButton)
