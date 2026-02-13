
import { useState } from "react";

import { createStoreService } from "../api/store.api";

import type { Store } from "../types/Store";

export function useCreateStore(){

    type CreateStoreError =
    | 'Erro ao cadastrar loja, tente novamente mais tarde.'
    | null

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<CreateStoreError>(null);
    const [created, setCreated] = useState(false); 

    const createStore = async (store: Omit<Store, 'id'>) => {
        setCreated(false);
        setError(null);
        setLoading(true);
        try{
            await createStoreService(store);
            setCreated(true);
        } catch(err: any) {
           if(err.response?.data?.message){
                setError(err.response.data.message);
            } else {
                setError('Erro ao cadastrar loja, tente novamente mais tarde.');
            }
            setCreated(false);
            throw err;
        } finally {
            setLoading(false);
        };
    };

    return {
        loading,
        error,
        setError,
        created,
        setCreated,
        createStore
    };

};

