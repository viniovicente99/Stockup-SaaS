
import { api } from "./axios";
import type { Product } from "../types/Product";

export const createProductService = async(product: Omit<Product, 'id'>) => {
    const response = await api.post("/products/register", product);
    return response.data;
};

export const getProductService = async(): Promise<Product[]> => {
    const response = await api.get("/products/all");
    return response.data;
};

export const editProductService = async(id: string, payload: Partial<Product>) => {
    const response = await api.put(`/products/edit/${id}`, payload);
    return response.data;
};

export const deleteProductService = async (id: string) => {
    await api.delete(`/products/delete/${id}`);
};

