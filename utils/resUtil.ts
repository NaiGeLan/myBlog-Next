import { CODE } from './codeUtil'
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
  success(code: number = CODE.SUCCESS, data: any = '', message = '') {
    return {
      code, data, message,
    }
  },

  fail(code: number = CODE.BUSINESS_ERROR, message = '') {
    return {
      code,
      message,
    }
  },

}

export default utils
