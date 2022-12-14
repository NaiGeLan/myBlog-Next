import { withIronSessionApiRoute } from 'iron-session/next'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ironOptions } from 'config/index'
import { CODE } from 'utils/codeUtil'
import Result from 'utils/resUtil'
import { prisma } from 'db/index'
export default withIronSessionApiRoute(update, ironOptions)

async function update(req: NextApiRequest, res: NextApiResponse) {
  const { title = '', content = '', articleId = '' } = req.body
  // const articleRep = (await AppDataSource).getRepository(Article)
  const article = await prisma.article.findUnique({
    where: {
      id: Number(articleId),
    },
    include: {
      author: true,
    },
  })
  if(!article)
    return res.status(200).json(Result.fail(CODE.BUSINESS_ERROR, '文章不存在'))

  article.title = title
  article.content = content
  article.updatedAt = new Date()
  const articleRes = await prisma.article.update({
    where: {
      id: Number(articleId),
    },
    data: {
      title,
      content,
    }
  })
  if (!articleRes)
     return res.status(200).json(Result.fail(CODE.BUSINESS_ERROR, '更新失败'))
  res.status(200).json(Result.success(CODE.SUCCESS, articleRes, '更新成功'))  
}
