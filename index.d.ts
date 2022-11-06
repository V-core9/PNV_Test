export interface UserBase {
  id?: string,
  email: string,
  username?: string,
  password?: string,
  isAdmin?: boolean,
}


export interface UsersService {
  listUsers: (params: unknown) => UserBase[],
  findUserByEmail: (email: string) => UserBase,
  findUserById: (id: string) => UserBase,
  updateUser: (args: UserBase) => Promise<UserBase>,
  createUserByEmailAndPassword: (UserBase) => Promise<UserBase | Error>
}


export interface AuthJWT {
  accessToken: string,
  refreshToken: string,
}
