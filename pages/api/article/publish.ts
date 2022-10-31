import { withIronSessionApiRoute } from 'iron-session/next'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { ISession } from 'pages/api/index.d'
import { ironOptions } from 'config/index'
import { CODE } from 'utils/codeUtil'
import Result from 'utils/resUtil'
import { AppDataSource } from 'db/index'
import { Article, User } from 'db/entity'
export default withIronSessionApiRoute(publish, ironOptions)

async function publish(req: NextApiRequest, res: NextApiResponse) {
  const session: ISession = req.session
  const { title = '', content = '' } = req.body
  const userRep = (await AppDataSource).getRepository(User)
  const articleRep = (await AppDataSource).getRepository(Article)
  const article = new Article()
  const user = await userRep.findOne({
    where: {
      id: session.userId,
    },
  })

  article.title = title
  article.content = content
  article.updateTime = new Date()
  article.createTime = new Date()
  article.isDelete = false
  article.views = 0
  if (user)
    article.user = user
  const articleRes = await articleRep.save(article)
  if (!articleRes)
    return res.status(200).json(Result.fail(CODE.BUSINESS_ERROR, '发布失败'))
  res.status(200).json(Result.success(CODE.SUCCESS, articleRes, '发布成功'))
}
