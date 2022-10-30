import type { NextPage } from 'next'
import React, { useState } from 'react'
import { ToTopOutlined, UserOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Avatar, Button, Dropdown, Menu, message } from 'antd'
import type { MenuProps } from 'antd'
import Login from 'components/Login'
import { useStore } from 'store/index'
import http from 'service/http'
import { observer } from 'mobx-react-lite'
import { navs } from './config'
import styles from './index.module.scss'
const Navbar: NextPage = () => {
  const [isShowLogin, setIsShowLogin] = useState(false)
  const { pathname, push } = useRouter()
  const store = useStore()
  const { userId } = store.user.userInfo
  const handleGotoEditorPage = () => {
    if (!userId) {
      message.warning('请先登录')
      return
    }
    push('/editor/new')
  }
  const handleLogin = () => {
    setIsShowLogin(true)
  }
  const handleClose = () => {
    setIsShowLogin(false)
  }
  const handleToHome = () => {
    push(`/user/${userId}`)
  }
  const onHandleLogout = async () => {
    const res: any = await http.get('/user/logout')
    if (res.code !== 200) {
      message.warning('退出登陆失败')
      return
    }
    store.user.setUserInfo({})
    message.success(res.message)
  }
  const AvatarMenu: NextPage = () => {
    // const { onHandleLogout, onHandleToHome } = props
    const items: MenuProps['items'] = [
      {
        key: '1',
        label: (
                    <a onClick={handleToHome}>
                        个人主页
                    </a>
        ),
        icon: <UserOutlined />,
      },
      {
        key: '2',
        label: (
                    <a onClick={onHandleLogout}>
                        退出登陆
                    </a>
        ),
        icon: <ToTopOutlined />,
      },
    ]
    const menu = (
            <Menu items={items} ></Menu>
    )
    return (
            <Dropdown overlay={menu} placement="bottom" arrow>
                <Avatar
                    icon={<UserOutlined />}
                    size={64}
                />
            </Dropdown>

    )
  }

  return (
    <div className={styles.navbar}>
      <section className={styles.logArea}>Blog-NaiGeLan</section>
      <section className={styles.linkArea}>
        {
          navs?.map(nav => (
            <Link legacyBehavior key={nav?.label} href={nav?.value}>
              <a className={pathname === nav?.value ? styles.active : ''}>{nav?.label}</a>
            </Link>
          ))
        }
      </section>
      <section className={styles.operateArea}>
        <Button onClick={handleGotoEditorPage} >写文章</Button>
          {
              userId
                ? (
                      <AvatarMenu/>
                  )
                : (
                  <Button type='primary' onClick={handleLogin} >登录</Button>
                  )
          }

      </section>
      <Login isShow={isShowLogin} onClose={handleClose}></Login>
    </div>
  )
}
export default observer(Navbar)
