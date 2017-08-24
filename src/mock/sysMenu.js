import { color } from '../utils/theme'
const Mock = require('mockjs')
const config = require('../utils/config')
const menu = require('../utils/menu')
const { apiPrefix } = config

const data = [{
  id: 1,
  name: 'sysRo;e',
  sort: 60,
  method: 'add',
  route: 'add',
  children: [{
    id: 11,
    name: 'John Brown',
    sort: 42,
    method: 'New York No. 2 Lake Park',
  }, {
    id: 12,
    name: 'John Brown     dfdsf  jr.',
    sort: 30,
    method: 'New York No. 3 Lake Park',
    children: [{
      id: 121,
      name: 'Jimmy Brown',
      sort: 16,
      method: 'New York No. 3 Lake Park',
    }],
  }, {
    id: 13,
    name: 'Jim Green sr.',
    sort: 72,
    method: 'London No. 1 Lake Park',
    children: [{
      id: 131,
      name: 'Jim Green',
      sort: 42,
      method: 'London No. 2 Lake Park',
      children: [{
        id: 1311,
        name: 'Jim Green jr.',
        sort: 25,
        method: 'London No. 3 Lake Park',
      }, {
        id: 1312,
        name: 'Jimmy Green sr.',
        sort: 18,
        method: 'London No. 4 Lake Park',
      },

      ],
    }],
  }],
}, {
  id: 2,
  name: 'Joe Black',
  sort: 32,
  method: 'Sidney No. 1 Lake Park',
}]

module.exports = {
  [`GET ${apiPrefix}/sysMenu`] (req, res) {
    res.status(200).json({
      data,
    })
  },

  [`POST ${apiPrefix}/sysMenu`] (req, res) {
    res.status(200).end()
  },
  [`PATCH ${apiPrefix}/sysMenu`] (req, res) {
    res.status(200).json({
      mess: '更新成功',
    })
  },

}
