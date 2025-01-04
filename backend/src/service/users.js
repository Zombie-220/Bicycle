import { CreateUser_M } from "../models/users.js";

export const CreateUser_S = async (userData) => { return await CreateUser_M(userData); }