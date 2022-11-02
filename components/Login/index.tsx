import { useStore } from 'store/index'
import { useState } from 'react'
import CountDown from 'components/CountDown'
import http from 'service/http'
import { message } from 'antd'
import { observer } from 'mobx-react-lite'
import styles from './index.module.scss'
interface IProp {
  isShow: boolean
  onClose: Function
}
const Login = (props: IProp) => {
  const store = useStore()
  const { isShow = false, onClose } = props
  const [formData, setFormData] = useState({
    phone: '',
    verify: '',
  })
  const [isShowVerifyCode, setIsShowVerifyCode] = useState(false)
  // 获取验证码
  const handleGetVerifyCode = async () => {
    if (!formData.phone) {
      message.warning('请输入手机号')
      return
    }
    const data = {
      to: formData.phone,
      templateId: 1,
    }
    const res: any = await http.post('/user/sendVerifyCode', data)
    if (res.code === 200) {
      setIsShowVerifyCode(true)
      message.success('验证码已经发向您的手机')
    }
    else { return }
    setIsShowVerifyCode(true)
  }
  const handleClose = () => onClose()
  const handleFormChange = (e: any) => {
    const { name, value } = e!.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }
  const handleCountDownEnd = () => setIsShowVerifyCode(false)
  const handleLogin = async () => {
    const data = {
      ...formData,
      identityType: 'phone',
    }
    const res: any = await http.post('/user/login', data)
    if (res?.code === 200) {
      // 登陆成功
      console.log(res)
      message.success(res?.message)
      store.user.setUserInfo({
        userId: res.data.id,
        avatar: res.data.avatar,
        nickname: res.data.nickname,
      })
      handleClose()
    }
  }
  return (
    isShow
      ? <div className={styles.loginArea}>
      <div className={styles.loginBox}>
        <div className={styles.loginTitle}>
            <div>手机号登录</div>
            <div className={styles.close} onClick={handleClose}>x</div>
        </div>
        <input name='phone' type='text' placeholder='请输入手机号' value={formData.phone} onChange={handleFormChange}></input>
        <div className={styles.verifyCodeArea}>
          <input name='verify' type='text' placeholder='请输入验证码' value={formData.verify} onChange={handleFormChange}></input>
          <span className={styles.getVerifyCode} onClick={handleGetVerifyCode}>
            {isShowVerifyCode ? <CountDown time = {60} onEnd={ handleCountDownEnd } /> : '获取验证码' }
          </span>
        </div>
        <div className={styles.loginBtn} onClick={handleLogin}>登陆</div>
        <div className={styles.otherLogin}>使用GitHub登陆</div>
        <div className={styles.loginPrivacy}>
          注册登陆即表示同意
          <a href="https://www.icourse163.org/about/contactus.htm#/contactus?type=5" target='_blank' rel="noreferrer">隐私政策</a>
        </div>
      </div>
    </div>
      : null
  )
}
export default observer(Login)
