import { withIronSessionApiRoute } from 'iron-session/next'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { ISession } from 'pages/api/index.d'
import { Cookie } from 'next-cookie'
import { setCookie } from 'utils/cookie'
import { ironOptions } from 'config/index'
import { CODE } from 'utils/codeUtil'
import Result from 'utils/resUtil'
import { AppDataSource } from 'db/index'
import { User, UserAuth } from 'db/entity'
export default withIronSessionApiRoute(login, ironOptions)
async function login(req: NextApiRequest, res: NextApiResponse) {
  const { phone = '', verify = '', identityType = 'phone' } = req.body
  const session: ISession = req.session
  const cookies = Cookie.fromApiRoute(req, res)
  const userAuthRep = (await AppDataSource).getRepository(UserAuth)
  if (String(session.verifyCode) !== String(verify)) {
    res.status(200).json(Result.fail(CODE.USER_LOGIN_ERROR, '验证码不正确'))
    return
  }
  // 验证码正确 在userAuth表查找 identityType中是否有记录
  const userAuth = await userAuthRep.findOne({
    where: {
      identityType,
      identifier: phone,
    },
    relations: ['user'],
  },
  )
  if (userAuth) {
    // 已存在的用户
    const user = userAuth.user
    const { id, nickname, avatar, job, introduce } = user
    console.log('已存在的用户', user)
    session.userId = id
    // session.avatar = avatar
    session.nickname = nickname
    session.job = job
    session.introduce = introduce
    console.log(session.nickname)
    await session.save()
    setCookie(cookies, { userId: id, nickname, avatar })
    res.status(200).json(Result.success(200, { id, nickname, avatar, job, introduce }, '登陆成功'))
  }
  else {
    // 新用户 自动注册
    const user = new User()
    user.nickname = `用户_${Math.floor(Math.random() * 10000)}`
    user.avatar = 'https://tse4-mm.cn.bing.net/th/id/OIP-C.N8u5YgZnruaJAcgAdm-oMwAAAA?w=162&h=180&c=7&r=0&o=5&pid=1.7'
    user.job = '暂无'
    user.introduce = '暂无'

    const userAuth = new UserAuth()
    userAuth.identifier = phone
    userAuth.identityType = identityType
    userAuth.credential = session.verifyCode
    userAuth.user = user

    const resUserAuth = await userAuthRep.save(userAuth)
    const { user: { id, nickname, avatar, job, introduce } } = resUserAuth
    session.userId = id
    // session.avatar = avatar
    session.nickname = nickname
    session.job = job
    session.introduce = introduce
    await session.save()
    res.status(200).json(Result.success(200, { id, nickname, avatar, job, introduce }, '注册成功'))
  }
}
