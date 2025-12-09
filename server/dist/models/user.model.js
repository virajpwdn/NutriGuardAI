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
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = __importDefault(require("../utils/logger"));
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: [true, "username is required"],
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
    },
    profileImg: {
        type: String,
    },
    password: {
        type: String,
    },
}, { timestamps: true });
userSchema.statics.hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    if (!password) {
        logger_1.default.error("Password is required for hashing");
    }
    const hashPassword = yield bcrypt_1.default.hash(password, 10);
    return hashPassword;
});
userSchema.methods.comparePassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!password) {
            throw new Error("Password is required to compare");
        }
        if (!this.password) {
            throw new Error("Password in document not found");
        }
        return yield bcrypt_1.default.compare(this.password, password);
    });
};
userSchema.statics.generateToken = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const token = jsonwebtoken_1.default.sign({
            _id: this._id,
            username: this.username,
            email: this.email,
        });
    });
};
