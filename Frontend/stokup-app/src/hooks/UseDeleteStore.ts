
import { useState } from "react";

import { deleteStoreService } from "../api/store.api";

export function useDeleteStore(){

    type CreateStoreError =
    | 'Erro ao excluir loja, tente novamente mais tarde.'
    | null

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<CreateStoreError>(null);
    const [deleted, setDeleted] = useState(false);

    const deleteStore = async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            await deleteStoreService(id);
            setDeleted(true);
        } catch (err: any){
            if(err.response?.data?.message){
                setError(err.response.data.message);
            } else {
                setError('Erro ao excluir loja, tente novamente mais tarde.');
            }
            setDeleted(false);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        error,
        loading,
        setError,
        deleteStore,
        deleted,
        setDeleted,
    }


};