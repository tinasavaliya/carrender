import { PrismaClient } from "@prisma/client";
// import { defineEventHandler, createError } from "some-library"; 

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const { id } = event.context.params;

    const car = await prisma.car.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!car) {
      throw createError({
        statusCode: 404,
        statusMessage: `Car with ID of ${id} does not exist`,
      });
    }

    return car;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      errorMessage: error.message,
    });
  }
});
