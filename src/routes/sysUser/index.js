import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const SysUser = ({ location, dispatch, sysUser, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType, isMotion, roleList } = sysUser
  const { pageSize } = pagination
  const modalProps = {
    roleList,
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['sysUser/'+modalType],
    title: `${modalType === 'create' ? 'Create User' : 'Update User'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `sysUser/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'sysUser/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['sysUser/query'],
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
    onDeleteItem (userId) {
      dispatch({
        type: 'sysUser/delete',
        payload: userId,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'sysUser/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
/*    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'sysUser/updateState',
          payload: {
            selectedRowKeys: keys,
          },
        })
      },
    },*/
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
    onAdd () {
      dispatch({
        type: 'sysUser/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'sysUser/switchIsMotion' })
    },
  }


  return (
    <div className="content-inner">
      <Filter {...filterProps} />
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
    </div>
  )
}

SysUser.propTypes = {
  sysUser: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ sysUser, loading }) => ({ sysUser, loading }))(SysUser)
