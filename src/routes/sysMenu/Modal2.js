import React from 'react'
import PropTypes from 'prop-types'
import { Select, Form, Input, InputNumber, Radio, Modal, Cascader, Upload, Button, Icon } from 'antd'
const { TextArea } = Input

const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const editModal = ({
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
      const data = {
        ...getFieldsValue(),
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
        <FormItem label="菜单名" hasFeedback {...formItemLayout}>
          {getFieldDecorator('name',
            {
              initialValue: item.name,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
        </FormItem>
        <FormItem label="功能" hasFeedback {...formItemLayout}>
          {getFieldDecorator('code',
            {
              initialValue: item.code,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Select mode="combobox">
            <Option value="menu">menu</Option>
            <Option value="create">create</Option>
            <Option value="update">update</Option>
            <Option value="delete">delete</Option>
          </Select>)}

        </FormItem>
        <FormItem label="路径" hasFeedback {...formItemLayout}>
          {getFieldDecorator('url',
            {
              initialValue: item.url,
              rules: [
                {

                },
              ],
            })(<TextArea placeholder="Autosize height with minimum and maximum number of lines" autosize={{ minRows: 2, maxRows: 6 }} />)}
        </FormItem>
        <FormItem label="排序" hasFeedback {...formItemLayout}>
          {getFieldDecorator('sort', {
            initialValue: item.sort,
            rules: [
              {
                required: true,
                message: 'The input is not valid phone!',
              },
            ],
          })(<InputNumber />)}
        </FormItem>
      </Form>
    </Modal>
  )
}

editModal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(editModal)
