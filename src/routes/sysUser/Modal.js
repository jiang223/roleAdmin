import React from 'react'
import PropTypes from 'prop-types'
import { Select, Form, Input, InputNumber, Radio, Modal,  Upload, Button, Icon, DatePicker } from 'antd'
import city from '../../utils/city'
import moment from 'moment'
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
    const cc = { city }
    validateFields((errors) => {
      if (errors) {
        return
      }
      const value = getFieldsValue()
      value.birthday = value.birthday.format('YYYY-MM-DD')
      const data = {
        ...value,
        key: item.key,
      }
      // data.address = data.address.join(' ')
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
        <FormItem label="用户名" hasFeedback {...formItemLayout}>
          {getFieldDecorator('userName', {
            initialValue: item.userName,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="密码" hasFeedback {...formItemLayout}>
          {getFieldDecorator('password', {
            initialValue: item.password,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input type="password"/>)}
        </FormItem>
        <FormItem label="姓名" hasFeedback {...formItemLayout}>
          {getFieldDecorator('realName', {
            initialValue: item.realName,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="用户类型" hasFeedback {...formItemLayout}>
          {getFieldDecorator('roleId', {
            initialValue: item.roleId,
            rules: [
              {
                required: true,
              },
            ],
          })(<Select>{loop(roleList)}</Select>)}
        </FormItem>
        <FormItem label="出生日期" hasFeedback {...formItemLayout}>
          {getFieldDecorator('birthday',{
            initialValue: moment(item.sbirthday || moment().format('YYYY-MM-DD'))
          })(<DatePicker
            defaultValue={moment(item.sbirthday || moment().format('YYYY-MM-DD'), 'YYYY-MM-DD')}
            format="YYYY-MM-DD"
          />)}
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
