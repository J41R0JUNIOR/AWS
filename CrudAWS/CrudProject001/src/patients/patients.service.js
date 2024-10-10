import dynamoose from "dynamoose"; 
import { PatientDynamoSchema } from "./patients.schema.js";
import crypto  from "node:crypto";

const PatientModel = dynamoose.model("Patients", PatientDynamoSchema, { create: false });

export async function serviceCreate(payload) {
    try {
        payload.id = crypto.randomUUID();
        payload.PK = `PATIENT#${payload.id}`;

        const result = await PatientModel.create(payload);

        result.PK = undefined;

        return result;
    } catch (error) {
        console.error("Error creating patient in DynamoDB:", error);
        throw new Error("Could not create patient");
    }
}
