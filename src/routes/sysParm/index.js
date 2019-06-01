import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const sysParm = ({ location, dispatch, sysParm, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType } = sysParm
  const { pageSize } = pagination
  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['sysParm/'+modalType],
    title: `${modalType === 'create' ? 'Create User' : 'Update User'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `sysParm/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'sysParm/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['sysParm/query'],
    pagination,
    location,
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
    onDeleteItem (item) {
      dispatch({
        type: 'sysParm/delete',
        payload: item,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'sysParm/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
  }

  const filterProps = {
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
        type: 'sysParm/showModal',
        payload: {
          modalType: 'create',
        },
      })
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

sysParm.propTypes = {
  sysParm: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ sysParm, loading }) => ({ sysParm, loading }))(sysParm)
