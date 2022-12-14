import { withIronSessionApiRoute } from 'iron-session/next'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { ISession } from 'pages/api/index.d'
import { ironOptions } from 'config/index'
import { CODE } from 'utils/codeUtil'
import Result from 'utils/resUtil'
import { prisma } from 'db/index'
export default withIronSessionApiRoute(publish, ironOptions)

async function publish(req: NextApiRequest, res: NextApiResponse) {
  const session: ISession = req.session
  const { articleId = '', content = '' } = req.body
  const user = await prisma.user.findUnique({
    where: {
      id: session.userId,
    }
  })
  const article = await prisma.article.findUnique({
    where: {
      id: articleId,
    }
  })
  if (!article)
    return res.status(200).json(Result.fail(CODE.BUSINESS_ERROR, '未找到文章'))
  if (!user)
    return res.status(200).json(Result.fail(CODE.BUSINESS_ERROR, '未找到用户'))
  const comment = await prisma.comment.create({
    data: {
      content,
      updatedAt: new Date(),
      createdAt: new Date(),
      articleId,
      authorId: user.id,
    },
    include: {
      author: true,
      article: true,
    }
  })
  if(!comment)
    return res.status(200).json(Result.fail(CODE.BUSINESS_ERROR, '评论失败'))
  res.status(200).json(Result.success(CODE.SUCCESS, comment, '评论成功'))

}
