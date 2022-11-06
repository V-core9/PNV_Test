import React from "react"
import { GetServerSideProps } from "next"
import usersService from '../../services/users';
const { findUserByUsername } = usersService;

export const getServerSideProps: GetServerSideProps = async ({ params }: any) => {
  const user = await findUserByUsername(params.username);
  return ((!user) ? { notFound: true, } : { props: JSON.parse(JSON.stringify(user)), });
}

const SingleUserPage: React.FC<any> = (props = {}) => {
  let { id, username, email, createdAt, isAdmin, updatedAt } = props;
  return (
    <div>
      <p>ID: {id}</p>
      <h2>Username: {username}</h2>
      <p>email: {email}</p>
      <p>Created @ {createdAt}</p>
      <p>Updated @ {updatedAt}</p>
      <p>Admin: {isAdmin ? `✅` : `❌`}</p>
    </div>
  )
}

export default SingleUserPage;
