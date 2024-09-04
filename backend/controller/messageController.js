import { catchAsyncErrors } from '../midlwares/catchAsyncErrors.js';
import { Message } from "../models/messageSchema.js";
import ErrorHandler from "../midlwares/errorMiddleware.js";

export const sendMessage = catchAsyncErrors(
    async (req, res, next) => {
        const { firstName, lastName, email, phone, message } = req.body;
    
        // Check if all fields are provided
        if (!firstName || !lastName || !email || !phone || !message) {
            // Corrected the ErrorHandler instantiation
            return next(new ErrorHandler(400, "Please fill the form"));
        }
    
        // Create and save the message to the database
        await Message.create({ 
            firstName,
            lastName,
            email,
            phone,
            message
        });
    
        // Respond with success
        res.status(200).json({
            success: true, 
            message: "Message sent successfully!"
        });
    }
);


export const getAllMessages = catchAsyncErrors(async(req,res,next)=>{
    const messages = await Message.find();
    res.status(200).json({
        success:true,
        messages
    })
})