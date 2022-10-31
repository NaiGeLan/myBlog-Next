import '../styles/globals.css'
import type { NextPage } from 'next'
import { StoreProvider } from '../store'
import Layout from 'components/layout'
interface IProp {
  initialValue: Record<any, any>
  Component: NextPage
  pageProps: any
}

function App({ initialValue, Component, pageProps }: IProp) {
  const renderLayout = () => {
    if ((Component as any).layout === null) {
      return (
          <Component {...pageProps}></Component>
      )
    }
    else {
      return (
          <Layout>
            <Component {...pageProps} />
          </Layout>
      )
    }
  }

  return (
    <StoreProvider initialValue={initialValue}>
      {renderLayout()}
    </StoreProvider>
  )
}

App.getInitialProps = async ({ ctx }: { ctx: any }) => {
  const { userId, nickname, avatar } = ctx?.req?.cookies || {}
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
