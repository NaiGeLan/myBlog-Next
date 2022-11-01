import { withIronSessionApiRoute } from 'iron-session/next'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { ISession } from 'pages/api/index.d'
import { ironOptions } from 'config/index'
import { CODE } from 'utils/codeUtil'
import Result from 'utils/resUtil'
import { AppDataSource } from 'db/index'
import { Article, User, Comment } from 'db/entity'
export default withIronSessionApiRoute(publish, ironOptions)

async function publish(req: NextApiRequest, res: NextApiResponse) {
  const session: ISession = req.session
  const { articleId = '', content = '' } = req.body
  const userRep = (await AppDataSource).getRepository(User)
  const articleRep = (await AppDataSource).getRepository(Article)
  const commentRep = (await AppDataSource).getRepository(Comment)
  const user = await userRep.findOne({
    where: {
      id: session.userId,
    }
  })
  const article = await articleRep.findOne({
    where: {
      id: articleId,
    }
  })
  if (!article)
    return res.status(200).json(Result.fail(CODE.BUSINESS_ERROR, '未找到文章'))
  if (!user)
    return res.status(200).json(Result.fail(CODE.BUSINESS_ERROR, '未找到用户'))
  const comment = new Comment()
  comment.updateTime = new Date()
  comment.createTime = new Date()
  comment.content = content
  comment.user = user
  const commentRes = await commentRep.save(comment)
  if(!commentRes)
    return res.status(200).json(Result.fail(CODE.BUSINESS_ERROR, '评论失败'))
  res.status(200).json(Result.success(CODE.SUCCESS, commentRes, '评论成功'))

}
