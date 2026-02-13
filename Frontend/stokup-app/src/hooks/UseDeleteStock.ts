
import { useState } from "react";

import { deleteStockService } from "../api/stock.api";

export function useDeleteStock(){

    type CreateStoreError =
    | 'Erro ao excluir estoque, tente novamente mais tarde.'
    | null

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<CreateStoreError>(null);
    const [deleted, setDeleted] = useState(false);

    const deleteStock = async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            await deleteStockService(id);
            setDeleted(true);
        } catch (err: any){
            if(err.response?.data?.message){
                setError(err.response.data.message);
            } else {
                setError('Erro ao excluir estoque, tente novamente mais tarde.');
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
        deleteStock,
        deleted,
        setDeleted,
    }


};