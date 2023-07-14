import { Document } from 'mongoose';

export interface BaseClub {
    name: string;
    workhours: {
      starttime: string;
      endtime: string;
    };
    website: string,
  
    location: {
      country: string;
      city: string;
      latLng: string;
      direction:  string
    };
    description?: string;
    images: string[];
    rating?: number;
    genre: string;
}

export interface ClubDocument extends BaseClub, Document {}
