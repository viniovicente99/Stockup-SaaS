
import { useState } from "react";

import { editProductService } from "../api/product.api";

import type { Product } from "../types/Product";

export function UseEditProduct(){
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [edited, setEdited] = useState(false);

    const editProduct = async(id: string, payload: Partial<Product>) => {
        setEdited(false)
        setError(false);
        setLoading(true);
        try{
            await editProductService(id, payload);
            setEdited(true);
        } catch (err: any){
            setError(false);
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
        editProduct
    };

};

