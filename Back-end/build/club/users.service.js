"use strict";
// userService.ts
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
exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
const bcrypt = require("bcrypt");
const users_1 = __importDefault(require("../models/users"));
dotenv.config();
const login = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_1.default.findOne({ username });
    if (!user) {
        throw new Error("Invalid username or password");
    }
    const isPasswordMatch = yield comparePasswords(password, user.password);
    if (!isPasswordMatch) {
        throw new Error("Invalid username or password");
    }
    const token = jsonwebtoken_1.default.sign({ userId: user._id }, String(process.env.SECRET_JWT_CODE), {
        expiresIn: "1h",
    });
    return { user, token };
});
exports.login = login;
function comparePasswords(inputPassword, hashedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(inputPassword, hashedPassword);
        try {
            return yield bcrypt.compare(inputPassword, hashedPassword);
        }
        catch (error) {
            throw error;
        }
    });
}
exports.default = { login: exports.login, comparePasswords };
