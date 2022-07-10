import type { GetServerSideProps, NextPage } from 'next'
import Layout from '../../components/layout'
import { useRouter } from 'next/router'
import { useGetUsersLazy } from 'features/user/hooks/user.hook'
import { initializeApollo } from 'core/client/apollo'
import { FetchUsersDocument } from 'generated/graphql'
import { FC } from 'react'
import { User } from 'features/user/types/user'

const Index: FC<{
  items: User[];
}> = ({ items }) => {

  return (
    <Layout>
      <h1 className="text-6xl font-bold">User List</h1>
      <table className="table-auto">
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>age</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            return <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.age.toString()}</td>
            </tr>
          })}
        </tbody>
      </table>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const apolloClient = initializeApollo({}, '');
  const { data } = await apolloClient.query({
    query: FetchUsersDocument,
    variables: {

    },
  });

  return {
    props: {
      items: data?.items,
    },
  };
};

export default Index

