import request from '@/utils/axiosReq'

export function getParams(data) {
  return request({
    url: '/admin/params/get',
    method: 'get',
    data,
    isParams: true,
    isAlertErrorMsg: true,
  })
}

export function updateParams(data) {
  return request({
    url: '/admin/params/update',
    method: 'post',
    data,
    isAlertErrorMsg: true,
  })
}

export function delParams(data) {
  return request({
    url: '/admin/params/del',
    method: 'post',
    data,
    isAlertErrorMsg: true,
  })
}

export function getLog(data) {
  return request({
    url: '/admin/adminlog/get',
    method: 'get',
    data,
    isParams: true,
    isAlertErrorMsg: true,
  })
}
