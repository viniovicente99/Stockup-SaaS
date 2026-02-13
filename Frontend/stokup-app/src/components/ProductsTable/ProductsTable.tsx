
import { useState, useEffect } from "react";

import type { Product } from "../../types/Product";

import { UseEditProduct } from "../../hooks/UseEditProduct";
import { useDeleteProduct } from "../../hooks/UseDeleteProduct";

import { SearchBar } from "../SearchBar/SearchBar";
import { Modal } from "../Modal/Modal";
import { EditProduct } from "../EditProduct/EditProduct";
import { DeleteProduct } from "../DeleteProduct/DeleteProduct";

import { LoaderCircle, Trash2, RefreshCcw} from "lucide-react";





type Props = {
    product: Product[];
    loading: boolean;
    error: boolean;
    getProducts: () => Promise<void>;
};

export function ProductsTable({product, loading, error, getProducts}: Props) {

    const [search, setSearch] = useState("");

    const [selectEditProduct, SetSelectEditProduct] = useState<Product | null>(null);

    const [selectDeleteProduct, SetSelectDeleteProduct] = useState<Product | null>(null);

    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const {
        editProduct, loading:editProductLoading, error: editProductError,
        setError: editProductSetError, edited, setEdited
    } = UseEditProduct();

    const {
        deleteProduct, loading:deleteProductLoading, error: deleteProductError,
        setError: deleteProductSetError, deleted, setDeleted
    } = useDeleteProduct();

    const filteredProduct = 
    search.trim() === ""
    ? product
    : product.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.sku.toLowerCase().includes(search.toLowerCase()) ||
        item.gtin.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        getProducts();
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

        {product.length === 0 ? ( 
        <div className='flex flex-col gap-2 items-center justify-center w-[90%] px-10 rounded-lg
        '>
            {loading ? (
                <div className="flex flex-col py-12 items-center justify-center gap-2 text-blue-600">
                <LoaderCircle className="animate-spin" size={50} />
                    <p className='animate-pulse text-lg'>Carregando Produtos...</p>
                </div>
            ) : error ? (
                <div className="flex flex-col items-center py-12">
                <p className="text-black font-semibold">
                    Erro ao encontrar produtos.
                 </p>
                 <p className="text-[#545353] text-[0.9rem]">
                    Por favor tente novamente mais tarde.
                </p>
                </div>

            ) : (
                <div className="flex flex-col items-center py-12">
                <p className="text-black font-semibold">
                    Nenhum produto cadastrado.
                 </p>
                 <p className="text-[#545353] text-[0.9rem]">
                    Cadastre seus produtos através do botão no canto superior direito.
                </p>
                </div>
            )}
                </div>
                    ) : (
                        <>
                <table className="w-[90%] bg-white rounded-lg shadow-md overflow-hidden">
                    <thead className="bg-gray-100 sticky top-0 z-10">
                    <tr className="text-[0.75rem] text-gray-600 uppercase tracking-wide">

                    <th className="px-6 py-4 text-left w-[40%]">Produto</th>

                    <th className="px-6 py-3 text-left w-[20%] whitespace-nowrap">
                        Sku
                    </th>

                    <th className="px-6 py-4 text-left w-[30%] whitespace-nowrap">
                        Gtin
                    </th>

                    <th className="px-4 py-4 text-center w-[20%] whitespace-nowrap">
                        Ações
                    </th>
                    
                    </tr>
                </thead>

                <tbody>
                    {filteredProduct.length > 0 ? (
                    filteredProduct.map((product) => (
                        <tr
                        key={product.id}
                        className="text-[0.8rem] font-medium even:bg-gray-50 hover:bg-gray-100 transition
                        text-gray-700">
                        <td className="px-6 py-3 font-semibold">
                            {product.name}
                        </td>

                        <td className="px-6 py-3 text-left">
                            {product.sku}
                        </td>

                        <td className="px-6 py-3 text-left">
                            {product.gtin}
                        </td>

                        <td className="px-4 py-3">
                            <div className="flex justify-center gap-3 whitespace-nowrap">
                            <button
                                onClick={(e) => {
                                e.stopPropagation();
                                SetSelectEditProduct(product);
                                }}
                                className="p-2 rounded-md text-blue-600 hover:bg-blue-100 transition"
                                title="Editar"
                            >
                                <RefreshCcw size={16} />
                            </button>

                            <button
                                onClick={(e) => {
                                e.stopPropagation();
                                SetSelectDeleteProduct(product);
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
                        colSpan={5}
                        className="py-10 text-center text-gray-400 font-semibold"
                        >
                        Nenhum produto encontrado.
                        </td>
                    </tr>
                    )}
                </tbody>
                </table>
       {selectEditProduct && (
                <Modal
                isOpen={true}
                disableClose={editProductLoading}
                onClose={() => {
                        SetSelectEditProduct(null);
                        setOpenEditModal(false);
                        setEdited(false);
                        editProductSetError(false);
                    }}>
                    <EditProduct
                    onEdit={editProduct}
                    loading={editProductLoading}
                    onSuccess={getProducts}
                    error={editProductError}
                    edited={edited}
                    product={selectEditProduct}                    
                    onCancel={() => {
                        SetSelectEditProduct(null);      
                        editProductSetError(false);
                        setEdited(false);                                
                    }}
                    />
                </Modal>
            )}

            {selectDeleteProduct && (
                <Modal
                disableClose={deleteProductLoading}
                isOpen={true}
                onClose={() => {
                    SetSelectDeleteProduct(null);
                    setOpenDeleteModal(false);
                    setDeleted(false);
                    deleteProductSetError(null);
                    }}>
                    <DeleteProduct
                    onDelete={deleteProduct}
                    onSuccess={getProducts}
                    error={deleteProductError}
                    loading={deleteProductLoading}
                    deleted={deleted}
                    product={selectDeleteProduct}
                    onCancel={() => {
                        SetSelectDeleteProduct(null);
                        deleteProductSetError(null);
                        setDeleted(false);
                    }}/>
                </Modal>
            )}
       </>
        )}          
    </div>
  );
}