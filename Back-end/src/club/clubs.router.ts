/**
 * Required External Modules and Interfaces
 */

import mongoose from "mongoose";
import { NextFunction } from "express-serve-static-core";
import * as dotenv from "dotenv";
import { Router, Request, Response } from "express";

import Club from "../models/clubs";
import * as clubService from "./clubs.service";
import userService from "./users.service";
import authenticateToken from "../middleware/authenticateToken";

/**
 * Router Definition
 */

const clubsRouter: Router = Router();
const axios = require("axios");
dotenv.config();

clubsRouter.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await userService.login(username, password);
    res.json({ message: "Login successful", user });
  } catch (error) {
    res.status(401).json({ error: (error as Error).message });
  }
});

// GET clubs by ID
clubsRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const club = await Club.findById(req.params.id);
    if (!club) {
      return res
        .status(404)
        .json({ error: `No club found with id: ${req.params.id}` });
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
clubsRouter.put(
  "/:id",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const club = await Club.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!club) {
        return res
          .status(404)
          .json({ error: `No club found with id: ${req.params.id}` });
      }
      res.json(club);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
);

// Delete a club
clubsRouter.delete(
  "/:id",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const isValidObjectId: boolean = mongoose.Types.ObjectId.isValid(
        req.params.id
      );
      if (!isValidObjectId) {
        return res.status(400).json({ error: "Invalid ID format" });
      }

      const club = await Club.findByIdAndDelete(req.params.id);
      if (!club) {
        return res
          .status(404)
          .json({ error: `No club found with id: ${req.params.id}` });
      }

      res.json({ message: "Club deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
);

declare global {
  namespace Express {
    interface Request {
      placeDetails?: any;
    }
  }
}

clubsRouter.post(
  "/",
  authenticateToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const placeName = req.body.name;
      const placeLocation =
        req.body.location.city + "%20" + req.body.location.country + "%20club";
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

  //place details
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const place_id = req.place_id;
      const url = `https://maps.googleapis.com/maps/api/place/details/json?fields=opening_hours%2Cgeometry%2Ceditorial_summary%2Cname%2Crating%2Cformatted_phone_number%2Cinternational_phone_number%2Cphotos%2Cwebsite%2Cformatted_address%2Ceditorial_summary&place_id=${place_id}&key=${process.env.Google_API}`;
      const response = await axios.get(url);
      const data = response.data.result;

      const {
        formatted_address,
        formatted_phone_number,
        international_phone_number,
        opening_hours,
        geometry,
        photos,
        rating,
        website,
        editorial_summary,
      } = data;

      const photoUrls: string[] = [];
      const photoRefs = photos.slice(0, 5);

      for (const photoRef of photoRefs) {
        const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef.photo_reference}&key=${process.env.Google_API}`;
        photoUrls.push(photoUrl);
      }

      req.placeDetails = {
        formatted_address,
        formatted_phone_number,
        international_phone_number,
        opening_hours,
        geometry,
        photos: photoUrls,
        rating,
        website,
        editorial_summary: req.body.editorial_summary,
        transportation: req.body.transportation,
        waitingTime: req.body.waitingTime,
      };

      next();
    } catch (error) {
      next(error);
    }
  },

  // Create a new club
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.placeDetails, "club saved");
      const club = await clubService.create({
        ...req.body,
        ...req.placeDetails,
      });
      res.status(201).json(club);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
);

// module.exports = clubsRouter;

export default clubsRouter;
