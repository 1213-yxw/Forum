import React, { Component } from 'react'
import {Comment,Tooltip,Avatar} from 'antd'
import { Link } from 'react-router-dom'

export default class ShowPost extends Component {
   constructor(props){
    super(props)
    this.state={
        post:this.props.post
    }
   }

    render() {
        return (
           <>
           </>
        )
    }
}
