import mongoose, { Schema, Document, Model } from "mongoose";
import { IMessage } from "../types/message.interface";

const MessageSchema: Schema<IMessage> = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, required: true, default: Date.now() },
});
const Message: Model<IMessage> = mongoose.model<IMessage>(
  "Message",
  MessageSchema
);
export default Message;
