import type { NextPage } from 'next'
import Link from 'next/link';
import { UserBase } from '../../';
import usersService from '../../services/users';
const { listUsers } = usersService;

export async function getStaticProps() {
  const users = await listUsers({ perPage: 10 });

  console.log(users);

  return {
    props: {
      users: JSON.parse(JSON.stringify(users))
    }
  }
}

const UsersList: NextPage<any> = ({ users }: { users: UserBase[] }) => {
  return (
    <div>
      <h2>List of users [{users.length}]:</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '.35em', }}>
        {users.map((user: any) => (
          <Link key={user.id} href={`/users/${user.username}`}>{user.email}</Link>
        ))}
      </div>
      <Link href='/users/list'>List</Link>
    </div>
  )
}

export default UsersList;
