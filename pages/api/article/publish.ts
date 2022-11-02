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
  const { title = '', content = '' } = req.body
  // const userRep = (await AppDataSource).getRepository(User)
  // const articleRep = (await AppDataSource).getRepository(Article)
  // const article = new Article()
  const user = await prisma.user.findUnique({
    where: {
      id: session.userId,
    },
  })
  const article = await prisma.article.create({
    data: {
        title,
        content,
        views: 0,
        author: {
          connect: {
              id: user!.id
          }
        }
    },
    include: {
      author: true
    }
  })
  if (!article)
    return res.status(200).json(Result.fail(CODE.BUSINESS_ERROR, '发布失败'))
  res.status(200).json(Result.success(CODE.SUCCESS, article, '发布成功'))
}
