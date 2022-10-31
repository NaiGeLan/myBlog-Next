import { IronSession } from "iron-session";
import { IUserInfo } from 'store/userStore'
export type ISession = IronSession & Record<string, any>

export type IArticle = {
  id: number
  title: string
  content: string
  creatTime: Date
  updateTime: Date
  views: number
  user: IUserInfo
}