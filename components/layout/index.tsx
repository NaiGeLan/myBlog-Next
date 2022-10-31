// import type { NextPage } from 'next'
import Navbar from 'components/Navbar'
// import Footer from 'components/Footer'
import styles from './index.module.scss'
const Layout = ({ children }: any) => {
  return (
    <div className={styles.container}>
      <Navbar/>
      <main>{children}</main>
      {/* <Footer /> */}
    </div>
  )
}

export default Layout
