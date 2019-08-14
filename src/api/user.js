import request from '@/utils/request'

export const login = ({
  mobile,
  code
}) => {
  return request.post('/app/v1_0/authorizations', {
    mobile,
    code
  })
}

/**
 * 拉黑作者
 */
export const blackUserList = (id) => {
  return request.post('/app/v1_0/user/blacklists', {
    target: id
  })
}

/**
 * 关注用户
 * @param {*} 用户的id
 */
export const followUser = (id) => {
  return request.post('/app/v1_0/user/followings', {
    target: id
  })
}

/**
 * 取消关注
 * @param {*} 用户的id 
 */
export const unFollowUser = (id) => {
  return request.delete(`/app/v1_0/user/followings/${id}`)
}


// 在刷新token的时候不能够使用request发送请求
// 因为request的请求拦截器中设置了token
// /**
//  * 刷新token
//  * @param {*} refreshToken 
//  */
// export const getToken = (refreshToken) => {
//   return request.put('/app/v1_0/authorizations')
// }
