import { withIronSessionApiRoute } from 'iron-session/next'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { ISession } from 'pages/api/index.d'
import { Cookie } from 'next-cookie'
import { ironOptions } from 'config/index'
import { CODE } from 'utils/codeUtil'
import Result from 'utils/resUtil'
import { clearCookie } from 'utils/cookie'

export default withIronSessionApiRoute(logout, ironOptions)

async function logout(req: NextApiRequest, res: NextApiResponse) {
  const session: ISession = req.session
  const cookies = Cookie.fromApiRoute(req, res)
  await session.destroy()
  clearCookie(cookies)
  res.status(200).json(
    Result.success(CODE.SUCCESS, '', '退出登陆成功'),
  )
}
