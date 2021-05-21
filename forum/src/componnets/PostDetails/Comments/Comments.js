import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Avatar, Comment, Tooltip,Divider} from 'antd';
import moment from 'moment';

import LikeComments from '../LikeComments/LikeComments.js'
import './Comments.css'

export default class Comments extends Component {
    static propTypes = {
        comments: PropTypes.object
    }
    constructor(props) {
        super(props)
        this.state = {
            comment: { ...this.props.comment },
        }
    }

    render() {
        const comment = this.state.comment
        const likecomments = [<LikeComments comment={comment} callBack={this.props.callBack} />]
        return (
            <Comment
                className='comment'
                key={comment.id}
                actions={likecomments}
                author={<a>{comment.reviewerName}</a>}
                avatar={
                    <Avatar
                        src={'../images/'+comment.reviewerAvatar}
                        alt={comment.reviewerName}
                    />
                }
                content={comment.content}
                datetime={
                    <Tooltip title={comment.commentDate}>
                        <span>{comment.commentDate}</span>
                        <span style={{ marginLeft: 20 }}>回复了：{comment.reviewedName}</span>
                    </Tooltip>
                }
            >
                <Divider />
            </Comment>
        )
    }
}
