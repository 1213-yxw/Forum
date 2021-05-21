import React from "react";
import { Card, Button, Modal, Input } from "antd";
import { Editor } from "react-draft-wysiwyg";
import draftjs from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./RichText.css";

//文本内容、标题，时间获取点击提交时间时候获取当时的时间
export default class RichText extends React.Component {
  state = {
    showRichText: false,
    editorContent: "",
    editorState: "",
  };
  handleClearContent = () => {
    //清空文本
    this.setState({
      editorState: "",
    });
  };
  handleGetText = () => {
    //获取文本内容
    this.setState({
      showRichText: true,
    });
  };
  handleSubmitContent = () => {
    //提交文本内容
  };
  onEditorStateChange = (editorState) => {
    //编辑器的状态
    this.setState({
      editorState,
    });
  };
  onEditorChange = (editorContent) => {
    //编辑器内容的状态
    this.setState({
      editorContent,
    });
  };
  
  render() {
    //editorContent
    const { editorState } = this.state;
    return (
      <div className="div-editor">
        <Card>
          <Button type="primary" onClick={this.handleClearContent}>
            清空内容
          </Button>
          <Button
            type="primary"
            onClick={this.handleGetText}
            style={{ marginLeft: 10 }}
          >
            获取html文本
          </Button>
          <Button
            type="primary"
            onClick={this.handleSubmitContent}
            style={{ marginLeft: 10 }}
          >
            提交
          </Button>
        </Card>
        <Card>
          <Input placeholder="请输入文章标题" />
          <Editor
            editorState={editorState}
            onEditorStateChange={this.onEditorStateChange}
            onContentStateChange={this.onEditorChange}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="demo-editor" //"editorClassName"
            // onEditorStateChange={this.onEditorStateChange}
            toolbar={{
              fontFamily: {
                options: [
                  "宋体",
                  "黑体",
                  "楷体",
                  "微软雅黑",
                  "Arial",
                  "Georgia",
                  "Impact",
                  "Tahoma",
                  "Times New Roman",
                  "Verdana",
                ],
              },
            }}
          />
        </Card>
        <Modal
          title="富文本"
          visible={this.state.showRichText}
          onCancel={() => {
            this.setState({
              showRichText: false,
            });
          }}
          footer={null}
        >
          {draftjs(this.state.editorContent)}
        </Modal>
      </div>
    );
  }
}
