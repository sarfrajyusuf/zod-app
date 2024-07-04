// // import sendEmail from "@/helpers/mailer";
// import bcrypt from "bcrypt";
// import { NextRequest, NextResponse } from "next/server";
// import connectDB from "@/lib/db";
// import User from "@/models/user";
// import { sendVerificationEmail } from "@/helpers/emailVerification";
// connectDB();
// export async function POST(req: Request) {
//   try {
//     const { username, email, password } = await req.json();

//     const existingUserVerifiedByUsername = await User.findOne({
//       email,
//       isVerified: true,
//     });

//     if (existingUserVerifiedByUsername) {
//       return Response.json({
//         success: false,
//         message: "Username Already Taken!",
//         status: 400,
//       });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const verifyCode = await Math.floor(
//       100000 + Math.random() * 900000
//     ).toString();
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       if (existingUser.isVerified) {
//         return Response.json({
//           success: false,
//           message: "User Already exist with this email",
//           status: 400,
//         });
//       } else {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         existingUser.password = hashedPassword;
//         existingUser.verifyCode = verifyCode;
//         existingUser.verifyCodeExpiery = new Date(
//           Date.now() + 3600000
//         ).toString();
//         await existingUser.save();
//       }
//     } else {
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const expieryDate = new Date();
//       expieryDate.setHours(expieryDate.getHours() + 1);
//       const newUser = await User.create({
//         username,
//         email,
//         password: hashedPassword,
//         verifyCode,
//         verifyCodeExpieryDate: expieryDate,
//         isVerified: false,
//         isAcceptingMessage: true,
//         messages: [],
//       });
//       await newUser.save();
//     }

//     const emailResponse = await sendVerificationEmail(
//       username,
//       email,
//       verifyCode
//     );
//     if (!emailResponse.success) {
//       return Response.json({
//         success: false,
//         message: emailResponse.message,
//         status: 500,
//       });
//     }

//     return Response.json({
//       success: true,
//       message: "User Successfully Registered!",
//       status: 201,
//     });
//   } catch (error: any) {
//     console.error(error);
//     return Response.json({ error: error.message, status: 500 });
//   }
// }

import bcrypt from "bcrypt";
import dbConnect from "@/lib/db";
import UserModel from "@/models/user";
import { sendVerificationEmail } from "@/helpers/emailVerification";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, email, password } = await request.json();

    const existingVerifiedUserByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingVerifiedUserByUsername) {
      return Response.json(
        {
          success: false,
          message: "Username is already taken",
        },
        { status: 400 }
      );
    }

    const existingUserByEmail = await UserModel.findOne({ email });
    let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "User already exists with this email",
          },
          { status: 400 }
        );
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
        await existingUserByEmail.save();
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptingMessages: true,
        messages: [],
      });

      await newUser.save();
    }

    // Send verification email
    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode
    );
    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 500 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "User registered successfully. Please verify your account.",
        
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering user:", error);
    return Response.json(
      {
        success: false,
        message: "Error registering user",
      },
      { status: 500 }
    );
  }
}
