
import { useState, useEffect } from "react";

import type { Store } from "../../types/Store";

import { UseEditStore } from "../../hooks/UseEditStore";
import { useDeleteStore } from "../../hooks/UseDeleteStore";

import { SearchBar } from "../SearchBar/SearchBar";
import { Modal } from "../Modal/Modal";
import { EditStore } from "../EditStore/EditStore";
import { DeleteStore } from "../DeleteStore/DeleteStore";

import { LoaderCircle, RefreshCcw, Trash2} from "lucide-react";

type Props = {
    store: Store[];
    loading: boolean;
    error: boolean;
    getStores: () => Promise<void>;
};

export function StoresTable({store, loading, error, getStores}: Props) {

    const [search, setSearch] = useState("");

    const [selectEditStore, SetSelectEditStore] = useState<Store | null>(null);
    const [selectDeleteStore, SetSelectDeleteStore] = useState<Store | null>(null);

    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const {
        editStore, loading:editStoreLoading, error: editStoreError, setError: editStoreSetError, edited,
        setEdited
    } = UseEditStore();

    const {
        deleteStore, loading:deleteStoreLoading, error: deleteStoreError, setError: deleteStoreSetError, deleted,
        setDeleted
    } = useDeleteStore();

    const filteredStore = 
    search.trim() === ""
    ? store
    : store.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.store_id.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        getStores();
    },[]);

  return (
    <div className="flex flex-col items-center justify-center gap-10 w-full">
        <div className="flex flex-col w-full">

            <div className="flex justify-end w-full px-20 mt-2">
                <SearchBar
                searchTerm={search}
                onSearchChange={setSearch}
                />
            </div>
        </div>

        {store.length === 0 ? ( 
        <div className='flex flex-col gap-2 items-center justify-center w-[90%] px-10 rounded-lg
        '>
            {loading ? (
                <div className="flex flex-col py-12 items-center justify-center gap-2 text-blue-600">
                <LoaderCircle className="animate-spin" size={50} />
                    <p className='animate-pulse text-lg'>Carregando Lojas...</p>
                </div>
            ) : error ? (
                <div className="flex flex-col items-center py-12">
                <p className="text-black font-semibold">
                    Erro ao encontrar lojas.
                 </p>
                 <p className="text-[#545353] text-[0.9rem]">
                    Por favor tente novamente mais tarde.
                </p>
                </div>

            ) : (
                <div className="flex flex-col items-center py-12">
                <p className="text-black font-semibold">
                    Nenhuma loja cadastrada.
                 </p>
                 <p className="text-[#545353] text-[0.9rem]">
                    Cadastre suas lojas através do botão no canto superior direito.
                </p>
                </div>
            )}
        </div>
        ) : (
        <>
        <table className="w-[90%] bg-white rounded-lg shadow-md overflow-hidden">
                    <thead className="bg-gray-100 sticky top-0 z-10">
                    <tr className="text-[0.75rem] text-gray-600 uppercase tracking-wide">

                    <th className="px-6 py-4 text-left w-[40%]">Código</th>

                    <th className="px-6 py-3 text-left w-[60%] whitespace-nowrap">
                        Nome
                    </th>

                    <th className="px-4 py-4 text-center w-[20%] whitespace-nowrap">
                        Ações
                    </th>
                    
                    </tr>
                </thead>

                <tbody>
                    {filteredStore.length > 0 ? (
                    filteredStore.map((store) => (
                        <tr
                        key={store.id}
                        className="text-[0.8rem] font-medium even:bg-gray-50 hover:bg-gray-100 transition
                        text-gray-700">
                        <td className="px-6 py-3 font-semibold">
                            {store.store_id}
                        </td>

                        <td className="px-6 py-3 text-left">
                            {store.name}
                        </td>

                        <td className="px-4 py-3">
                            <div className="flex justify-center gap-3 whitespace-nowrap">
                            <button
                                onClick={(e) => {
                                e.stopPropagation();
                                SetSelectEditStore(store);
                                }}
                                className="p-2 rounded-md text-blue-600 hover:bg-blue-100 transition"
                                title="Editar"
                            >
                                <RefreshCcw size={16} />
                            </button>

                            <button
                                onClick={(e) => {
                                e.stopPropagation();
                                SetSelectDeleteStore(store);
                                }}
                                className="p-2 rounded-md text-red-600 hover:bg-red-100 transition"
                                title="Excluir"
                            >
                                <Trash2 size={16} />
                            </button>
                            </div>
                        </td>
                        </tr>
                    ))
                    ) : (
                    <tr>
                        <td
                        colSpan={3}
                        className="py-10 text-center text-gray-400 font-semibold"
                        >
                        Nenhuma loja encontrada.
                        </td>
                    </tr>
                    )}
                </tbody>
                </table>
       {selectEditStore && (
                <Modal
                isOpen={true}
                disableClose={editStoreLoading}
                onClose={() => {
                        SetSelectEditStore(null);
                        setOpenEditModal(false);
                        setEdited(false);
                        editStoreSetError(false);
                    }}>
                    <EditStore
                    onEdit={editStore}
                    loading={editStoreLoading}
                    onSuccess={getStores}
                    error={editStoreError}
                    edited={edited}
                    store={selectEditStore}                    
                    onCancel={() => {
                        SetSelectEditStore(null);      
                        editStoreSetError(false);
                        setEdited(false);                                
                    }}
                    />
                </Modal>
            )}

            {selectDeleteStore && (
                <Modal
                disableClose={deleteStoreLoading}
                isOpen={true}
                onClose={() => {
                    SetSelectDeleteStore(null);
                    setOpenDeleteModal(false);
                    setDeleted(false);
                    deleteStoreSetError(null);
                    }}>
                    <DeleteStore
                    onDelete={deleteStore}
                    onSuccess={getStores}
                    error={deleteStoreError}
                    loading={deleteStoreLoading}
                    deleted={deleted}
                    store={selectDeleteStore}
                    onCancel={() => {
                        SetSelectDeleteStore(null);
                        deleteStoreSetError(null);
                        setDeleted(false);
                    }}/>
                </Modal>
            )}
       </>
        )}          
    </div>
  );
}