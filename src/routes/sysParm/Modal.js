import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal,  Upload, Button, Icon, DatePicker } from 'antd'
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
  form: {
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
      const data = {
        ...value,
        key: item.key,
      }
      onOk(data)
    })
  }
  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }
  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="参数类型" hasFeedback {...formItemLayout}>
          {getFieldDecorator('parmType', {
            initialValue: item.parmType,
            rules: [
              {
                required: true,
                max: 25,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="参数名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('parmName', {
            initialValue: item.parmName,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input/>)}
        </FormItem>
        <FormItem label="参数值" hasFeedback {...formItemLayout}>
          {getFieldDecorator('parmVal', {
            initialValue: item.parmVal,
            rules: [
              {
                required: true,
                max: 25,
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
        <FormItem label="扩展1" hasFeedback {...formItemLayout}>
          {getFieldDecorator('dic_1', {
            initialValue: item.dic_1,
            rules: [
              {

              },
            ],
          })(<Input />)}

        </FormItem>
        <FormItem label="扩展2" hasFeedback {...formItemLayout}>
          {getFieldDecorator('dic_2', {
            initialValue: item.dic_2,
            rules: [
              {

              },
            ],
          })(<Input />)}
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
