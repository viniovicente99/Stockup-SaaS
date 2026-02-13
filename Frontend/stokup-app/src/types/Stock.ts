
export interface Stock{
    id: string;
    store_id: string;
    store_name: string;
    product_sku: string;
    product_gtin: string;
    product_id: string;
    name: string;
    starting_stock: number;
    remainingStock: number;
    daily_consumption: number;
    min_stock: number;
    updatedDate: string;
    status: string;
    daysOfCoverage: number;
};