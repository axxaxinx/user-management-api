import { getRepository } from "typeorm";
import { User } from "./user.model";

// List all users
export const listUsers = async () => {
    const userRepository = getRepository(User);
    return await userRepository.find();
};

// Retrieve a single user by ID
export const getUserById = async (id: number) => {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
        throw new Error(`User with ID ${id} not found`);
    }

    return user;
};
