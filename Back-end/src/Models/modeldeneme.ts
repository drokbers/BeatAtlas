import mongoose, { Schema, Document } from "mongoose";
import express from "express";

const router = express.Router();

export interface IClub extends Document {
  name: string;
  workhours: {
    starttime: string;
    endtime: string;
  };
  website:{
    type: string
  }

  location: {
    country: string;
    city: string;
    latLng: string;
    direction: {
        type: string
    }
  };
  description?: string;
  image: string[];
  rating?: number;
  genre: string;
}

const ClubSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    workhours: {
      starttime: { type: String },
      endtime: { type: String },
    },
    location: {
      country: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
      },
      city: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
      },
      latLng: {
        type: String, // latLng is now defined as an array of numbers
        required: false,
      },
      direction: {
        type: String,
      },
    },
    website: {
      type: String,
      match: /https?:\/\//i,
    },
    description: {
      type: String,
      minlength: 5,
      maxlength: 100,
    },
    image: [
      {
        type: String,
      },
    ],
    rating: {
      type: Number,
    },
    genre: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IClub>("Club", ClubSchema);
module.exports = router;
