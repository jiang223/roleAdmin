import modelExtend from 'dva-model-extend'
import { create, remove, update, treeDate, updateFunction, getCheckMenu } from '../services/sysRole'
import { pageModel } from './common'
import { config } from '../utils'
import * as usersRoleService from '../services/sysRole'
const { query } = usersRoleService
const { prefix } = config
export default modelExtend(pageModel, {
  namespace: 'sysRole',
  state: {
    code:{},
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    isMotion: localStorage.getItem(`${prefix}userIsMotion`) === 'true',
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/sys/role') {
          dispatch({
            type: 'treeDate',
          })
          dispatch({
            type: 'query',
            payload: location.query,
          })
          dispatch({
            type: 'getCode',
            payload:{url:location.pathname },
          })
        }
      })
    },
  },

  effects: {
    *treeDate ({ payload = {} }, { call, put }) {
      const data = yield call(treeDate, payload)
      if (data) {
        yield put({
          type: 'treeDate2',
          payload: {
            treeDate: data.data,
          },
        })
      }
    },
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
              total: data.total,
            },
          },
        })
      }
    },
    *'delete' ({ payload }, { call, put, select }) {
      const data = yield call(remove, { id: payload })
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
    *updateFunctionShow ({ payload }, { select, call, put }) {
      const data = yield call(getCheckMenu, { roleId: payload.currentItem.id })
      yield put({ type: 'showTreeModal', payload: { state: { checkedKeys: data.data}, currentItem: payload.currentItem } })
    },
    *updateFunction ({ payload }, { select, call, put }) {
      const data = yield call(updateFunction, payload)
      yield put({ type: 'hideTreeModal' })
    },
    *update ({ payload }, { select, call, put }) {
      const id = yield select(({ sysRole }) => sysRole.currentItem.id)
      const newUser = { ...payload, id }
      const data = yield call(update, newUser)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

  },

  reducers: {
    showTreeModal (state, { payload }) {
      return { ...state, ...payload, modalVisible2: true }
    },
    hideTreeModal (state) {
      return { ...state, modalVisible2: false }
    },
    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },
    hideModal (state) {
      return { ...state, modalVisible: false }
    },
    treeDate2 (state, { payload }) {
      return { ...state, ...payload }
    },
    switchIsMotion (state) {
      localStorage.setItem(`${prefix}userIsMotion`, !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },

  },
})
