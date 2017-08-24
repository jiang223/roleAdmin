import { request, config } from '../utils'
const { sys } = config
const { sysRole, sysMenu } = sys

export async function query (params) {
  return request({
    url: sysRole,
    method: 'get',
    data: params,
  })
}
export async function getCheckMenu (params) {
  return request({
    url: `${sysRole}/getCheckMenu`,
    method: 'get',
    data: params,
  })
}
export async function findRole (params) {
  return request({
    url: `${sysRole}/findRole`,
    method: 'get',
  })
}
export async function treeDate (params) {
  return request({
    url: sysMenu,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: sysRole,
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: sysRole,
    method: 'delete',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: sysRole,
    method: 'patch',
    data: params,
  })
}
export async function updateFunction (params) {
  return request({
    url: `${sysRole}/updateFunction`,
    method: 'patch',
    data: params,

  })
}
