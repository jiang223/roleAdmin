import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import  {getCode} from  '../services/app'
const model = {
  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}

const pageModel = modelExtend(model, {

  state: {
    list: [],
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `Total ${total} Items`,
      current: 1,
      total: 0,
    },
  },

  effects: {
    *mess ({ payload }) {
      message.success(payload.message)
    },
    *getCode ({ payload = {} }, { call, put }) {
      const data = yield call(getCode, payload)
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            code:data.data,
          },
        })
      }
    }
  },
  reducers: {
    querySuccess (state, { payload }) {
      const { list, pagination } = payload
      return {
        ...state,
        list,
        pagination: {
          ...state.pagination,
          ...pagination,
        },
      }
    },
  },

})


module.exports = {
  model,
  pageModel,
}
