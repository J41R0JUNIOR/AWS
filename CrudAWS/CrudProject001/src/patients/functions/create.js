import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import { serviceCreate } from "../patients.service.js";

const createPatient = (event) => {
    const patient = serviceCreate(event.body);
    
    return {
        statusCode: 201,
        body: JSON.stringify(patient),
    };
};

export const handler = middy(createPatient)
    .use(httpJsonBodyParser());
