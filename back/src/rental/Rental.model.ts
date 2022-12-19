import mongoose, { Types, Document } from "mongoose";
export interface IRental extends Document {
  title: string;
  done: boolean;
  userID: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
const Rental = new mongoose.Schema<IRental>(
  {
    title: { type: String, required: [true, "Title cannot be empty. "] },
    done: { type: Boolean, default: false },
    userID: {
      type: "ObjectID",
      ref: "User",
      required: [true, "Cannot upload Rental if user is not specified. "],
    },
  },
  { timestamps: true }
);
const rentalModel = mongoose.model<IRental>("Rental", Rental);

export default rentalModel;
