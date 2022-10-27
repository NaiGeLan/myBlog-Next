import type { NextPage } from 'next'
import Footer from 'components/Footer'
import Navbar from 'components/Navbar'
const Layout: NextPage = ({ children }) => {
  return (
    <div>
      <Navbar></Navbar>
      <main>{children}</main>
      <Footer></Footer>
    </div>
  )
}

export default Layout
