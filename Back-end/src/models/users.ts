import mongoose, { Schema, Document } from "mongoose";

const usersSchema: Schema = new Schema({
  username: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});


export interface UsersDocument extends Document {
  username: string;
  password: string;
  created: Date;
  
}


const Users = mongoose.model<UsersDocument>("Users", usersSchema);
export default Users;
