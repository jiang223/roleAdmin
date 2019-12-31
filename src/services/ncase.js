import { request, config } from '../utils'
const { ncase } = config
const { ncaseUrl } = ncase

export async function query (params) {
  return request({
    url: ncaseUrl,
    method: 'get',
    data: params,
  })
}
export async function create (params) {
  return request({
    url: ncaseUrl.replace('/:id', ''),
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: ncaseUrl,
    method: 'delete',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: ncaseUrl,
    method: 'patch',
    data: params,
  })
}
