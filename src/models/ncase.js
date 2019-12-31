import modelExtend from 'dva-model-extend'
import { create, remove, update, query } from '../services/ncase'
import { pageModel } from './common'
import { config } from '../utils'
const queryString = require('query-string');
const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'ncase',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/ncase') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
        }
      })
    },
  },

  effects: {

    *query ({ payload={}}, { call, put }) {
      payload.page = payload.page || 1
      payload.pageSize = payload.pageSize || 10
      const data = yield call(query, payload)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.pagination.total||0,
            },
          },
        })
      }
    },
    *'delete' ({ payload }, { call, put, select }) {
      const data = yield call(remove, { caseId: payload })
      if (data.success) {
        yield put({ type: 'onRefresh' })
      } else {
        throw data
      }
    },
    *create ({ payload }, { call, put }) {
      const data = yield call(create, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'onRefresh' })
      } else {
        throw data
      }
    },
    *update ({ payload }, { select, call, put }) {
      const caseId = yield select(({ ncase }) => ncase.currentItem.caseId)
      const newUser = { ...payload, caseId }
      const data = yield call(update, newUser)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'onRefresh' })
      } else {
        throw data
      }
    },
    *onRefresh ({ payload }, { select, call, put }) {
      const query = queryString.parse(location.search)
      yield put({ type: 'query',payload:query})
    },
  },

  reducers: {

    change (state, { payload }) {
      return { ...state, ...payload }
    },

    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
    },
  },
})
