export interface IUserInfo {
  userId?: number | null
  nickname?: string
  avatar?: string
  id?: number
}

export interface IUserStore {
  userInfo: IUserInfo

  setUserInfo: (value: IUserInfo) => void
}

const userStore = (): IUserStore => {
  return {
    userInfo: {},
    setUserInfo(value) {
      this.userInfo = value
    },
  }
}

export default userStore
