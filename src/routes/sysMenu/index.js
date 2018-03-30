/**
 * Created by Administrator on 2017-08-08.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Table, Button, Modal } from 'antd'

import EditModal from './Modal2'
import {DropOption} from '../../components'

const confirm = Modal.confirm
const sysMenu = ({ location, dispatch, sysMenu, loading }) => {
  const { list, currentItem, modalVisible, modalType, selectedRowKeys, CreatItem ,code} = sysMenu
  const ModalOpts = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['sysMenu/update'],
    title: `${modalType === 'create' ? 'Create sysMenu' : 'Update sysMenu'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `sysMenu/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'sysMenu/hideModal',
      })
    },
  }
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      dispatch({
        type: 'sysMenu/showModal',
        payload: {
          modalType: 'update',
          currentItem: record,
        },
      })
    } else if (e.key === '2') {
      confirm({
        title: 'Are you sure delete this record?',
        onOk () {
          dispatch({
            type: 'sysMenu/delete',
            payload: {
              currentItem: record,
            },
          })
        },
      })
    } else if (e.key === '3') {
      dispatch({
        type: 'sysMenu/showModal',
        payload: {
          modalType: 'create',
          creatItem: record,
        },
      })
    }
  }

  const columns = [{
    title: 'name',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: 'function',
    dataIndex: 'method',
    key: 'method',
  }, {
    title: 'sort',
    dataIndex: 'sort',
    key: 'sort',
  },
  {
    title: 'Operation',
    key: 'operation',
    width: 100,
    render: (text, record) => {
      return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: 'Update',isUse:code.update }||true, { key: '2', name: 'Delete',isUse:code.delete }, { key: '3', name: 'Create',isUse:code.create }]} />
    },
  },
  ]
  const onAdd = () => {
    dispatch({
      type: 'sysMenu/showModal',
      payload: {
        modalType: 'create',
        creatItem: {},
      },
    })
  }

  return (
    <div className="content-inner">
     <div style={{ marginBottom: 16 }}>
       {code.create&&<Button size="large" type="ghost" onClick={onAdd}>Create</Button>}
     </div>
    <Table columns={columns}
      dataSource={list}
      rowKey={record => record.id}
      indentSize="25"
    />
    {modalVisible && <EditModal {...ModalOpts} />}
    </div>
  )
}
sysMenu.propTypes = {
  sysMenu: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ sysMenu, loading }) => ({ sysMenu, loading }))(sysMenu)
