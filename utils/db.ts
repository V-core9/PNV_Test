import { PrismaClient } from '@prisma/client'

const isDev = (process.env.NODE_ENV !== 'production');
declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var db: PrismaClient | undefined
}

const prismaOptions: any = isDev ? { log: ['query'], } : {};

const db = global.db || new PrismaClient(prismaOptions);

if (isDev) global.db = db;

export default db
