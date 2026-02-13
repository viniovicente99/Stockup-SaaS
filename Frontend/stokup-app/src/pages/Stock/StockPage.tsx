
import { useEffect, useState } from "react";

import { Modal } from "../../components/Modal/Modal";
import { StockTable } from "../../components/StockTable/StockTable";
import { CreateProductButton } from "../../components/CreateProduct/CreateProduct";

import { useGetStock } from "../../hooks/UseGetStock";
import { useCreateProduct } from "../../hooks/UseCreateProduct";
import { useGetAllStores } from "../../hooks/UseGetAllStores";

import { useLocation } from "react-router-dom";

export function StockPage(){

    const { getStock, stock, loading, error } = useGetStock();

    const { getAllStores, stores } = useGetAllStores();
    
    const {
        createProduct, loading: createProductLoading, error: createProductError,
        setError: createProductSetError, created: createProductCreated, setCreated: createProductSetCreated
    } = useCreateProduct();

    const location = useLocation();

    const [openCreateModal, setOpenCreateModal] = useState(
        location.state?.openCreateModal || false
    );  

    useEffect(() => {
        getStock();
        if(location.state?.openCreateModal){
            window.history.replaceState({}, document.title)
        }
    },[]);

     useEffect(() => {
        getAllStores();
    },[]);

    return (
        <div className="flex flex-col w-full mt-6 p-2 pb-20">

            <div className="flex justify-between items-center px-20">
                <h1 className="text-[2rem] font-bold">Estoque</h1>
                <button
                onClick={() => setOpenCreateModal(true)}
                className='bg-gradient-to-r from-[#3B82F6] to-[#2259b3] font-semibold
                text-[#fff] p-2 px-8 rounded-lg hover:bg-gradient-to-b hover:from-[#3B82F6]
                hover:to-[#3B82F6]'>
                    Cadastrar Produto
                </button>
                </div>
                 <p className=" px-20 text-[#707070] text-[0.9rem]">
                    Gerencie todo o seu estoque em um só lugar
                </p>

            <div className="flex-1">                                
                <Modal
                    isOpen={openCreateModal}
                    disableClose={createProductLoading}
                    onClose={() => {
                        setOpenCreateModal(false); createProductSetError(null);
                        createProductSetCreated(false)}}>
                    <CreateProductButton
                        getStock={getStock}
                        getAllStores={getAllStores}
                        store={stores}
                        onCreate={createProduct}
                        loading={createProductLoading}
                        error={createProductError}
                        created={createProductCreated}
                        onCancel={() => {
                            setOpenCreateModal(false);
                            createProductSetError(null);
                            createProductSetCreated(false);
                        }}
                    />
                </Modal>
            </div>

            <StockTable
            getStock={getStock}
            stock={stock}
            loading={loading}
            error={error}
            />        
        </div>
    )
};