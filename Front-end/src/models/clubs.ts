

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

export default interface Club{
  name: string;
  website: string;
  location: ILocation;
  photos: string[];
  rating: number;
  genre:string[];
  opening_hours: IOpeningHours;
  editorial_summary: string,
  geometry: IGeometry;
  formatted_address: string;
  formatted_phone_number: string;
  international_phone_number: string;
}
export interface IClub {
  name: string;
  website: string;
  location: ILocation;
  photos: string[];
  rating: number;
  genre: string;
  opening_hours: IOpeningHours;
  editorial_summary: string;
  geometry: IGeometry;
  formatted_address: string;
  formatted_phone_number: string;
  international_phone_number: string;
}

