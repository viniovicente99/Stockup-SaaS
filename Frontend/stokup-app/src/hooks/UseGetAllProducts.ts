
import { useState } from "react";

import { getProductService } from "../api/product.api";

import type { Product } from "../types/Product";


export function useGetAllProducts(){

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);

    const getAllProducts = async (): Promise<void> => {
        setLoading(true);
        try {
            const data = await getProductService();
            setProducts(data);
        } catch (err){
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        products,
        getAllProducts
    };
};

