import dynamoose from "dynamoose"; 
import { PatientDynamoSchema } from "./patients.schema";

const PatientModel = dynamoose.model("Patient", PatientDynamoSchema);

// export const createPatient = async (patient) => {
//     return await PatientModel.create(patient);
// };

export function create(payload) {
    payload.id = crypto.randomUUID();
    
    return PatientModel.create(payload);
}