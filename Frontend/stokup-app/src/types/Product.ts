
export interface StockCreate {
    store_id: string;
    starting_stock?: number;
    daily_consumption?: number;
    min_stock?: number;
};

export interface Product {
    id: string;
    name: string;
    gtin: string;
    sku: string;
    stores: StockCreate[];   
};