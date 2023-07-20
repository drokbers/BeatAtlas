import { Request } from "express";

declare module "express" {
  export interface Request {
    place_id?: string;
    placeDetail?: {
      placeId: string;
      formattedAddress: string;
      formattedPhoneNumber: string;
      internationalPhoneNumber: string;
      openingHours: {
        openNow: boolean;
        periods: Array<any>;
        weekdayText: Array<string>;
      };
      geometry?: {
        location: { lat: number; lng: number };
        viewport: { northeast: any; southwest: any };
      };
      photos: Array<any>;
      rating: number;
      website: string;
    };
  }
}
