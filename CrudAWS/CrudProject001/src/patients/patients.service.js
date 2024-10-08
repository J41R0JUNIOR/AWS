import dynamoose from "dynamoose"; 
import { PatientDynamoSchema } from "./patients.schema";
import { crypto } from "node:crypto";

const PatientModel = dynamoose.model("Patient", PatientDynamoSchema);

export function create(payload) {
    payload.id = crypto.randomUUID();

    payload.PK = `PATIENT#${payload.id}`;

    const result = PatientModcel.create(payload);

    result.PK = undefined;

    return result;
}