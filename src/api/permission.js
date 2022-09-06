import request from '@/utils/axiosReq'

export function getRole(data) {
  return request({
    url: '/admin/role/get',
    method: 'get',
    data,
    isParams: true,
  })
}

export function getAdm(data) {
  return request({
    url: '/admin/adm/get',
    method: 'get',
    data,
    isParams: true,
  })
}

export function addAdm(data) {
  return request({
    url: '/admin/adm/add',
    method: 'post',
    data,
    isAlertErrorMsg: true,
  })
}

export function updateAdm(data) {
  return request({
    url: '/admin/adm/update',
    method: 'post',
    data,
    isAlertErrorMsg: true,
  })
}

export function delAdm(data) {
  return request({
    url: '/admin/adm/del',
    method: 'post',
    data,
    isAlertErrorMsg: true,
  })
}

export function getPer(data) {
  return request({
    url: '/admin/per/get',
    method: 'get',
    data,
    isParams: true,
    isAlertErrorMsg: true,
  })
}

export function addRole(data) {
  return request({
    url: '/admin/role/add',
    method: 'post',
    data,
    isAlertErrorMsg: true,
  })
}

export function updateRole(data) {
  return request({
    url: '/admin/role/update',
    method: 'post',
    data,
    isAlertErrorMsg: true,
  })
}

export function delRole(data) {
  return request({
    url: '/admin/role/del',
    method: 'post',
    data,
    isAlertErrorMsg: true,
  })
}
