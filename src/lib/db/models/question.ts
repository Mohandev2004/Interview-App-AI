import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IQuestion extends Document {
  session: Types.ObjectId;
  question?: string;
  answer?: string;
  note?: string;
  isPinned: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const questionSchema = new Schema<IQuestion>(
  {
    session: { type: Schema.Types.ObjectId, ref: "Session" },
    question: String,
    answer: String,
    note: String,
    isPinned: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Question: Model<IQuestion> =
  mongoose.models.Question ||
  mongoose.model<IQuestion>("Question", questionSchema);

export default Question;
