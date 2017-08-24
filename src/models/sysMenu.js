import modelExtend from 'dva-model-extend'
import { create, remove, update } from '../services/sysMenu'
import * as usersMenuService from '../services/sysMenu'
import { pageModel } from './common'
import { config } from '../utils'

const { query } = usersMenuService
const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'sysMenu',

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
        if (location.pathname === '/sys/menu') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
        }
      })
    },
  },

  effects: {
    *query ({ payload = {} }, { call, put }) {
      const data = yield call(query, payload)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            /* pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },*/
          },
        })
      }
    },

    *delete ({ payload }, { call, put, select }) {
      console.log(payload)
      const data = yield call(remove, { id: payload.currentItem.id })
      const { selectedRowKeys } = yield select(_ => _.sysMenu)
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload) } })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },


    *create ({ payload }, { select, call, put }) {
      payload.route = ''
      const creatItem = yield select(({ sysMenu }) => sysMenu.creatItem)
      if (creatItem.id != null) {
        payload.fid = creatItem.id
      }
      if (creatItem.route != null) {
        payload.route = creatItem.route
      }
      const data = yield call(create, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    *update ({ payload }, { select, call, put }) {
      const id = yield select(({ sysMenu }) => sysMenu.currentItem.id)
      const newUser = { ...payload, id }
      const data = yield call(update, newUser)
      console.log(data)
      if (data.success) {
        console.log(data)
        yield put({ type: 'mess', payload: data })
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

  },

  reducers: {

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
