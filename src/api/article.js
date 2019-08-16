import request from '@/utils/request'

/**
 * 获取文章
 */
export const getUserArticles = ({
  channelId,
  timestamp = Date.now(),
  withTop = 1
}) => {
  return request.get('/app/v1_1/articles', {
    params: {
      channel_id: channelId,
      timestamp: timestamp,
      with_top: withTop
    }
  })
}

/**
 * 不喜欢文章
 */
export const dislikeArticle = (id) => {
  return request.post('/app/v1_0/article/dislikes', {
    target: id
  })
}

/**
 * 举报文章
 */
export const reportArticle = ({
  // 文章的id
  id,
  // 举报类型： 0-其他问题，1-标题夸张，2-低俗色情，3-错别字多，4-旧闻重复，5-广告软文，6-内容不实，7-涉嫌违法犯罪，8-侵权'
  type
}) => {
  return request.post('/app/v1_0/article/reports', {
    target: id,
    type: type
  })
}

/**
 * 获取文章详情
 * @param {*} id 文章的id
 */
export const getArticle = (id) => {
  return request.get(`/app/v1_0/articles/${id}`)
}


// 用户对文章的态度, -1: 无态度，0-不喜欢，1-点赞
// 点赞
export const likeArticle = (id) => {
  return request.post('/app/v1_0/article/likings', {
    target: id
  })
}

// 不喜欢
export const disLikeArticle = (id) => {
  return request.post('/app/v1_0/article/dislikes', {
    target: id
  })
}
