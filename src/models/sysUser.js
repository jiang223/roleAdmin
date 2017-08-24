import modelExtend from 'dva-model-extend'
import { create, remove, update, query } from '../services/sysUser'
import { findRole } from '../services/sysRole'
import { pageModel } from './common'
import { config } from '../utils'
const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'sysUser',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    isMotion: localStorage.getItem(`${prefix}userIsMotion`) === 'true',
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/sys/user') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
          dispatch({
            type: 'queryRole',
            payload: location.query,
          })
        }
      })
    },
  },

  effects: {

    *query ({ payload = {} }, { call, put }) {
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
              total: data.pagination.total,
            },
          },
        })
      }
    },

    *'delete' ({ payload }, { call, put, select }) {
      const data = yield call(remove, { userId: payload })
      if (data.success) {
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },


    *create ({ payload }, { call, put }) {
      const data = yield call(create, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    *update ({ payload }, { select, call, put }) {
      const userId = yield select(({ sysUser }) => sysUser.currentItem.userId)
      const newUser = { ...payload, userId }
      const data = yield call(update, newUser)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },
    *queryRole ({ payload }, { call, put }) {
      const data = yield call(findRole)
      yield put({ type: 'change', payload: { roleList: data.data } })
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
    switchIsMotion (state) {
      localStorage.setItem(`${prefix}userIsMotion`, !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },

  },
})
