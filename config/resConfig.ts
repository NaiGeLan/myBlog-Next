// 通用工具函数
export const CODE = {
  SUCCESS: 200,
  PARAM_ERROR: 10001, // 参数错误
  USER_ACCOUNT_ERROR: 20001, // 账号密码错误
  USER_LOGIN_ERROR: 30001, // 用户未登陆
  BUSINESS_ERROR: 40001, // 业务请求失败
  AUTH_ERROR: 50001, // 认证失败或者TOKEN过期
}

const utils = {
  pager({ pageNum = 1, pageSize = 10 }) {
    pageNum *= 1
    pageSize *= 1
    const skipIndex = (pageNum - 1) * pageSize
    return {
      page: {
        pageNum,
        pageSize,
      },
      skipIndex,
    }
  },
  success(message = '', data = '', code = CODE.SUCCESS) {
    return {
      code, data, message,
    }
  },

  fail(message = '', code = CODE.BUSINESS_ERROR) {
    return {
      code,
      message,
    }
  },

}

export default utils
