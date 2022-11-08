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
  findUserByUsername: (username: string) => Promise<UserBase | null>,
  updateUser: (args: UserBase) => Promise<UserBase>,
  createUserByEmailAndPassword: (UserBase) => Promise<UserBase | Error>,
  countUsers: () => Promise<Number>,
}


export interface AuthJWT {
  accessToken: string,
  refreshToken: string,
}
