/**
 * Required External Modules and Interfaces
 */

import mongoose from "mongoose";
import { NextFunction } from "express-serve-static-core";
import * as dotenv from "dotenv";

import { Router, Request, Response } from "express";
import Club from "../models/clubs";

import * as clubService from "./clubs.service";
/**
 * Router Definition
 */

const clubsRouter: Router = Router();
const axios = require("axios");
dotenv.config();

// GET clubs by ID
clubsRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const club = await Club.findById(req.params.id);
    if (!club) {
      return res.status(404).json({ error: "Club not found" });
    }
    res.json(club);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Get clubs by country
clubsRouter.get(
  "/getClubsByCountry/:country",
  async (req: Request, res: Response) => {
    try {
      const country: string = req.params.country;
      const clubs = await Club.find({
        "location.country": country,
      });
      res.json(clubs);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
);

// Get clubs by genre
clubsRouter.get(
  "/getClubsByGenre/:genre",
  async (req: Request, res: Response) => {
    try {
      const genre: string = req.params.genre;
      const clubs = await Club.find({ genre: genre });
      res.json(clubs);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
);

clubsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const clubs = await Club.find();
    res.json(clubs);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update a club
clubsRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const club = await Club.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!club) {
      return res.status(404).json({ error: "Club not found" });
    }
    res.json(club);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

// Delete a club
clubsRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const isValidObjectId: boolean = mongoose.Types.ObjectId.isValid(
      req.params.id
    );
    if (!isValidObjectId) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const club = await Club.findByIdAndDelete(req.params.id);
    if (!club) {
      return res.status(404).json({ error: "Club not found" });
    }

    res.json({ message: "Club deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

clubsRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const placeName = req.body.name;
      const placeLocation =
        req.body.location.city + "%20" + req.body.location.country;
      // taking placeID
      const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=formatted_address%2Cname%2Crating%2Cplace_id%2Copening_hours%2Cgeometry&input=${placeName}%20${placeLocation}&inputtype=textquery&key=${process.env.Google_API}`;
      const response = await axios.get(url);
      const data = response.data;
      const place_id = data.candidates[0].place_id;
      console.log(place_id);

      req.place_id = place_id;

      return next();
    } catch (error) {
      return next(error);
    }
  },

  //taking place details
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const place_id = req.place_id;

      const url = `https://maps.googleapis.com/maps/api/place/details/json?fields=opening_hours%2Cgeometry%2Cname%2Crating%2Cformatted_phone_number%2Cinternational_phone_number%2Cphotos%2Cwebsite%2Cformatted_address%2Ceditorial_summary&place_id=${place_id}&key=${process.env.Google_API}`;
      const response = await axios.get(url);
      const data = response.data.result;
      console.log("2.middleware");

      const {
        formatted_address,
        formatted_phone_number,
        international_phone_number,
        opening_hours,
        geometry,
        photos,
        rating,
        website,
      } = data;

      const photoUrls: string[] = [];

      const photoRefs = photos.slice(0, 5);

      for (const photoRef of photoRefs) {
        const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef.photo_reference}&key=${process.env.Google_API}`;
        photoUrls.push(photoUrl);
      }

      req.body = {
        ...req.body,
        formatted_address,
        formatted_phone_number,
        international_phone_number,
        opening_hours,
        geometry,
        photos: photoUrls,
        rating,
        website,
      };

      next();
    } catch (error) {
      next(error);
    }
  },

  // Create a new club
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body, "club saved");
      const club = await clubService.create(req.body);
      res.status(201).json(club);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
);

module.exports = clubsRouter;

export default clubsRouter;