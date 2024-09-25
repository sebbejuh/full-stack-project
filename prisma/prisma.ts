import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

const globalForPrisma = global as typeof global & { prisma?: PrismaClient };

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient();
  }
  prisma = globalForPrisma.prisma;
}

export default prisma;