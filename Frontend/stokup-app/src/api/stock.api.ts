
import { api } from "./axios";
import type { Stock } from "../types/Stock";

export const getAllStockService = async (): Promise<Stock[]>  => {
    const response = await api.get("/products/stock/all");
    return response.data;
};

export const editStockService = async (id: string, payload: Partial<Stock>) => {
    const response = await api.patch(`/products/stock/edit/${id}`, payload);
    return response.data;
};

export const deleteStockService = async (id: string) => {
    await api.delete(`/products/stock/delete/${id}`);
};
