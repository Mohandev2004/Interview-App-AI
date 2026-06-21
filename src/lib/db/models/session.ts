import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface ISession extends Document {
  user: Types.ObjectId;
  role: string;
  experience: string;
  topicsToFocus: string;
  description?: string;
  questions: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const sessionSchema = new Schema<ISession>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    role: { type: String, required: true },
    experience: { type: String, required: true },
    topicsToFocus: { type: String, required: true },
    description: String,
    questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  },
  { timestamps: true }
);

const Session: Model<ISession> =
  mongoose.models.Session || mongoose.model<ISession>("Session", sessionSchema);

export default Session;
