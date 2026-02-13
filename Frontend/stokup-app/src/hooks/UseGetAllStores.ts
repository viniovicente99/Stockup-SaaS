
import { useState } from "react";

import { getStoresService } from '../api/store.api';

import type { Store } from "../types/Store";

export function useGetAllStores(){

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [stores, setStores] = useState<Store[]>([]);

    const getAllStores = async (): Promise<void> => {
        setLoading(true);
        try {
            const data = await getStoresService();
            setStores(data);
        } catch (err){
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        stores,
        getAllStores
    };
};

