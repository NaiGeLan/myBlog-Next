import { format } from 'date-fns'
import md5 from 'md5'
import { encode } from 'js-base64'
import { withIronSessionApiRoute } from 'iron-session/next'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { ISession } from 'pages/api/index.d'
import { ironOptions } from 'config/index'
import { CODE } from 'utils/codeUtil'
import Result from 'utils/resUtil'
import http from 'service/http'
export default withIronSessionApiRoute(sendVerifyCode, ironOptions)
async function sendVerifyCode(req: NextApiRequest, res: NextApiResponse) {
  const session: ISession = req.session
  const { to = '', templateId = '1' } = req.body
  const AccountId = '8a216da883c633c6018418743fc30f8e'
  const AuthToken = 'e343fcd76c784289884bf40f06401dc3'
  const appId = '8a216da883c633c60184187440c00f95'
  const NowDate = format(new Date(), 'yyyyMMddHHmmss')
  const SigParameter = md5(`${AccountId}${AuthToken}${NowDate}`)
  const Authorization = encode(`${AccountId}:${NowDate}`)
  const url = `https://app.cloopen.com:8883/2013-12-26/Accounts/${AccountId}/SMS/TemplateSMS?sig=${SigParameter}`
  const verifyCode = Math.floor(Math.random() * (9999 - 1000)) + 1000
  const expireMinute = '5'
  const data = {
    to,
    appId,
    templateId,
    datas: [verifyCode, expireMinute],
  }
  const { statusCode, statusMsg }: any = await http.post(url, data, {
    headers: {
      Authorization,
    },
  })
  console.log({ statusCode, statusMsg })
  if (statusMsg) {
    session.verifyCode = verifyCode
    await session.save()
    res.status(200).json(
      Result.success(CODE.SUCCESS, 'success', statusMsg),
    )
  }
  else {
    session.verifyCode = verifyCode
    await session.save()
    res.status(200).json(
      Result.fail(CODE.BUSINESS_ERROR, statusMsg),
    )
  }
}
