import pathToRegexp from 'path-to-regexp'
import { get ,create,update} from '../services/news.js'
const queryString = require('query-string');
import { message } from 'antd';

export default {

  namespace: 'newsDetail',

  state: {
    item: {},
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(() => {
        dispatch({
              type: 'querySuccess',
              payload: {
                item: {},
              },

            })
            const match = pathToRegexp('/news/:id').exec(location.pathname)
            if (match) {
              const query = queryString.parse(location.search);
              if(query.type=='update'){
              dispatch({ type: 'query', payload: { newsId: match[1] } })
            }
          }

      })

    },
  },

  effects: {
    *'submit' ({ payload }, { call, put,select }) {
      const query = queryString.parse(location.search);
      var data
      if(query.type=='update'){
        const newsId = yield select(({ newsDetail }) => newsDetail.item.newsId)
        payload.currentItem.newsId=newsId
        data = yield call(update, payload.currentItem)
      }else{
        data = yield call(create, payload.currentItem)
      }
      if (data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            item: payload.currentItem,
          },

        })
        message.success('成功');

      } else {
        throw data
      }
    },
    *query ({
      payload,
    }, { call, put }) {
      yield put({
        type: 'querySuccess',
        payload: {
          item: {},
        },
      })
      const obj = yield call(get, payload)
      const { success, data } = obj
      if (success) {
        yield put({
          type: 'querySuccess',
          payload: {
            item: data,
          },
        })
      } else {
        throw data
      }
    },
  },

  reducers: {
    querySuccess (state, { payload }) {
      const { item } = payload
      return {
        ...state,
        item,
      }
    },
  },
}
