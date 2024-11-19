import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "This is the API documentation for My API",
    },
    servers: [
      {
        url: "http://localhost:4000", // URL ของเซิร์ฟเวอร์ที่ API รันอยู่
      },
    ],
  },
  apis: ["./apps/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
