import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'

const news = ({ location, dispatch, news, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType } = news
  const { pageSize } = pagination

  const listProps = {
    dataSource: list,
    loading: loading.effects['news/query'],
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
        type: 'news/delete',
        payload: item,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'news/showModal',
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
        type: 'news/showModal',
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
    </div>
  )
}

news.propTypes = {
  news: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ news, loading }) => ({ news, loading }))(news)
