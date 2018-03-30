const APIV1 = '/api/v1'
const APIV2 = '/api/v2'

module.exports = {
  name: 'AntD Admin',
  prefix: 'antdAdmin',
  footerText: 'Ant Design Admin  © 2017 zuiidea',
  logo: '/logo.png',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  YQL: ['http://www.zuimeitianqi.com'],
  CORS: ['http://localhost:8080'],
  openPages: ['/login'],
  apiPrefix: '/api/v1',
  api: {
    userLogin: `/api/v2/user/login`,
    userLogout: `/api/v2/user/logout`,
    userInfo: `${APIV1}/userInfo`,
    users: `${APIV1}/users`,
    commoditys: `/api/v2/commoditys`,
    posts: `${APIV1}/posts`,
    menuss: `${APIV1}/menuss/array`,
    user: `/api/v2/user/:id`,
    commodity: `${APIV1}/commodity/:id`,
    dashboard: `${APIV1}/dashboard`,
    v1test: `${APIV1}/test`,
    v2test: `/api/v2/test`,
  },
  sys: {
    sysMenuPage: `/api/v2/sysMenu`,
    sysMenu: `/api/v2/sysMenu`,
    sysRole: `/api/v2/sysRole`,
    sysUser: `/api/v2/sysUser`,
  },
}
