import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal,  Upload, Button, Icon, DatePicker,message } from 'antd'
import  FileUpload from '../../components/Upload'

const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}
const loop = data => data.map((treeDate) => {
  return (
      <Option key={treeDate.id}>{treeDate.name}</Option>
  )
})
const modal = ({
  roleList = [],
  item = {},
  onOk,
  form: {setFields,
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps

}) => {


  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const value = getFieldsValue()
      value.ff33f=null
      const data = {
        ...value,
        key: item.key,
      }
      onOk(data)
    })
  }
  const down = (fileId) => {
    //("111");
    setFields({
      fileId: {
        value:fileId,
      },
    });
  }
  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }
  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="" hasFeedback {...formItemLayout} style={{ display: "none" }}>
          {getFieldDecorator('fileId', {
            initialValue: item.fileId,
          })(<Input style={{ display: "none" }}/>)}
        </FormItem>
        <FormItem label="案例名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('caseName', {
            initialValue: item.caseName,
            rules: [
              {
                required: true,
                max: 25,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="案例路径" hasFeedback {...formItemLayout}>
          {getFieldDecorator('url', {
            initialValue: item.url,
            rules: [
              {
                required: true,
                max: 50,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="排序" hasFeedback {...formItemLayout}>
          {getFieldDecorator('sort', {
            initialValue: item.sort,
            rules: [
              {
                required: true,
              },
            ],
          })(<InputNumber />)}

        </FormItem>
        <FormItem label="上传图片" hasFeedback {...formItemLayout}>
          {getFieldDecorator('ff33f', {
            valuePropName: 'fileList',
            //initialValue: this,
            // rules: [
            //   {
            //     required: true,
            //   },
            // ],
          })(<FileUpload  imageUrl={item.fileUrl} down={down}/>)}
        </FormItem>
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
