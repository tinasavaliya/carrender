import Joi from "joi";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const schema = Joi.object({
  make: Joi.string().required(),
  model: Joi.string().required(),
  year:Joi.number()
      .min(1886)
      .max(new Date().getFullYear() + 1),
  miles:Joi.number().required().min(0),
  city:Joi.string().min(2).required(),
  numberofseats: Joi.number().max(1000).min(1).required(), 
  features: Joi.array().items(Joi.string()).required(),                                                                   
   description:Joi.string().min(20).required(),
  image: Joi.string().required(),
  listerId: Joi.string().required(),
  price: Joi.number().min(0),
  name: Joi.string().required(),

})


export default defineEventHandler(async(event) => {
  const body = await readBody(event); 
  const  {error, value } = await schema.validate(body);

  if (!error) {
    throw createError({
      statusCode: 412,
      statusMessage: error.message,
    });

  }

    const {
      image,
      name,
      numberofseats,
      features,
      description,
      miles,
      price,
      listerId,
      city,
      make,
      model,
    } = body;

  const car = await prisma.car.create({
    data: {
      image,
      name,
      numberofseats,
      features,
      description,
      miles,
      price,
      listerId:listerId,
      city:city.toLowerCase(),
      make,
      model,
    },
  });
  
  console.log('Car =');
  console.log(car);
  return car;

});

// import Joi from "joi";
// import { PrismaClient } from "@prisma/client";
// // import { defineEventHandler, createError } from "path/to/nuxt"; // Assuming you're using Nuxt.js

// const prisma = new PrismaClient();

// const schema = Joi.object({
//   make: Joi.string().required(),
//   model: Joi.string().required(),
//   year: Joi.number().min(1886).max(new Date().getFullYear() + 1),
//   miles: Joi.number().required().min(0),
//   city: Joi.string().min(2).required(),
//   numberOfSeats: Joi.number().max(1000).min(1),
//   features: Joi.array().items(Joi.string()).required(),
//   description: Joi.string().min(20).required(),
//   image: Joi.string().required(),
//   listerId: Joi.string().required(),
//   price: Joi.number().min(0),
//   name: Joi.string().required(),
// });

// export default defineEventHandler(async (event) => {
//   const body = await readBody(event); 
//   console.log("Received request body:", body); // Debug log to inspect the received data

//   const { error, value } = await schema.validate(body);
//   if (error) {
//     console.error("Validation error:", error); // Debug log to inspect the validation error
//     throw createError({
//       statusCode: 412,
//       statusMessage: error.message,
//     });
//   }

//   const {
//     image,
//     name,
//     numberOfSeats,
//     features,
//     description,
//     miles,
//     price,
//     listerId,
//     city,
//     make,
//     model,
//   } = value;

//   console.log("Creating car with the following data:");
//   console.log("Image:", image);
//   console.log("Name:", name);
//   console.log("NumberOfSeats:", numberOfSeats);
//   console.log("Features:", features);
//   console.log("Description:", description);
//   console.log("Miles:", miles);
//   console.log("Price:", price);
//   console.log("ListerId:", listerId);
//   console.log("City:", city);
//   console.log("Make:", make);
//   console.log("Model:", model);

//   const car = await prisma.car.create({
//     data: {
//       image,
//       name,
//       numberOfSeats,
//       features,
//       description,
//       miles,
//       price,
//       listerId,
//       city: city.toLowerCase(),
//       make,
//       model,
//     },
//   });
  
//   return car;
// });
