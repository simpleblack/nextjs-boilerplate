import type { NextPage } from 'next'
import Layout from '../components/layout'

const Index: NextPage = () => {
  return (
    <Layout>
      <h1 className="text-6xl font-bold">
        Welcome to
      </h1>
      <br />
      <h1 className="text-6xl font-bold">
        <a className="text-blue-600" href="https://nextjs.org">
          Tailwind and Graphql with Next.js
        </a>
      </h1>
      <br />
      <h1 className="text-6xl font-bold">
        Boilerplate!
      </h1>
    </Layout>
  )
}

export default Index

