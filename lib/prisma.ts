import { PrismaClient } from '@prisma/client'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'

const prismaClientSingleton = () => {
  const dbUrl = process.env.DATABASE_URL || 'mysql://root:@127.0.0.1:3306/db_business_asset_management_app';
  
  // Parse connection string
  const url = new URL(dbUrl);
  
  const adapter = new PrismaMariaDb({
    host: url.hostname || '127.0.0.1',
    port: url.port ? parseInt(url.port, 10) : 3306,
    user: url.username || 'root',
    password: decodeURIComponent(url.password || ''),
    database: url.pathname.replace(/^\//, ''),
    connectionLimit: 10
  });

  return new PrismaClient({ adapter });
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma
