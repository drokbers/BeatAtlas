// src/items/items.service.ts

/**
 * Data Model Interfaces
 */

import { BaseClub, Club } from "./club.interface";
import { Clubs } from "./clubs.interface";

/**
 * In-Memory Store
 */

let clubs: Clubs = {
  1: {
    id: 1,
    name: "Klein Harbiye",
    genre: "Trance, Techno, EDM",
    workhours: { starttime: "9:00", endtime: "03:00" },
    location: {
      city: "istanbul",
      country: "Turkey",
      latLng: "40.0052 , 39.7179",
      direction: "222e 32st NYC , NY",
    },
    website: "wwww.BeatAtlas.com",
    images: ["https://media.timeout.com/images/105562876/image.jpg"],
    description:
      "Best underground techno club in the city, Mostly 1 hour line in the door and you should get ticket before go, There is a dress code too, make sure wear black",
  },
  2: {
    id: 2,
    name: "Klein Harbiye",
    genre: "Trance, Techno, EDM",
    workhours: { starttime: "9:00", endtime: "03:00" },
    location: {
      city: "istanbul",
      country: "Turkey",
      latLng: "40.0052 , 39.7179",
      direction: "222e 32st NYC , NY",
    },
    website: "wwww.BeatAtlas.com",
    images: ["https://media.timeout.com/images/105562876/image.jpg"],
    description:
      "Best underground techno club in the city, Mostly 1 hour line in the door and you should get ticket before go, There is a dress code too, make sure wear black",
  },
  3: {
    id: 3,
    name: "Klein Harbiye",
    genre: "Trance, Techno, EDM",
    workhours: { starttime: "9:00", endtime: "03:00" },
    location: {
      city: "istanbul",
      country: "Turkey",
      latLng: "40.0052 , 39.7179",
      direction: "222e 32st NYC , NY",
    },
    website: "wwww.BeatAtlas.com",
    images: ["https://media.timeout.com/images/105562876/image.jpg"],
    description:
      "Best underground techno club in the city, Mostly 1 hour line in the door and you should get ticket before go, There is a dress code too, make sure wear black",
  },
  4: {
    id: 4,
    name: "Klein Harbiye",
    genre: "Trance, Techno, EDM",
    workhours: { starttime: "9:00", endtime: "03:00" },
    location: {
      city: "istanbul",
      country: "Turkey",
      latLng: "40.0052 , 39.7179",
      direction: "222e 32st NYC , NY",
    },
    website: "wwww.BeatAtlas.com",
    images: ["https://media.timeout.com/images/105562876/image.jpg"],
    description:
      "Best underground techno club in the city, Mostly 1 hour line in the door and you should get ticket before go, There is a dress code too, make sure wear black",
  },
};
/**
 * Service Methods
 */

export const findAll = async (): Promise<Club[]> => Object.values(clubs);

export const find = async (id: number): Promise<Club> => clubs[id];

export const create = async (newItem: BaseClub): Promise<Club> => {
  const id = new Date().valueOf();

  clubs[id] = {
    id,
    ...newItem,
  };

  return clubs[id];
};

export const update = async (
  id: number,
  clubUpdate: BaseClub
): Promise<Club | null> => {
  const club = await find(id);

  if (!club) {
    return null;
  }

  clubs[id] = { id, ...clubUpdate };

  return clubs[id];
};

export const remove = async (id: number): Promise<null | void> => {
  const club = await find(id);

  if (!club) {
    return null;
  }

  delete clubs[id];
};