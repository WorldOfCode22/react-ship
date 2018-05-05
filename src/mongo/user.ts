// File that describes the user to mongoose
export interface IUser {
  username: string;
  password: string;
}

import { Document, Model, model, Schema} from "mongoose";

export interface IUserModel extends IUser, Document {
  fullName(): string;
}

export let UserSchema: Schema = new Schema({
  password: String,
  username: String,
});

export const User: Model<IUserModel> = model<IUserModel>("User", UserSchema);
