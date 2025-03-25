import {AppDataSource}from "../index";
import { User } from "../entities/User.model";



// List all users
export const listUsers = async () => {
    const userRepository = AppDataSource.getRepository(User);
    return await userRepository.find();
};

// Retrieve a single user by ID
export const getUserById = async (id: number) => {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
        throw new Error(`User with ID ${id} not found`);
    }

    return user;
};
//Create a new user
export const UserCreation = async (firstName: string, lastName: string, email: string) => {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }
    const userRepository = AppDataSource.getRepository(User);

    // Check if email already exists
    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
        throw new Error("Email is already in use.");
    }

    // Create new user
     // Create new user
     const newUser = userRepository.create({ firstName,lastName, email });
     const savedUser = await userRepository.save(newUser);
 
     return {
         id: savedUser.id,
         firstName: savedUser.firstName,
         lastName: savedUser.lastName,
         email: savedUser.email,
     };



    };
