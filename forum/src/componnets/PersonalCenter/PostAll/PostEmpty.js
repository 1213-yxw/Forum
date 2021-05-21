import React, { Component } from 'react'
import { Empty } from 'antd';

export default class PostEmpty extends Component {
    render() {
        return (
          <Empty 
            style={{margin:"100px 100px 80px 0"}}
            description={false} />
        )
    }
}
