
import { api } from "./axios";
import type { Store } from '../types/Store';

export const getStoresService = async (): Promise<Store[]> => {
    const response = await api.get("/stores/all");
    return response.data;
};

export const createStoreService = async (store: Omit<Store, 'id'>) => {
    const response = await api.post("/stores/create", store);
    return response.data;
};

export const editStoreService = async (id: string, payload: Partial<Store>) => {
    const response = await api.put(`/stores/edit/${id}`, payload);
    return response.data;
};

export const deleteStoreService = async (id: string) => {
    await api.delete(`/stores/delete/${id}`);
};