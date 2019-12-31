import { request, config } from '../utils'
const { news } = config
const { newsUrl } = news

export async function query (params) {
  return request({
    url: newsUrl,
    method: 'get',
    data: params,
  })
}
export async function get (params) {
  return request({
    url: newsUrl+"/get",
    method: 'get',
    data: params,
  })
}
export async function create (params) {
  return request({
    url: newsUrl,
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: newsUrl,
    method: 'delete',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: newsUrl,
    method: 'patch',
    data: params,
  })
}
