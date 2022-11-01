import { withIronSessionApiRoute } from 'iron-session/next'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { ISession } from 'pages/api/index.d'
import { Cookie } from 'next-cookie'
import { setCookie } from 'utils/cookie'
import { ironOptions } from 'config/index'
import { CODE } from 'utils/codeUtil'
import Result from 'utils/resUtil'
import { prisma } from 'db/index'
export default withIronSessionApiRoute(login, ironOptions)

async function login(req: NextApiRequest, res: NextApiResponse) {
  const { phone = '', verify = '', identityType = 'phone' } = req.body
  const session: ISession = req.session
  const cookies = Cookie.fromApiRoute(req, res)
  // const userAuthRep = (await AppDataSource).getRepository(UserAuth)
  if (String(session.verifyCode) !== String(verify)) {
    res.status(200).json(Result.fail(CODE.USER_LOGIN_ERROR, '验证码不正确'))
    return
  }
  // 验证码正确 在userAuth表查找 identityType中是否有记录
  const userAuth = await prisma.auth.findFirst({
    where: {
      identityType: identityType,
      identifier: phone,
    }
  })
  if (userAuth) {
    // 已存在的用户
    const userId = userAuth.userId
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })
    console.log('已存在的用户', user)
    session.userId = user!.id
    session.nickname = user!.nickname
    session.job = user!.job
    session.introduce = user!.introduce
    console.log(session.nickname)
    await session.save()
    setCookie(cookies, { userId: user!.id, nickname:user!.nickname , avatar: user!.avatar })
    res.status(200).json(Result.success(200, user, '登陆成功'))
  }
  else {
    // 新用户 自动注册
    const user = await prisma.user.create({
      data:{ 
        nickname: `用户_${Math.floor(Math.random() * 10000)}`,
        avatar: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.N8u5YgZnruaJAcgAdm-oMwAAAA?w=162&h=180&c=7&r=0&o=5&pid=1.7',
        job: '暂无',
        introduce: '暂无',
        auth: {
          create: {
            identityType,
            identifier: phone,
            credential: verify
          }
        }
      }
    })
    console.log('新用户', user)
    session.userId = user.id
    // session.avatar = avatar
    session.nickname = user.nickname
    session.job = user.job
    session.introduce = user.introduce
    await session.save()
    res.status(200).json(Result.success(200, user, '注册成功'))
  }
}
