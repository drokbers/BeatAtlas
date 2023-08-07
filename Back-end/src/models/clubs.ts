import { Schema, model, Document } from "mongoose";

interface ILocation {
  country: string;
  city: string;
}

interface IViewport {
  northeast: {
    lat: number;
    lng: number;
  };
  southwest: {
    lat: number;
    lng: number;
  };
}

interface IGeometry {
  location: {
    lat: number;
    lng: number;
  };
  viewport: IViewport;
}

interface IOpeningHours {
  open_now: boolean;
  periods: Object[];
  weekday_text: string[];
}

export interface ClubDocument extends Document {
  name: string;
  website: string;
  location: ILocation;
  photos: string[];
  rating: number;
  genre: string[];
  opening_hours: IOpeningHours;
  geometry: IGeometry;
  formatted_address: string;
  formatted_phone_number: string;
  international_phone_number: string;
  editorial_summary: string;
  transportation: ("Metro" | "Bus" | "Trams" | "Train" | "Taxi" | "Other")[];
  waitingTime: "Instantly" | "30min" | "1hour" | "2hours" | "2+";
}

const ClubSchema = new Schema<ClubDocument>({
  name: { type: String, required: true },
  website: { type: String },
  location: {
    country: { type: String, required: true },
    city: { type: String, required: true },
  },
  photos: { type: [String] },
  rating: { type: Number },
  genre: { type: [String] },
  opening_hours: {
    open_now: { type: Boolean },
    periods: { type: [Object] },
    weekday_text: { type: [String] },
  },
  geometry: {
    location: {
      lat: { type: Number },
      lng: { type: Number },
    },
    viewport: {
      northeast: {
        lat: { type: Number },
        lng: { type: Number },
      },
      southwest: {
        lat: { type: Number },
        lng: { type: Number },
      },
    },
  },
  formatted_address: { type: String },
  formatted_phone_number: { type: String },
  international_phone_number: { type: String },
  editorial_summary: { type: String },
  transportation: {
    type: [String],
    enum: ["Metro", "Bus", "Trams", "Train", "Taxi", "Other"],
  },
  waitingTime: {
    type: String,
    enum: ["Instantly", "30min", "1hour", "2hours", "2+"],
  },
});

export default model<ClubDocument>("Club", ClubSchema);
