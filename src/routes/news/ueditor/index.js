import React from 'react'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import { Form, Input, Button,InputNumber } from 'antd'
import Ueditor from '../../demo/shared/Ueditor.js'
const queryString = require('query-string');
const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,

  },
}

const newsDetail = ({
                      dispatch,
                      newsDetail,
                      form: {
                      getFieldDecorator,
                      validateFields,
                      getFieldsValue,
                      },

}) => {
  const query = queryString.parse(location.search);
  const item=newsDetail.item||{}
  const handleOk = () => {
    validateFields((errors) => {
      if (errors)   {
        return
      }
      const value = getFieldsValue()
      const contents = UE.getEditor('content').getContent()
      value.contents=contents

      dispatch({
        type: 'newsDetail/submit',
        payload: {
          currentItem: value,
        },
      })
    })
  }

  return (
    <Form layout="horizontal">
      <FormItem label="标题" hasFeedback {...formItemLayout}>
        {getFieldDecorator('title', {
          initialValue: item.title,
          rules: [
            {
              required: true,
              max: 100,
            },
          ],
        })(<Input />)}
      </FormItem>
      <FormItem label="副标题" hasFeedback {...formItemLayout}>
        {getFieldDecorator('notes', {
          initialValue: item.notes,
          rules: [
            {
              required: true,
            },
          ],
        })(<Input/>)}
      </FormItem>
      <FormItem label="排序" hasFeedback {...formItemLayout}>
        {getFieldDecorator('sort', {
          initialValue: item.sort,
          rules: [
            {
              required: true,
            },
          ],
        })(<InputNumber/>)}
      </FormItem>

      {(item.contents||query.type!="update")&&<Ueditor  id="content" height="200"   value={item.contents}/>}
      <Button type="primary" size="large" className="margin-right" onClick={handleOk}>Submit</Button>
    </Form>

  )

}

newsDetail.propTypes = {
  form: PropTypes.object.isRequired,
  userDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ newsDetail, loading }) => ({ newsDetail, loading }))(Form.create()(newsDetail))
