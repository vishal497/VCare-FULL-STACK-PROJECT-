import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import JWT from"jsonwebtoken";

const userSchema = new mongoose.Schema({
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
    nic: {
        type: String,
        required: true,
        minLength: [10, " NIC number must contain at least 10 characters!"],
        maxLength: [12, "NIC  number must contain at least 12 characters!"]
    },
    dob: {
        type: Date,
        required: [true, "DOB is required"],
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"]
    },
    password: {
        type: String,
        required: true,
        minLength: [8, "Password must contain at least 8 characters!"],
        select: false
    },
    role: {
        type: String,
        required: true,
        enum: ["Admin", "Patient", "Doctor"],
        default: "user"
    },
    doctorDepartment: {
        type: String,
    },
    docAvatar: {
        public_id: String,
        url: String
    }

});
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 12);
    next();
})
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.generateJsonWebToken=function(){
    return JWT.sign({id:this._id}, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE||'7d'
    });

}

export const User = mongoose.model("User", userSchema);  // Changed model name to be capitalized
