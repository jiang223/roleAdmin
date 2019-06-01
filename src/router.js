import React from 'react'
import PropTypes from 'prop-types'
import { Router } from 'dva/router'
import App from './routes/app'

const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
}

const Routers = function ({ history, app }) {
  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute (nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/user'))
          cb(null, { component: require('./routes/user') })
        }, 'dashboard')
      },
      childRoutes: [
        {
          path: 'dashboard',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/dashboard'))
              cb(null, require('./routes/dashboard/'))
            }, 'dashboard')
          },
        },
       /* {
          path: 'menuss',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/menuss'))
              cb(null, require('./routes/menuss/'))
            }, 'treetable')
          },
        },*/
        {
          path: 'sys/menu',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/sysMenu'))
              cb(null, require('./routes/sysMenu/'))
            }, 'treetable')
          },
        },
        {
          path: 'user',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/user'))
              cb(null, require('./routes/user/'))
            }, 'user')
          },
        },
        {
          path: 'news',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/news'))
              cb(null, require('./routes/news'))
            }, 'news')
          },
        },
        {
          path: 'ncase',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/ncase'))
              cb(null, require('./routes/ncase'))
            }, 'ncase')
          },
        },
        {
          path: 'news/:id',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/newsdetail'))
              cb(null, require('./routes/news/ueditor'))
            }, 'newsDetail')
          },
        },
        {
          path: 'sys/user',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/sysUser'))
              cb(null, require('./routes/sysUser/'))
            }, 'sysUser')
          },
        },
        {
          path: 'sys/parm',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/sysParm'))
              cb(null, require('./routes/sysParm/'))
            }, 'sysParm')
          },
        },
        {
          path: 'sys/role',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/sysRole'))
              cb(null, require('./routes/sysRole/'))
            }, 'sysRole')
          },
        },
        {
          path: 'login',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/login'))
              cb(null, require('./routes/login/'))
            }, 'login')
          },
        },
      /*  {
          path: 'request',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/request/'))
            }, 'request')
          },
        },*/
        {
          path: 'UIElement/iconfont',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/UIElement/iconfont/'))
            }, 'UIElement-iconfont')
          },
        }, {
          path: 'UIElement/search',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/UIElement/search/'))
            }, 'UIElement-search')
          },
        }, {
          path: 'UIElement/dropOption',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/UIElement/dropOption/'))
            }, 'UIElement-dropOption')
          },
        }, {
          path: 'UIElement/layer',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/UIElement/layer/'))
            }, 'UIElement-layer')
          },
        }, {
          path: 'UIElement/dataTable',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/UIElement/dataTable/'))
            }, 'UIElement-dataTable')
          },
        }, {
          path: 'UIElement/editor',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/UIElement/editor/'))
            }, 'UIElement-editor')
          },
        }, {
          path: 'chart/lineChart',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/chart/lineChart/'))
            }, 'chart-lineChart')
          },
        }, {
          path: 'chart/barChart',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/chart/barChart/'))
            }, 'chart-barChart')
          },
        }, {
          path: 'chart/areaChart',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/chart/areaChart/'))
            }, 'chart-areaChart')
          },
        }, {
          path: 'post',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/post'))
              cb(null, require('./routes/post/'))
            }, 'post')
          },
        },
        {
          path: '*',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/error/'))
            }, 'error')
          },
        },
      ],
    },
  ]

  return <Router history={history} routes={routes} />
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
