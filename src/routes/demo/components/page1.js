

import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button } from 'antd'
import Ueditor from '../shared/Ueditor.js'
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
        <Ueditor  id="content" height="200"/>
      </Form>

  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
