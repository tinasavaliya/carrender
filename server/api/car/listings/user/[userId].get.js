import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const { userId } = event.context.params;
  let result = await prisma.car.findMany({
    where: {
      listerId: {
         equals:userId
      }
    },
    select: {
      image: true,
      id: true,
      name: true,
      price: true,
      listerId: true,
    }
  });
  return result;
});
