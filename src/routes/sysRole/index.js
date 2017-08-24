import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import TreeModal from './TreeModal'
import Modal from './Modal'
const SysRole = ({ location, dispatch, sysRole, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalVisible2, modalType, isMotion, selectedRowKeys, treeDate, state } = sysRole
  const { pageSize } = pagination
  const treeModalProps = {
    state,
    treeDate,
    visible: modalVisible2,
    maskClosable: false,
    title: '',
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      console.log(data)
      dispatch({
        type: 'sysRole/updateFunction',
        payload: {
          checkedKeys: data.checkedKeys,
          roleId: currentItem.id,
        },
      })
    },
    onCancel () {
      dispatch({
        type: 'sysRole/hideTreeModal',
      })
    },
  }
  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['sysRole/update'],
    title: `${modalType === 'create' ? 'Create User' : 'Update User'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `sysRole/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'sysRole/hideModal',
      })
    },
  }
  const listProps = {
    dataSource: list,
    loading: loading.effects['sysRole/query'],
    pagination,
    location,
    isMotion,
    onChange (page) {
      const { query, pathname } = location
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: page.current,
          pageSize: page.pageSize,
        },
      }))
    },
    onDeleteItem (id) {
      dispatch({
        type: 'sysRole/delete',
        payload: id,
      })
    },
    onUpdateFunction (item) {
      dispatch({
        type: 'sysRole/updateFunctionShow',
        payload: {
          currentItem: item,
        },
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'sysRole/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'sysRole/updateState',
          payload: {
            selectedRowKeys: keys,
          },
        })
      },
    },
  }
  const filterProps = {
    isMotion,
    filter: {
      ...location.query,
    },
    onFilterChange (value) {
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          ...value,
          page: 1,
          pageSize,
        },
      }))
    },
    onSearch (fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/user',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/user',
      }))
    },
    onAdd () {
      dispatch({
        type: 'sysRole/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'app/switchIsMotion' })
    },
  }
  return (
    <div className="content-inner">
      <Filter {...filterProps} />
      <List {...listProps} />
      {modalVisible2 && <TreeModal {...treeModalProps} />}
      {modalVisible && <Modal {...modalProps} />}
    </div>
  )
}

SysRole.propTypes = {
  sysRole: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}
export default connect(({ sysRole, loading }) => ({ sysRole, loading }))(SysRole)
