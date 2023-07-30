"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ClubSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    website: { type: String },
    location: {
        country: { type: String, required: true },
        city: { type: String, required: true },
    },
    photos: { type: [String] },
    rating: { type: Number },
    genre: { type: String },
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
});
exports.default = (0, mongoose_1.model)("Club", ClubSchema);
