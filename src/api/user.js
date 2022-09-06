import request from '@/utils/axiosReq'

export function getCaptcha() {
  return request({
    url: '/admin/captcha',
    method: 'get',
    isAlertErrorMsg: true,
  })
}

export function getGoogleInfo() {
  return request({
    url: '/admin/sys/params',
    method: 'get',
    isAlertErrorMsg: true,
  })
}

export function genGoogleInfo() {
  return request({
    url: '/admin/ga/gen',
    method: 'get',
    isAlertErrorMsg: true,
  })
}

export function login(data) {
  return request({
    url: '/admin/check',
    data,
    method: 'post',
    bfLoading: false,
    isParams: false,
    isJSON: false,
    isAlertErrorMsg: false,
  })
}

export function logoutReq() {
  return request({
    url: '/admin/logout',
    method: 'get',
    isAlertErrorMsg: true,
  })
}

export function updatePassword(data) {
  return request({
    url: '/admin/cpw',
    method: 'post',
    data,
    isAlertErrorMsg: true,
  })
}

export function readMessage() {
  return request({
    url: '/admin/message/get',
    method: 'get',
    isAlertErrorMsg: false,
  })
}

export function updateMessage(data) {
  return request({
    url: '/admin/message/update',
    method: 'post',
    data,
    isAlertErrorMsg: true,
  })
}
