
import { useState } from "react";

import { deleteProductService } from "../api/product.api";

export function useDeleteProduct(){

    type CreateStoreError =
    | 'Erro ao excluir produto, tente novamente mais tarde.'
    | null

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<CreateStoreError>(null);
    const [deleted, setDeleted] = useState(false);

    const deleteProduct = async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            await deleteProductService(id);
            setDeleted(true);
        } catch (err: any){
            if(err.response?.data?.message){
                setError(err.response.data.message);
            } else {
                setError('Erro ao excluir produto, tente novamente mais tarde.');
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
        deleteProduct,
        deleted,
        setDeleted,
    }


};