



export const generateJsonWebToken = (user, message, statusCode, res) => {
  try {
      // Generate the token using a method defined on the user model
      const token = user.generateJsonWebToken(); 

      // Determine the cookie name based on the user's role
      const cookieName = user.role === "Admin" ? "adminToken" : "patientToken";

      // Set the cookie with the token and appropriate options
      res.status(statusCode).cookie(cookieName, token, {

        expires: new Date(
          Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
      })


          // expires: new Date(Date.now() + (parseInt(process.env.COOKIE_EXPIRE, 10) || 7) * 24 * 60 * 60 * 1000), 
          // httpOnly: true, 
          // secure: process.env.NODE_ENV === 'production',
          // sameSite: 'None' 
      // })
      .json({
          success: true,
          token, // Return the token in the response if needed
          message,
          user // Include user data in the response
      });

  } catch (error) {
      // Handle any errors that occur during token generation
      console.error("Error generating JWT:", error);

      res.status(500).json({
          success: false,
          message: "Internal Server Error"
      });
  }
};
