import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { Avatar, Comment,Form, Button, List, Input ,Tooltip,message} from 'antd';
import moment from 'moment'

import Comments from '../Comments/Comments.js'
import {User} from '../User.js'

const { TextArea } = Input;

export default class AddComments extends Component {
    static propTypes = {
        postId: PropTypes.number,
        commentCount:PropTypes.number,
        reviewedId:PropTypes.number,
        reviewedName:PropTypes.string,
        callBack:PropTypes.func
    }

    constructor(props){
        super(props)
        this.state = {
            comments: [],
            submitting: false,
            value: '',
            postId:this.props.postId,
            commentCount:this.props.commentCount
        }
        
    }
    
    CommentList = ( comments ) => (
        <List
          dataSource={comments}
          header={`${comments.length} 个回复`}
          itemLayout="horizontal"
          renderItem={props=>props}
        />
      )

      Editor = ( onChange, onSubmit, submitting, value ) => (
        <>
          <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} placeholder={`回复:${this.props.reviewedName}`}/>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
              发布
            </Button>
          </Form.Item>
        </>
      )

     async handleSubmit(){
        if (!this.state.value) {
          return;
        }
    
        this.setState({
          submitting: true,
        });
        let comment = {
          id: this.state.commentCount+1,
          reviewedId:this.props.reviewedId,
          reviewedName:this.props.reviewedName,
          reviewerId:User.id,
          reviewerName:User.userName,
          reviewerAvatar:User.avatar,
          postId:this.state.postId,
          commentDate:moment().format('YY-MM-DD HH:MM'),
          content: this.state.value,
          likes: 0,
          dislikes: 0
        }
        setTimeout(() => {
          this.setState({
            submitting: false,
            value: '',
            comments: [
              ...this.state.comments,
              <Comment
              className='comment'
              key={comment.id}
              author={<a>{comment.reviewerName}</a>}
              avatar={
                  <Avatar
                      src={comment.reviewerAvatar}
                      alt={comment.reviewerName}
                  />
              }
              content={comment.content}
              datetime={
                  <Tooltip title={comment.commentDate}>
                      <span>{comment.commentDate}</span>
                      <span style={{ marginLeft: 20 }}>回复了：{comment.reviewedName}</span>
                  </Tooltip>
              }></Comment>
            ],
          });
        }, 1000);
        const response = await axios({
          url:'https://localhost:5001/api/Comment/addComment',
          method:'POST',
          data:{
           postId:this.props.postId,
           reviewerId:User.id,
           reviewedId:comment.reviewedId,
           content:comment.content,
           commentDate:comment.commentDate
          },
          header:{'Content-type':'application/json'}
        })
        if(response.data){
          message.success('评论成功')
        }else{
          message.error('评论失败')
        }
      }

      handleChange = e => {
        this.setState({
          value: e.target.value,
        });
      }
    
    render() {
        const { comments, submitting, value } = this.state;
        return (
            <>
                {comments.length > 0 && this.CommentList(comments)}
                <Comment
                    className='comment'
                    avatar={
                        <Avatar
                            src={User.avatar}
                            alt={User.userName}
                        />
                    }
                    content={
                        this.Editor(
                            this.handleChange,
                            this.handleSubmit.bind(this),
                            submitting,
                            value
                        )
                    }
                />
            </>
        )
    }
}
