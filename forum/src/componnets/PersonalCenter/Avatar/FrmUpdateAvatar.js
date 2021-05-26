import React,{createRef} from "react";
import { Upload, message, Button ,Modal} from "antd";
import PropTypes from "prop-types";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import Form from "antd/lib/form/Form";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}
const data = {harmfulContent:'',reportDescription:''}
export default class FrmUpdateAvatar extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    callBack: PropTypes.func,
  };
  formRef_
  constructor(props) {
    super(props)
    this.formRef_=createRef()
    this.state = {
      loading: false,
      value:''
    };
  }

  handleChange = (info) => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) =>
        this.setState({
          imageUrl,
          loading: false,
        })
      );
    }
  };

  onFinsh=()=>{
    this.props.callBack(data)
   }
   onSubmit=()=>{
    data.reportDescription=this.state.value
}
onCancel=()=>{
  this.props.callBack()
}
  render() {
    const { loading, imageUrl } = this.state;
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <Modal
        title="更换头像"
        visible={this.props.visible}
        footer={null}
        onCancel={this.onCancel}
      >
        <Form ref={this.formRef_} onFinish={this.onFinsh}>
          <Form.Item>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={this.handleChange}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={this.onSubmit}>
              确定
            </Button>
            <Button type="default" htmlType="reset" onClick={this.onCancel}>
              取消
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
