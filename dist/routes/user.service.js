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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCreation = exports.getUserById = exports.listUsers = void 0;
const index_1 = require("../index");
const typeorm_1 = require("typeorm");
const User_model_1 = require("../entities/User.model");
// List all users
const listUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = (0, typeorm_1.getRepository)(User_model_1.User);
    return yield userRepository.find();
});
exports.listUsers = listUsers;
// Retrieve a single user by ID
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = (0, typeorm_1.getRepository)(User_model_1.User);
    const user = yield userRepository.findOne({ where: { id } });
    if (!user) {
        throw new Error(`User with ID ${id} not found`);
    }
    return user;
});
exports.getUserById = getUserById;
//Create a new user
const UserCreation = (firstName, lastName, email) => __awaiter(void 0, void 0, void 0, function* () {
    if (!index_1.AppDataSource.isInitialized) {
        yield index_1.AppDataSource.initialize();
    }
    const userRepository = (0, typeorm_1.getRepository)(User_model_1.User);
    // Check if email already exists
    const existingUser = yield userRepository.findOne({ where: { email } });
    if (existingUser) {
        throw new Error("Email is already in use.");
    }
    // Create new user
    // Create new user
    const newUser = userRepository.create({ firstName, lastName, email });
    const savedUser = yield userRepository.save(newUser);
    return {
        id: savedUser.id,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        email: savedUser.email,
    };
});
exports.UserCreation = UserCreation;
