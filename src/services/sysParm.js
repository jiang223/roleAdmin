import { request, config } from '../utils'
const { sysParm } = config
const { sysParmUrl } = sysParm

export async function query (params) {
  return request({
    url: sysParmUrl,
    method: 'get',
    data: params,
  })
}
export async function create (params) {
  return request({
    url: sysParmUrl.replace('/:id', ''),
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: sysParmUrl,
    method: 'delete',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: sysParmUrl,
    method: 'patch',
    data: params,
  })
}
