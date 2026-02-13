
import { useState } from "react";

import { registerService } from '../api/user.api';

import type { Usuario } from "../types/User";

export function UseRegister(){

      type RegisterError =
    | 'Erro ao criar conta, tente novamente mais tarde.'
    | null
    
    const [loading, setLoading] = useState(false);
    const [created, setCreated] = useState(false);
    const [error, setError] = useState<RegisterError>(null);

    const registerUser = async(user: Usuario) => {
        setError(null);
        setLoading(true);
        try{
            await registerService(user);
            setCreated(true);
        } catch(err: any){
            if(err.response?.data?.message){
                setError(err.response.data.message);
            } else {
                setError('Erro ao criar conta, tente novamente mais tarde.');
            }
            setCreated(false);
            throw err;
        } finally{
            setLoading(false);
        }

    };

    return {
        loading,
        error,
        created,
        registerUser
    };
    
};