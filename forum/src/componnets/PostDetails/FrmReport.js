import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import {Modal,Form,Input,Radio,Button} from 'antd'

const data = {harmfulContent:'',reportDescription:''}
export default class FrmReport extends Component {
   static propTypes = {
        visible: PropTypes.bool,
        callBack:PropTypes.func
    }
   formRef_
   constructor(props){
      super(props)
      this.formRef_=createRef()
      this.state={
          value:''
      }
   }

   onCancel=()=>{
       this.props.callBack()
   }

   onRadioChange=(e)=>{
     data.harmfulContent=e.target.value
   }

   onInputChange=(e)=>{
       this.setState({value:e.target.value})
   }

   onFinsh=()=>{
    this.props.callBack(data)
   }

   onSubmit=()=>{
       data.reportDescription=this.state.value
   }

    render() {
        return (
            <Modal
            title='举报'
            visible={this.props.visible}
            footer={null}
            onCancel={this.onCancel}
            >
                <Form ref={this.formRef_} onFinish={this.onFinsh}>
                    <Form.Item>
                    <p>内容违规/侵犯权益</p>
                    <Radio.Group onChange={this.onRadioChange}>
                        <Radio value="内容不实">内容不实</Radio>
                        <Radio value="低俗色情">低俗色情</Radio>
                        <Radio value="广告软文">广告软文</Radio>
                        <Radio value="涉嫌违法犯罪">涉嫌违法犯罪</Radio>
                        <Radio value="虚假欺诈">虚假欺诈</Radio>
                        <Radio value="冒用他人账号">冒用他人账号</Radio>
                        <Radio value="其他问题">其他问题</Radio>
                        <Radio value="冒充本人、占用头条号名称">冒充本人、占用头条号名称</Radio>
                    </Radio.Group>
                    </Form.Item>
                    <Form.Item>
                    <p>举报描述</p>
                    <Input type="textarea" placeholder='举报原因' value={this.state.value} onChange={this.onInputChange}/>
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit' onClick={this.onSubmit}>确定</Button>
                        <Button type='default' htmlType='reset' onClick={this.onCancel}>取消</Button>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}
