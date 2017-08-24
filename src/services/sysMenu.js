import { request, config } from '../utils'
const { sys } = config
const { sysMenuPage, sysMenu } = sys

export async function query (params) {
  return request({
    url: sysMenuPage,
    method: 'get',
    data: params,
  })
}
export async function create (params) {
  return request({
    url: sysMenu,
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: sysMenu,
    method: 'delete',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: sysMenu,
    method: 'patch',
    data: params,
  })
}
