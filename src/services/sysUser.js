import { request, config } from '../utils'
const { sys } = config
const { sysUser } = sys

export async function query (params) {
  return request({
    url: sysUser,
    method: 'get',
    data: params,
  })
}
export async function create (params) {
  return request({
    url: sysUser.replace('/:id', ''),
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: sysUser,
    method: 'delete',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: sysUser,
    method: 'patch',
    data: params,
  })
}
