import React, { Component } from 'react'
import { Card,Avatar,message} from 'antd';
import { UserOutlined} from '@ant-design/icons';
import axios from 'axios'

import Comments from './Comments/Comments.js'
import AddComments from './AddComments/AddComments.js'
import FrmReport from './FrmReport.js'
import './PostDetails.css';
import Like from './like.png'
import Liked from './liked.png'
import {User} from './User.js'


export default class PostDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            postId:this.props.match.params.postId,
            showFrmReport: false,
            reviewedName: '',
            reviewedId: 0,
            likes: 0,
            action: null,
            like: 0,
            isReport: false,
            post: {},
            comments: []
        }
    }

    async addLike() {
        const response = await axios({
            url: 'https://localhost:5001/api/Comment/addLike',
            method: 'POST',
            data: {
                postId: this.state.post.id,
                commentId: 0,
                supportId: User.id,
            },
            header: { 'Content-type': 'application/json' }
        })
    }

    async getLike(postId) {
        const response = await axios(`https://localhost:5001/api/Comment/getLike/${postId}/${0}/${User.id}`)
        
        if (response) {
            this.setState({action: 'liked', isReport: true })
        }
    }

    async deleteLike() {
        const response = await axios(`https://localhost:5001/api/Comment/deleteLike/${this.state.post.id}/${0}/${User.id}`)
    }

    async getPost() {
        const response = await axios(`https://localhost:5001/api/Comment/getPost/${this.state.postId}`)
        const post = response.data
        this.getLike(post.id)
        this.setState({ post: post, likes: post.likes, reviewedName: post.authorName, reviewedId: post.authorId })
    }

    async getComments() {
        const response = await axios(`https://localhost:5001/api/Comment/getComments/${this.state.postId}`)
        const comments = response.data
        this.setState({ comments: comments })
    }

    changeHtml = (htmlString) => {
        let html = {
            __html: htmlString
        }
        return (<div className='text' dangerouslySetInnerHTML={html}></div>)
    }

    showComments = (comments) => {
        return comments.map(comment => {
            return (<Comments comment={comment} callBack={this.replyCallBack} />)
        })
    }

    replyCallBack = (reviewedName, reviewedId) => {
        this.setState({ reviewedName: reviewedName, reviewedId: reviewedId })
    }

    showFrmReport = () => {
        this.setState({ showFrmReport: true })
    }

    hideFrmReport = (values) => {
        this.setState({ showFrmReport: false })
        this.addReport(values)

    }

    async addReport(values) {
        if (values) {
            var response = await axios({
                url: 'https://localhost:5001/api/Comment/addReport',
                method: 'POST',
                data: {
                    postId: this.state.post.id,
                    reportId: User.id,
                    harmfulContent: values.harmfulContent,
                    reportDescription: values.reportDescription
                },
                headers: { 'Content-type': 'application/json' }
            })
            if (response.data) {
                message.success('提交成功')
            }
        }
    }

    like = () => {
        if (!this.state.isReport) {
            this.addLike()
            this.setState({
                likes: this.state.likes + 1,
                action: 'liked',
                like: 1,
                isReport: true,
            })
        } else {
            this.deleteLike()
            this.setState({
                likes: this.state.likes - 1,
                action: '',
                like: 0,
                isReport: false,
            })
        }
    }

    async componentDidMount() {
        this.getPost()
        this.getComments()
    }

    render() {
        const icon = [this.state.action === 'liked' ? <img src={Liked} title='取消点赞' style={{ width: 64, height: 64 }} /> : <img src={Like} title="点赞" style={{ width: 64, height: 64 }} />]
        const post = this.state.post
        const comments = this.state.comments
        
        return (
            <div>
                <div className="contentTitle"><h1>{post.title}</h1></div>
                <div className="title">
                    <span className="avatar-item">
                        <Avatar size={64} icon={<UserOutlined />}
                            src={'../images/'+post.authorAvatar}
                            style={{ backgroundColor: '#ffffff' }} />
                        <span style={{ fontSize: '14',marginLeft:10 }}>{post.authorName}</span>
                        <span style={{ marginLeft: '10px' }}>时间：{post.postDate}</span>
                        <span style={{ marginLeft: 20,color:'blue' }} onClick={this.showFrmReport}>举报</span>
                    </span>
                </div>
                <Card>
                    <div className="content">
                        {this.changeHtml(post.content)}
                    </div>
                    <div className="icon">
                        <span onClick={this.like}>{icon}</span>
                        <span style={{ marginLeft: 20 }}>{this.state.likes}人点赞</span>
                    </div>

                </Card>
                <h2 style={{ marginLeft: 200 }}>评论</h2>
                <Card>
                    {this.showComments(comments)}
                    <AddComments reviewedId={this.state.reviewedId} postId={post.id} commentCount={comments.length} reviewedName={this.state.reviewedName} />
                </Card>
                <FrmReport visible={this.state.showFrmReport} callBack={this.hideFrmReport} />
            </div>
        )
    }
}
