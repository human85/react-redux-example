import request from '../utils/request'

export function getBillListApi() {
  return request()
}

export function saveBillApi(data) {
  return request({
    method: 'POST',
    data
  })
}
