// import { User } from '../models/userSchema.js';

// import { catchAsyncErrors } from "../midlwares/catchAsyncErrors.js"
// import ErrorHandler from "../midlwares/errorMiddleware.js"
// import { generateJsonWebToken } from "../utils/jwtToken.js"

// import cloudinary from "cloudinary"
// export const patientRegister = catchAsyncErrors(async (req, res, next) => {


//     const { firstName, lastName, email, phone, nic, dob, gender, password , role} = req.body
//     if (
//         !firstName ||
//         !lastName ||
//         !email ||
//         !phone ||
//         !nic ||
//         !dob ||
//         !gender ||
//         !password||
//         !role
//       )  {
//         return next(new ErrorHandler(400, "Please fill all the form!",));

//     }
//     let user = await User.findOne({ email });
//     if (user) {
//         return next(new ErrorHandler(400, "User already exists!"));
//     }
//     user = await User.create({ firstName, lastName, email, phone, nic, password, gender, dob, role });
//     generateJsonWebToken(user, "User registered successfully!", 200, res)
//     // res.status(200).json({
//     //     success: true,
//     //     message: "User registered successfully!",

//     // })



// })

// export const login = catchAsyncErrors(async (req, res, next) => {

//     const { email, password, confirmPassword, role } = req.body;
//     if (!email || !password || !confirmPassword || !role) {
//         return next(new ErrorHandler(400, "Please enter All details"));
//     }
//     if (password !== confirmPassword) {
//         return next(new ErrorHandler(400, "Password does not match"));
//     }

//     const user = await User.findOne({ email }).select("+password")
//     if (!user) {
//         return next(new ErrorHandler(400, "Invalid email or password"));
//     }

//     const isPasswordMatched = await user.comparePassword(password);
//     if (!isPasswordMatched) {
//         return next(new ErrorHandler(400, "Invalid email or password"));
//     }
//     if (role !== user.role) {
//         return next(new ErrorHandler(400, "Invalid Role"));
//     }

//     generateJsonWebToken(user, "User login successfully!", 200, res)


// })
// export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
//     const { firstName, lastName, email, phone, nic, password, gender, dob } = req.body;

//     if (!firstName || !lastName || !email || !phone || !nic || !password || !gender || !dob) {
//         return next(new ErrorHandler(400, "Please fill all the form!",));
//     }
//     const isRegistered = await User.findOne({ email });
//     if (isRegistered) {
//         return next(new ErrorHandler(400, " With this Email User already exists!"));
//     }
//     const Admin = await User.create({ firstName, lastName, email, phone, nic, password, gender, dob, role: "Admin" })

//     res.status(200).json({
//         success: true,
//         message: " New Admin registered successfully!",

//     })
// })

// export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
//     const doctors = await User.find({ role: "Doctor" });
//     res.status(200).json({
//         success: true,
//         doctors
//     })
// })



// export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
//     const user = req.user;
//     res.status(200).json({
//         success: true,
//         user
//     })
// })

// export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {

//     res.status(200).cookie("adminToken", "", {
//         expires: new Date(Date.now()),
//         httpOnly: true
//     }).json({
//         success: true,
//         message: " Admin Logout successfully"
//     })
// })


// export const logoutPatient = catchAsyncErrors(async (req, res, next) => {

//     res.status(200).cookie("patientToken", "", {
//         expires: new Date(Date.now()),
//         httpOnly: true
//     }).json({
//         success: true,
//         message: "PAtient Logout successfully"
//     })
// })

// export const addNewDoctor = catchAsyncErrors (async(req, res, next) => {
//     if (!req.files || Object.keys(req.files).length === 0) {
//         return next(new ErrorHandler(400, "Please upload an image"))
//     }
//     const { docAvatar } = req.files;
//     const allowedFormats = ["/image/png", "image/jpeg", "image/webp"];
//     if (!allowedFormats.includes(docAvatar.mimetype)) {
//         return next(new ErrorHandler(400, "Please upload an image file"))
//     }
//     const { firstName, lastName, email, phone, nic, password, gender, dob, doctorDepartment } = req.body;

//     if (!firstName || !lastName || !email || !phone || !nic || !password || !gender || !dob || !doctorDepartment) { 

//         return next(new ErrorHandler(400, `Please fill all the form!`,));
//     }
//     const isRegistered = await User.findOne({email})
//     if(isRegistered){
//         return next(new ErrorHandler(400, "User already exists!"));
//             }


// const cloudinaryResponse = await cloudinary.v2.uploader.upload(docAvatar.tempFilePath);



// if(!cloudinaryResponse || cloudinaryResponse.error){
//     console.error("cloudinary error:", cloudinaryResponse.error || "Unknown cloudinary ")
// }
// const doctor = await User.create({

//     firstName, lastName, email, phone, nic, password, gender, dob, doctorDepartment,
//     role: "Doctor",
//     docAvatar: {
//         public_id: cloudinaryResponse.public_id,
//         url: cloudinaryResponse.secure_url
//     }

// })

// res.status(200).json({
//     success: true,
//     message: "New Doctor registered successfully!",
//     doctor
// })
          
// // const result = await cloudinary.v2.uploader.upload(docAvatar.tempFilePath);

// //     if(!result || result.error){
// //         console.error("cloudinary error:", result.error || "Unknown cloudinary ")
// //     }
// //     const doctor = await User.create({
// //         firstName, lastName, email, phone, nic, password, gender, dob, doctorDepartment,
// //         role: "Doctor",
// //         docAvatar: {
// //             public_id: result.public_id,
// //             url: result.secure_url
// //         }
// //     })

// //     res.status(200).json({
// //         success: true,
// //         message: "New Doctor registered successfully!",
// //         doctor
// //     })








// })



import { User } from '../models/userSchema.js';
import { catchAsyncErrors } from "../midlwares/catchAsyncErrors.js"
import ErrorHandler from "../midlwares/errorMiddleware.js"
// import { generateJsonWebToken } from "../utils/jwtToken.js"
import { generateJsonWebToken } from "../utils/jwtToken.js";

import cloudinary from "cloudinary"

// Register a new patient
export const patientRegister = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, nic, dob, gender, password } = req.body;

    if (!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !password )  {
        return next(new ErrorHandler("Please Fill Full Form!", 400));
      }
    
      const isRegistered = await User.findOne({ email });
      if (isRegistered) {
        return next(new ErrorHandler("User already Registered!", 400));
      }
    
      const user = await User.create({
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        password,
        role: "Patient",
      });
      generateToken(user, "User Registered!", 200, res);
    });

   


// Login an existing user
export const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password, confirmPassword, role } = req.body;

    if (!email || !password || !confirmPassword || !role) {
        return next(new ErrorHandler(400, "Please enter all details"));
    }

    if (password !== confirmPassword) {
        return next(new ErrorHandler(400, "Password does not match"));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler(400, "Invalid email or password"));
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
        return next(new ErrorHandler(400, "Invalid email or password"));
    }

    if (role !== user.role) {
        return next(new ErrorHandler(400, "Invalid Role"));
    }

    // Generate JWT token and set it as a cookie
    generateJsonWebToken(user, "User login successfully!", 201, res);



})

// Add a new admin
export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, nic, password, gender, dob } = req.body;

    if (!firstName || !lastName || !email || !phone || !nic || !password || !gender || !dob) {
        return next(new ErrorHandler(400, "Please fill all the form!"));
    }

    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        return next(new ErrorHandler(400, "With this Email User already exists!"));
    }

    const admin = await User.create({ firstName, lastName, email, phone, nic, password, gender, dob, role: "Admin" });

    res.status(200).json({
        success: true,
        message: "New Admin registered successfully!",
        admin,
    });
});

// Get all doctors
export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
    const doctors = await User.find({ role: "Doctor" });
    res.status(200).json({
        success: true,
        doctors,
    });
});

// Get user details
export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    });
});

// Logout admin
export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
    res.status(200).cookie("adminToken", "", {
        expires: new Date(Date.now()),
        httpOnly: true,
    }).json({
        success: true,
        message: "Admin Logout successfully",
    });
});

// Logout patient
export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
    res.status(200).cookie("patientToken", "", {
        expires: new Date(Date.now()),
        httpOnly: true,
    }).json({
        success: true,
        message: "Patient Logout successfully",
    });
});

// Add a new doctor
export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler(400, "Please upload an image"));
    }

    const { docAvatar } = req.files;
    const allowedFormats = ["/image/png", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(docAvatar.mimetype)) {

        return next(new ErrorHandler(400, "Please upload an image file"));}

    const { firstName, lastName, email, phone, nic, password, gender, dob, doctorDepartment } = req.body;

    if (!firstName || !lastName || !email || !phone || !nic || !password || !gender || !dob || !doctorDepartment||!docAvatar) {
        return next(new ErrorHandler(400, "Please fill all the form!"));
    }

    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        return next(new ErrorHandler(400, "User already exists!"));
    }

    const cloudinaryResponse = await cloudinary.v2.uploader.upload(docAvatar.tempFilePath);

    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error("cloudinary error:", cloudinaryResponse.error || "Unknown cloudinary error");


        return next(
            new ErrorHandler("Failed To Upload Doctor Avatar To Cloudinary", 500)
          );
    } 

    const doctor = await User.create({
        firstName,
        lastName,
        email,
        phone,
        nic,
        password,
        gender,
        dob,
        doctorDepartment,
        role: "Doctor",
        docAvatar: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        },
    });

    res.status(200).json({
        success: true,
        message: "New Doctor registered successfully!",
        doctor,
    });
});
