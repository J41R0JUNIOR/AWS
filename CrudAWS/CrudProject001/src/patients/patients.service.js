import * as dynamoose from "dynamoose";
import { PatientSchema } from "./patients.schema.js";
import crypto from "node:crypto";
import {
    EventBridgeClient,
    PutEventsCommand,
} from "@aws-sdk/client-eventbridge";

const PatientModel = dynamoose.model("Patients", PatientSchema, { create: false });

// async function createPatient(payload) {

//     payload.id = crypto.randomUUID();

//     payload.PK = `PATIENT#${payload.id}`;

//     const result = await PatientModel.create(payload);

//     result.PK = undefined;

//     return {
//         statusCode: 201,
//         body: JSON.stringify(result),
//     };
// };

async function createPatient(payload) {
    payload.id = crypto.randomUUID();
    payload.PK = `PATIENT#${payload.id}`;

    console.log("Iniciando criação no DynamoDB");
    const result = await PatientModel.create(payload);//+
    console.log("Paciente criado no DynamoDB:", result);

    result.PK = undefined;

    return {
        statusCode: 201,
        body: JSON.stringify(result),
    };
};


async function findAllPatients() {
    const result = await PatientModel.scan().exec();

    return result.map((item) => {
        item.PK = undefined;
        return item;
    });
}

async function notifyPatientCreated(patient) {
    const client = new EventBridgeClient({});

    await client.send(
        new PutEventsCommand({
            Entries: [
                {
                    Source: "aula5-clinica",
                    DetailType: "PatientCreated",
                    Detail: JSON.stringify({ patient }),
                },
            ],
        })
    );
}

export default {
    createPatient,
    findAllPatients,
    notifyPatientCreated,
};