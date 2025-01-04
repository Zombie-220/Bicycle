import { GetBicyclesByAmount_M } from '../models/bicycles.js';

export const GetBicyclesByAmount_S = async (amount) => { return await GetBicyclesByAmount_M(amount); }