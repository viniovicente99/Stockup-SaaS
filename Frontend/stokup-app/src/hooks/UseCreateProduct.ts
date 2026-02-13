
import { useState } from "react";

import { createProductService } from "../api/product.api";

import type { Product } from "../types/Product";

export function useCreateProduct(){

    type createProductError =
    | 'Erro ao cadastrar produto, tente novamente mais tarde.'
    | null

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<createProductError>(null);
    const [created, setCreated] = useState(false);

    const createProduct = async(product: Omit<Product, 'id'>) => {
        setError(null);
        setLoading(true);
        try {
            await createProductService(product);
            setCreated(true);
        } catch (err: any){
            if(err.response.data?.message){
                setError(err.response.data.message);
            } else {
                setError('Erro ao cadastrar produto, tente novamente mais tarde.');
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
        setError,
        created,
        setCreated,
        createProduct
    };

};


