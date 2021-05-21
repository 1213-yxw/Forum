import React, { Component } from "react";
import AvatarEditor from "react-avatar-editor";
import { Modal, Divider, Slider } from "antd";
import { withRouter } from "react-router";

//再鼠标移动到头像时 显示“更换头像”的文字，点击头像时，会显示一个窗口进行更换头像功能
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

class FrmUpdateAvatar extends Component {
  state = {
    // 编辑头像
    editImg: false,
    scale: 1,
    rotate: 0,
    headPhoto: "",
  };

  // 上传组件upload上传前获取文件
  handleChange = (file) => {
    getBase64(file, (url) => {
      this.setState({
        headPhoto: url,
        scale: 1,
        rotate: 0,
        editImg: true,
      });
    });
    return false;
  };

  // 确定调整完的头像
  subImg = () => {
    this.setState({
      editImg: false,
      headPhoto: this.editor.getImage().toDataURL(), // 编辑完成后的图片base64
    });
  };

  render() {
    return (
      // 编辑弹窗
      <Modal
        visible={this.state.editImg}
        onOk={this.subImg}
        onCancel={() => {
          this.setState({ editImg: false });
        }}
        width="400px"
      >
        <AvatarEditor
          ref={(editor) => {
            this.editor = editor;
          }}
          image={this.state.headPhoto}
          width={250}
          height={250}
          border={50}
          color={[0, 0, 0, 0.3]} // RGBA
          scale={this.state.scale}
          rotate={this.state.rotate}
        />
        <Divider orientation="left">缩放</Divider>
        <Slider
          onChange={(val) => {
            this.setState({ scale: val });
          }}
          step={0.05}
          min={1}
          max={2}
        />
        <Divider orientation="left">旋转</Divider>
        <Slider
          onChange={(val) => {
            this.setState({ rotate: val });
          }}
          step={90}
          min={0}
          max={270}
        />
      </Modal>
    );
  }
}
export default withRouter(FrmUpdateAvatar);
