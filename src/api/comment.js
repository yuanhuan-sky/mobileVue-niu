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
  return request.get('/app/v1_0/comments', {
    params: {
      // a 是文章的评论，c 评论的评论
      type: isArticle ? 'a' : 'c',
      source,
      offset,
      limit
    }
  })
}

// 发布评论（文章、评论）
export const sendComment = ({
  // 文章的id，或者是评论的id
  target,
  content,
  // 当发送文章评论，不需要设置null
  // 当发送评论的评论，此时必须设置成文章的id
  artId
}) => {
  return request.post('/app/v1_0/comments', {
    target,
    content,
    art_id: artId
  })
}
