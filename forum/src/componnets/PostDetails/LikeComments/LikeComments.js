import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import {Tooltip} from 'antd';
import {LikeOutlined,LikeFilled } from '@ant-design/icons';

import AddComments from '../AddComments/AddComments.js'
import {User} from '../User.js'
export default class LikeComments extends Component {
    static propTypes = {
        likes: PropTypes.number
    }
    constructor(props){
        super(props)
        this.state={
            likes: this.props.comment.likes,
            action: null,
            like:0,
            isReport:false,
        }
    }

    async addLike(){
    const response = await axios({
        url:'https://localhost:5001/api/Comment/addLike',
        method:'POST',
          data:{
           postId:this.props.comment.postId,
           commentId:this.props.comment.id,
           supportId:User.id,
          },
          header:{'Content-type':'application/json'}
    })
    if(response.data){
        console.log('点赞')
    }
    }

    async getLike(){
        const response = await axios(`https://localhost:5001/api/Comment/getLike/${this.props.comment.postId}/${this.props.comment.id}/${User.id}`)
        
        if(response.data){
            this.setState({action:'liked',isReport:true})
        }
        }

    async deleteLike(){
        const response = await axios(`https://localhost:5001/api/Comment/deleteLike/${this.props.comment.postId}/${this.props.comment.id}/${User.id}`)
        if(response.data){
            console.log('取消点赞')
        }
    }

    like = () => {
        if(!this.state.isReport){
        this.addLike()
        this.setState({ 
            likes:this.state.likes+1,
            action: 'liked',
            like:1,
            isReport:true,
        })}else{
            this.deleteLike()
            this.setState({ 
                likes:this.state.likes-1,
                action: '',
                like:0,
                isReport:false,
            })
        }
    }

    mentions=()=>{
        this.props.callBack(this.props.comment.reviewerName,
            this.props.comment.reviewerId)
    }

    async componentDidMount(){
        this.getLike()
    }

    render() {
        const icon = this.state.action === 'liked' ? <LikeFilled style={{color:'black'}}/>: <LikeOutlined/>
        return (
            <>
            <Tooltip key="comment-basic-like">
                <span onClick={this.like}>
                    {icon}
                <span className="comment-action">{this.state.likes}</span>
                </span>
            </Tooltip>
            <span key="comment-basic-reply-to" onClick={this.mentions}>回复</span>
            </>
        )
    }
}
