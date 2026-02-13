
import { useState } from "react";

import type { Stock } from "../types/Stock";

import { api } from "../api/axios";

export function useGetStock(){

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [stock, setStock] = useState<Stock[]>([]);

    const getStock = async(storeId?: string): Promise<Stock[]> => {
        setLoading(true);
        try {
            const url = storeId
            ? `/products/stock/store/${storeId}`
            : `/products/stock/all`

            const response = await api.get<Stock[]>(url);
            
            const stockData = response.data;

            setStock(stockData);
            return stockData;
        } catch(err){
            console.log(err);
            setError(true);
            return [];
        } finally{
            setLoading(false);
        };

    };

     return {
        loading,
        error,
        getStock,
        stock
    };

};