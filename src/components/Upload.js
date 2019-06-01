import { Upload, Icon, message } from 'antd';
import DropOption from "./DropOption";
import styles from './upload.less'

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/png';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}
var down
class Avatar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }
  state = {
    loading: false,
  };
  componentDidMount(){
    this.setState({ imageUrl: this.props.imageUrl });
    down = this.props.down;

  }
  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {

      down(info.file.response.data.id);
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
    }
  }
  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;
    return (
      <Upload
        className={styles}

        name="avatar"
        listType="picture-card"
     /*   className="avatar-uploader"*/
        showUploadList={false}
        action="/api/v2/fileUpload"
        beforeUpload={beforeUpload}
        onChange={this.handleChange}

      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '98px',height: '98px' }}/> : uploadButton}
      </Upload>
    );
  }

}

export default Avatar

