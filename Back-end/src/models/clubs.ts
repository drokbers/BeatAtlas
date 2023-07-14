import { Schema, model } from "mongoose";
import { ClubDocument } from "../club/club.interface";

const ClubSchema = new Schema<ClubDocument>({
  name: { type: String, required: true },
  workhours: {
    starttime: { type: String },
    endtime: { type: String },
  },
  website: { type: String },
  location: {
    country: { type: String, required: true },
    city: { type: String, required: true },
    latLng: { type: String },
    direction: { type: String },
  },
  description: { type: String },
  images: [{ type: String }],
  rating: { type: Number },
  genre: { type: String, required: true },
});

export default model<ClubDocument>("Club", ClubSchema);
