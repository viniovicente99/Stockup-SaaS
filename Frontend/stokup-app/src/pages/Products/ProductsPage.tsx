
import { useEffect, useState } from "react";

import { useGetAllProducts } from "../../hooks/UseGetAllProducts";

import { ProductsTable } from "../../components/ProductsTable/ProductsTable";
import { NavLink } from "react-router-dom";



export function ProductsPage(){

    const { getAllProducts, products, loading, error } = useGetAllProducts();

    const [openCreateModal, setOpenCreateModal] = useState(false);

    useEffect(() => {
        getAllProducts();
    },[]);

    return (
        <div className="flex flex-col w-full mt-6 p-2 pb-20">

            <div className="flex justify-between items-center px-20">
                <h1 className="text-[2rem] font-bold">Produtos</h1>
                <NavLink
                to="/stock"
                state={{ openCreateModal: true }}
                >
                <button
                type="button"
                className='bg-gradient-to-r from-[#3B82F6] to-[#2259b3] font-semibold
                text-[#fff] p-2 px-8 rounded-lg hover:bg-gradient-to-b hover:from-[#3B82F6]
                hover:to-[#3B82F6]'>
                    Cadastrar Produto
                </button>
                </NavLink>
                </div>
                 <p className=" px-20 text-[#707070] text-[0.9rem]">
                    Gerencie todos os seus produtos em um só lugar
                </p>

            <ProductsTable
            getProducts={getAllProducts}
            product={products}
            loading={loading}
            error={error}
            />        
        </div>
    )
};