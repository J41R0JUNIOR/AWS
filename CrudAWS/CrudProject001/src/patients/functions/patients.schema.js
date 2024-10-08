import dynamoose from "dynamoose";

const schema = new dynamoose.Schema(
    {
        id: String,
        taxId: String,
        healthServiceNumber: String,
        birthDate: Date,
        name: String,
        weight: Number,
        height: Number,
        adress
    }
)
