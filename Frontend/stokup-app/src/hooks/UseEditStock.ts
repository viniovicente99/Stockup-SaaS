
import { useState } from "react";

import type { Stock } from "../types/Stock";

import { editStockService } from "../api/stock.api";

export function UseEditStock(){

    type editStockError =
    | 'Erro ao editar estoque, tente novamente mais tarde.'
    | null
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<editStockError>(null);
    const [edited, setEdited] = useState(false);

    const editStock = async(id: string, payload: Partial<Stock>) => {
        setEdited(false);
        setError(null);
        setLoading(true);
        try{
            await editStockService(id, payload);
            setEdited(true);
        } catch (err: any){
            if(err.response.data?.message){
                setError(err.response.data.message);
            } else {
                setError('Erro ao editar estoque, tente novamente mais tarde.');
            }
            setEdited(false);
            throw err;
        } finally {
            setLoading(false);
        };
    };

    return {
        loading,
        error,
        setError,
        edited,
        setEdited,
        editStock
    };

};

