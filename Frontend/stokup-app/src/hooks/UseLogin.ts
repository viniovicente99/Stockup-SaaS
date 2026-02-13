
import { useState } from "react";

import { loginService } from "../api/user.api";
import { setAuthToken } from "../api/axios";

import type { Usuario } from "../types/User";


export function UseLogin(){
    type LoginError = 
    | 'Erro ao fazer login, tente novamente mais tarde.'
    | null

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<LoginError>(null);

    const loginUser = async(user: Omit<Usuario, 'id' | 'confirmPassword'>) => {
        setError(null);
        setLoading(true);
        try {
            const response = await loginService(user);

            const { accessToken, userCredentials } = response.data;

            setAuthToken(accessToken);
            
            localStorage.setItem('token', accessToken);
            localStorage.setItem('name', userCredentials.name);
            localStorage.setItem('email', userCredentials.email);

            return response.data;

        } catch(err: any){
            if(err.response?.data?.message){
                setError(err.response.data.message);
            } else {
                setError('Erro ao fazer login, tente novamente mais tarde.')
            }
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        loginUser
    };
};