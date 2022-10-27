import type { NextPage } from 'next'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Button } from 'antd'
import Login from 'components/Login'
import { navs } from './config'
import styles from './index.module.scss'
const Navbar: NextPage = () => {
  const { pathname } = useRouter()
  const [isShowLogin, setIsShowLogin] = useState(false)
  const handleGotoEditorPage = () => {
    console.log('toeditor')
  }
  const handleLogin = () => {
    console.log('login')
    setIsShowLogin(true)
  }
  const handleClose = () => {
    setIsShowLogin(false)
  }
  return (
    <div className={styles.navbar}>
      <section className={styles.logArea}>BLOG</section>
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
        <Button onClick={handleGotoEditorPage}>写文章</Button>
        <Button type='primary' onClick={handleLogin}>登录</Button>
      </section>
      <Login isShow={isShowLogin} onClose={handleClose}></Login>
    </div>
  )
}
export default Navbar
