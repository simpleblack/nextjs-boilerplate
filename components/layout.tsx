import Footer from './footer'
import Header from './header'
import Meta from './meta'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Meta />
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center ">
        {children}
      </main>
      <Footer />
    </>
  )
}

export default Layout
