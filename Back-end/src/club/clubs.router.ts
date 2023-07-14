/**
 * Required External Modules and Interfaces
 */

import mongoose from "mongoose";
import { NextFunction } from "express-serve-static-core";

import { Router, Request, Response } from "express";
import Club from "../models/clubs";
import { ClubDocument } from "../club/club.interface";

/**
 * Router Definition
 */

const clubsRouter: Router = Router();

// GET clubs

clubsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const clubs = await Club.find();
    res.json(clubs);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET clubs by ID
clubsRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const club: ClubDocument | null = await Club.findById(req.params.id);
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
      const clubs: ClubDocument[] = await Club.find({
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
      const clubs: ClubDocument[] = await Club.find({ genre: genre });
      res.json(clubs);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
);

// Create a new club
clubsRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const club: ClubDocument = new Club(req.body);
      console.log("club");
      console.log(req.body);
      const savedClub: ClubDocument = await club.save();
      res.status(201).json(savedClub);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
);

// Update a club
clubsRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const club: ClubDocument | null = await Club.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
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

    const club: ClubDocument | null = await Club.findByIdAndDelete(
      req.params.id
    );
    if (!club) {
      return res.status(404).json({ error: "Club not found" });
    }

    res.json({ message: "Club deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

module.exports = clubsRouter;

export default clubsRouter;
