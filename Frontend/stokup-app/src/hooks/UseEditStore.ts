
import { useState } from "react";

import { editStoreService } from "../api/store.api";

import type { Store } from "../types/Store";


export function UseEditStore(){
  
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [edited, setEdited] = useState(false); 

    const editStore = async (id: string, payload: Partial<Store>) => {
        setEdited(false);
        setError(false);
        setLoading(true);
        try{
            await editStoreService(id, payload);
            setEdited(true);    
        } catch (error){
            setError(true);
        } finally{
            setLoading(false);
        }
        };

    return {
        loading,
        error,
        setError,
        editStore,
        edited,
        setEdited
    };

};