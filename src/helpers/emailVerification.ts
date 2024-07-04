import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/verificationEmails";
import { IAPIResponse } from "@/types/apiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<IAPIResponse> {
  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Verification email",
      react: VerificationEmail({ username, otp: verifyCode }),
    });
    return {
      success: true,
      message: "Verification email send Successfully",
    };
  } catch (error) {
    console.log("Error sending verification email ", error);
    return {
      success: false,
      message: "Failed to send Verification email",
    };
  }
}
