import request from '@/utils/request'

/**
 * 获取搜索建议
 * @param {*} q
 */
export const getSuggestions = (q) => {
  return request.get('/app/v1_0/suggestion', {
    params: {
      q
    }
  })
}
