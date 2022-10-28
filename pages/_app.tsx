import '../styles/globals.css'
// import type { AppProps } from 'next/app'
import type { NextPage } from 'next'
import { StoreProvider } from 'store/index'
import Layout from '../components/layout'
interface IProp {
  initialValue: Record<any, any>
  Component: NextPage
  pageProps: any
}

function App({ initialValue, Component, pageProps }: IProp) {
  return (
    <StoreProvider initialValue={initialValue}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StoreProvider>
  )
}

App.getInitialProps = async ({ ctx }: any) => {
  console.log('!!!!')
  console.log(ctx?.req.cookies)
  const { userId, nickname, avatar } = ctx.req.cookies
  return {
    initialValue: {
      user: {
        userInfo: {
          userId,
          nickname,
          avatar,
        },
      },
    },
  }
}

export default App
