"use strict";
/**
 * Required External Modules and Interfaces
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv = __importStar(require("dotenv"));
const express_1 = require("express");
const clubs_1 = __importDefault(require("../models/clubs"));
const clubService = __importStar(require("./clubs.service"));
/**
 * Router Definition
 */
const clubsRouter = (0, express_1.Router)();
const axios = require("axios");
dotenv.config();
// GET clubs by ID
clubsRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const club = yield clubs_1.default.findById(req.params.id);
        if (!club) {
            return res
                .status(404)
                .json({ error: `No club found with id: ${req.params.id}` });
        }
        res.json(club);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// Get clubs by country
clubsRouter.get("/getClubsByCountry/:country", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const country = req.params.country;
        const clubs = yield clubs_1.default.find({
            "location.country": country,
        });
        res.json(clubs);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// Get clubs by genre
clubsRouter.get("/getClubsByGenre/:genre", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const genre = req.params.genre;
        const clubs = yield clubs_1.default.find({ genre: genre });
        res.json(clubs);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
clubsRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clubs = yield clubs_1.default.find();
        res.json(clubs);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}));
// Update a club
clubsRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const club = yield clubs_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!club) {
            return res
                .status(404)
                .json({ error: `No club found with id: ${req.params.id}` });
        }
        res.json(club);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
// Delete a club
clubsRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isValidObjectId = mongoose_1.default.Types.ObjectId.isValid(req.params.id);
        if (!isValidObjectId) {
            return res.status(400).json({ error: "Invalid ID format" });
        }
        const club = yield clubs_1.default.findByIdAndDelete(req.params.id);
        if (!club) {
            return res
                .status(404)
                .json({ error: `No club found with id: ${req.params.id}` });
        }
        res.json({ message: "Club deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
clubsRouter.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const placeName = req.body.name;
        const placeLocation = req.body.location.city + "%20" + req.body.location.country;
        // taking placeID
        const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=formatted_address%2Cname%2Crating%2Cplace_id%2Copening_hours%2Cgeometry&input=${placeName}%20${placeLocation}&inputtype=textquery&key=${process.env.Google_API}`;
        const response = yield axios.get(url);
        const data = response.data;
        const place_id = data.candidates[0].place_id;
        console.log(place_id);
        req.place_id = place_id;
        return next();
    }
    catch (error) {
        return next(error);
    }
}), 
//taking place details
(req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const place_id = req.place_id;
        const url = `https://maps.googleapis.com/maps/api/place/details/json?fields=opening_hours%2Cgeometry%2Cname%2Crating%2Cformatted_phone_number%2Cinternational_phone_number%2Cphotos%2Cwebsite%2Cformatted_address%2Ceditorial_summary&place_id=${place_id}&key=${process.env.Google_API}`;
        const response = yield axios.get(url);
        const data = response.data.result;
        console.log("2.middleware");
        const { formatted_address, formatted_phone_number, international_phone_number, opening_hours, geometry, photos, rating, website, } = data;
        const photoUrls = [];
        const photoRefs = photos.slice(0, 5);
        for (const photoRef of photoRefs) {
            const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef.photo_reference}&key=${process.env.Google_API}`;
            photoUrls.push(photoUrl);
        }
        req.body = Object.assign(Object.assign({}, req.body), { formatted_address,
            formatted_phone_number,
            international_phone_number,
            opening_hours,
            geometry, photos: photoUrls, rating,
            website });
        next();
    }
    catch (error) {
        next(error);
    }
}), 
// Create a new club
(req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body, "club saved");
        const club = yield clubService.create(req.body);
        res.status(201).json(club);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
module.exports = clubsRouter;
exports.default = clubsRouter;
