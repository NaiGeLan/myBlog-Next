import type { NextPage } from 'next'
import Footer from 'components/Footer'
import Navbar from 'components/Navbar'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const Layout: NextPage = ({ children }) => {
  return (
    <div>
      <Navbar/>
      <main>{children}</main>
      <Footer/>
    </div>
  )
}

export default Layout
