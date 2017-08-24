import { color } from '../utils/theme'
const Mock = require('mockjs')
const config = require('../utils/config')
const menu = require('../utils/menu')
const { apiPrefix } = config

const treedate = [{
  label: 'Node1',
  value: '0-0',
  key: '0-0',
  children: [{
    label: 'Child Node1',
    value: '0-0-0',
    key: '0-0-0',
  }],
}, {
  label: 'Node2',
  value: '0-1',
  key: '0-1',
  children: [{
    label: 'Child Node3',
    value: '0-1-0',
    key: '0-1-0',
  }, {
    label: 'Child Node4',
    value: '0-1-1',
    key: '0-1-1',
  }, {
    label: 'Child Node5',
    value: '0-1-2',
    key: '0-1-2',
  }],
}]
const data = [{
  id: 1,
  roleName: 'sysRo;e',
  sort: 60,
  sfunction: 'add',
  route: 'add',
}, {
  id: 2,
  roleName: 'Joe Black',
  sort: 32,
  sfunction: 'Sidney No. 1 Lake Park',
}]

module.exports = {

  [`GET ${apiPrefix}/sysRole`] (req, res) {
    res.status(200).json({
      data,
    })
  },

  [`GET ${apiPrefix}/sysRole/treedate`] (req, res) {
    res.status(200).json({
      data: treedate,
    })
  },

  [`POST ${apiPrefix}/sysRole`] (req, res) {
    res.status(200).end()
  },
  [`PATCH ${apiPrefix}/sysRole`] (req, res) {
    res.status(200).json({
      mess: '更新成功',
    })
  },

}
