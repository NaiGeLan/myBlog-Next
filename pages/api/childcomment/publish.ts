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
  const { commentId = '', content = '', commentToId = '' } = req.body
  console.log('commentId', commentId);
  
  const user = await prisma.user.findUnique({
    where: {
      id: session.userId,
    }
  })
  const comment = await prisma.comment.findUnique({
    where: {
      id: commentId,
    }
  })
  if (!comment)
    return res.status(200).json(Result.fail(CODE.BUSINESS_ERROR, '未找到评论'))
  if (!user)
    return res.status(200).json(Result.fail(CODE.BUSINESS_ERROR, '未找到用户'))
  const childcomment = await prisma.childComment.create({
    data: {
      content,
      commentId: commentId,
      updatedAt: new Date(),
      createdAt: new Date(),
      commentToId: commentToId,
      authorId: user.id,
    },
    include: {
      author: true,
    }
  })
  if(!comment)
    return res.status(200).json(Result.fail(CODE.BUSINESS_ERROR, '评论失败'))
  res.status(200).json(Result.success(CODE.SUCCESS, childcomment, '评论成功'))

}
