export const SEQUELIZE = 'SEQUELIZE';

export const HTTP_OK_STRING = 'ok';

export enum ERROR_MESSAGES {
  Unauthenticated = 'Invalid username and or password',
  Unauthorized = 'Insufficient permission for this request',
  UserIdNotSupplied = 'UserId Not Supplied in header',
  SequelizeDatabaseError = 'SequelizeDatabaseError',
  InternalServerError = 'Internal Server Error',
}

export const USER_HEADERS = [
  { name: 'email', description: 'email' },
  { name: 'password', description: 'password' },
]

export const JWT_HEADERS = [
  { name: 'token', description: 'token' }
]
