import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import { serviceCreate } from "../patients.service.js";
import dynamoose from "dynamoose"; 
import { PatientDynamoSchema } from "..//patients.schema.js";
import crypto  from "node:crypto";

const PatientModel = dynamoose.model("Patients", PatientDynamoSchema, { create: false });

const createPatient = async (event) => {
    const payload = event.body;
    payload.id = crypto.randomUUID();

    payload.PK = `PATIENT#${payload.id}`;

    const result = await PatientModel.create(payload);

    result.PK = undefined;

    return {
        statusCode: 201,
        body: JSON.stringify(result),
    };
};

export const handler = middy(createPatient)
    .use(httpJsonBodyParser())
    .handler(createPatient);
    