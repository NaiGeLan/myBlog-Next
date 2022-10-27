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
  success(code: number = CODE.SUCCESS, data = '', msg = '') {
    return {
      code, data, msg,
    }
  },

  fail(code: number = CODE.BUSINESS_ERROR, msg = '') {
    return {
      code,
      msg,
    }
  },

}

export default utils
