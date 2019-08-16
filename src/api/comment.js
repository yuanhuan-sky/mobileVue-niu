import request from '@/utils/request'

// 获取文章或者评论的回复
export const getComments = ({
  isArticle = true,
  // 文章或者评论的id
  source,
  // 做分页使用，记录最后一条数据的id，初次使用的时候传null
  offset = null,
  // 获取几条数据
  limit = 10
}) => {
  return request.get('', {
    params: {
      // a 是文章的评论，c 评论的评论
      type: isArticle ? 'a' : 'c',
      source,
      offset,
      limit
    }
  })
}
