/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import * as ClubService from "./clubs.service";
import { BaseClub, Club } from "./club.interface";

/**
 * Router Definition
 */

export const clubsRouter = express.Router();

/**
 * Controller Definitions
 */

// GET items

clubsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const clubs: Club[] = await ClubService.findAll();
    res.status(200).send(clubs);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

// GET items/:id

clubsRouter.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const club: Club = await ClubService.find(id);
    if (club) {
      return res.status(500).send(club);
    }
    res.status(404).send("club not found");
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

// POST items

clubsRouter.post("/", async (req: Request, res: Response) => {
  try {
    const club: BaseClub = req.body;
    const newClub = await ClubService.create(club);
    res.status(201).json(newClub);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

// PUT items/:id

clubsRouter.put("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const clubUpdate: Club = req.body;
    const existingClub: Club = await ClubService.find(id);

    if (existingClub) {
      const updatedClub = await ClubService.update(id, clubUpdate);
      return res.status(200).json(updatedClub);
    }
    const newClub = await ClubService.create(clubUpdate);
    res.status(200).json(newClub);
  } catch (e:any) {
    res.status(500).send(e.message);
  }
});

// DELETE items/:id

clubsRouter.delete("/:id", async (req: Request, res: Response) =>
{
    try {
        const id: number = parseInt(req.body.id , 10);
        await ClubService.remove(id)
        res.sendStatus(204);
        
    } catch (e:any) {
        res.status(500).send(e.message);
    }
})