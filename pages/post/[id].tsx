import type { NextPage } from 'next'
import Layout from '../../components/layout'
import { useRouter } from 'next/router'

const Index: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <Layout>
      <h1 className="text-6xl font-bold">post {id}</h1>
    </Layout>
  )
}

export default Index

