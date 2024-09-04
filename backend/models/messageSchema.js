import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
    firstName: {  // Corrected from firstNAme to firstName
        type: String,
        required: true,
        trim: true,
        minLength: [3, "First name must contain at least 3 characters!"]
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minLength: [3, "Last name must contain at least 3 characters!"]
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate: [validator.isEmail, "Please provide a valid email address"]
    },
    phone: {  // Corrected from Phone to phone
        type: String,
        required: true,
        trim: true,
        minLength: [10, "Phone number must contain at least 10 characters!"],
        maxLength: [10, "Phone number must contain at least 10 characters!"]
    },
    message: {
        type: String,
        required: true,
        trim: true,
        minLength: [10, "Message must contain at least 10 characters!"]
    }
});

export const Message = mongoose.model("Message", messageSchema);  // Changed model name to be capitalized
