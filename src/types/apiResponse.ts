import { IMessage } from "./message.interface";

export interface IAPIResponse {
  success: boolean;
  message: string;
  isAcceptingMessages?: boolean;
  messages?: Array<IMessage>;
}
