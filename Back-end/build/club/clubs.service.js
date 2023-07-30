"use strict";
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
exports.remove = exports.update = exports.create = exports.find = exports.findAll = void 0;
const clubs_1 = __importDefault(require("../models/clubs"));
const findAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield clubs_1.default.find();
});
exports.findAll = findAll;
const find = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield clubs_1.default.findById(id);
    if (!result) {
        throw new Error(`No club found with id: ${id}`);
    }
    return result;
});
exports.find = find;
const create = (newItem) => __awaiter(void 0, void 0, void 0, function* () {
    return yield clubs_1.default.create(newItem);
});
exports.create = create;
const update = (id, clubUpdate) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield clubs_1.default.findByIdAndUpdate(id, clubUpdate, {
        new: true,
    });
    if (!result) {
        throw new Error(`No club found with id: ${id}`);
    }
    return result;
});
exports.update = update;
const remove = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield clubs_1.default.findByIdAndDelete(id);
    if (!result) {
        throw new Error(`No club found with id: ${id}`);
    }
});
exports.remove = remove;
