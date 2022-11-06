import React from "react"
import Link from 'next/link';
import { GetServerSideProps } from "next"
import usersService from '../../../services/users';
const { listUsers, countUsers } = usersService;

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  // console.log(context);

  const users = JSON.parse(JSON.stringify(await listUsers({ ...context.query })));
  const total = await countUsers();

  const props: any = {
    ...context.query,
    users,
    total,
  }

  return ((!users || users.length === 0) ? { notFound: true, } : {
    props,
  });
}

const SingleUserPage: React.FC<any> = (props) => {
  const perPage = parseInt(props.perPage || 50);
  const users = props.users || [];
  const total = parseInt(props.total || 0);
  const page = parseInt(props.page || 1);
  const totalPages = Math.trunc(props.total / perPage);
  return (
    <div>
      <h2>🚇 List of users:</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '.25em', }}>
        {users.map((user: any) => (
          <Link key={user.id} href={`/users/${user.username}`}>
            <a style={{ color: 'white', display: 'flex', flexDirection: 'column', textDecoration: 'none', background: '#102030A0', border: '1px dashed #10203040', padding: '.25em .5em', gap: '.5em' }}>
              <h4 style={{ margin: 0 }}>👷‍♂️ {user.username}</h4>
              <p style={{ margin: 0 }}>📧 {user.email}</p>
              <small>🆔 {user.id} || ⌚ {user.createdAt}</small>
            </a>
          </Link>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: "1em", padding: ".25em 1em", border: '1px dashed #10203040', }}>
        {page > 1 && <>
          <Link href={`/users/list/?page=1${props.perPage !== undefined ? '&perPage=' + perPage : ''}`}>⏪ First</Link>
          <Link href={`/users/list/?page=${page - 1}${props.perPage !== undefined ? '&perPage=' + perPage : ''}`}>◀ Prev</Link>
        </>}
        <Link href="#">{page}</Link>
        {page < totalPages && <>
          <Link href={`/users/list/?page=${page + 1}${props.perPage !== undefined ? '&perPage=' + perPage : ''}`}>Next ▶</Link>
          <Link href={`/users/list/?page=${totalPages}${props.perPage !== undefined ? '&perPage=' + perPage : ''}`}>Last ⏩</Link>
        </>}
        Total {total}

        <p>PerPage [ {perPage} ]</p>
      </div>
    </div>
  )
}

export default SingleUserPage;
