import { IMessage } from "./message.interface";
export interface IUSER {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiery: string;
  isVerified: boolean;
  isAcceptingMessage: boolean;
  message: IMessage[];
}
