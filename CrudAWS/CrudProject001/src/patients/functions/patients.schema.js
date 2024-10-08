import dynamoose from "dynamoose";

const PatientDynamoSchema = new dynamoose.Schema(
    {
        id: String,
        taxId: String,
        healthServiceNumber: String,
        birthDate: Date,
        name: String,
        weight: Number,
        height: Number,
        adress: {
            street: String,
            number: Number,
            city: String,
            state: String,
            country: String
        },
        phoneNumber: String
    },
    {
        saveUnknown: true,
        timestamps: true
    }
);
