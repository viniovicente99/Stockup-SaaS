
import { api } from "./axios";
import type { Usuario } from "../types/User";

export const registerService = async (user: Usuario) => {
    await api.post('/users/register', user);
};

export const loginService = async (user: Omit<Usuario, 'id' | 'confirmPassword'>) => {
    const response = await api.post('/users/login', user);
    return response;
};