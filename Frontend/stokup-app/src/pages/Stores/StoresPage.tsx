
import { useEffect, useState } from "react";

import { useGetAllStores } from "../../hooks/UseGetAllStores";
import { StoresTable } from "../../components/StoresTable/StoresTable";
import { useCreateStore } from "../../hooks/UseCreateStore";
import { CreateStore } from "../../components/CreateStore/CreateStore";
import { Modal } from "../../components/Modal/Modal";


export function StoresPage(){

    const { getAllStores, stores, loading, error } = useGetAllStores();

    const {
        createStore, loading: createStoreLoading, error: createStoreError, setError: createStoreSetError,
        created: createStoreCreated, setCreated: createStoreSetCreated
    } = useCreateStore();

    const [openCreateModal, setOpenCreateModal] = useState(false);

    useEffect(() => {
        getAllStores();
    },[]);

    return (
        <div className="flex flex-col w-full mt-6 p-2 pb-20">

            <div className="flex justify-between items-center px-20">
                <h1 className="text-[2rem] font-bold">Lojas</h1>
                <button
                onClick={() => setOpenCreateModal(true)}
                className='bg-gradient-to-r from-[#3B82F6] to-[#2259b3] font-semibold
                text-[#fff] p-2 px-8 rounded-lg hover:bg-gradient-to-b hover:from-[#3B82F6]
                hover:to-[#3B82F6]'>
                    Cadastrar Loja
                </button>
                </div>
                 <p className=" px-20 text-[#707070] text-[0.9rem]">
                   Gerencie todas as suas lojas em um só lugar
                </p>

            <div className="flex-1">                                
                <Modal
                    isOpen={openCreateModal}
                    disableClose={createStoreLoading}
                    onClose={() => {
                        setOpenCreateModal(false); createStoreSetError(null);
                        createStoreSetCreated(false)}}>
                    <CreateStore
                        loadStores={getAllStores}
                        onCreate={createStore}
                        loading={createStoreLoading}
                        error={createStoreError}
                        created={createStoreCreated}
                        onCancel={() => {
                            setOpenCreateModal(false);
                            createStoreSetError(null);
                            createStoreSetCreated(false);
                        }}
                    />
                </Modal>
            </div>

            <StoresTable
            getStores={getAllStores}
            store={stores}
            loading={loading}
            error={error}
            />        
        </div>
    )
};