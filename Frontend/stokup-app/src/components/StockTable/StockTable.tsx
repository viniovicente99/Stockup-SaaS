
import { useState, useEffect } from "react";

import type { Stock } from "../../types/Stock";

import { useDeleteStock } from "../../hooks/UseDeleteStock";

import { SearchBar } from "../SearchBar/SearchBar";
import { Modal } from "../Modal/Modal";
import { DeleteStock } from "../DeleteStock/DeleteStock";


import { LoaderCircle, Trash2, RefreshCcw} from "lucide-react";
import { EditStock } from "../EditStock/EditStock";
import { UseEditStock } from "../../hooks/UseEditStock"

type Props = {
    stock: Stock[];
    loading: boolean;
    error: boolean;
    getStock: () => Promise<Stock[]>;

};

export function StockTable({stock, loading, error, getStock}: Props) {

    const [search, setSearch] = useState("");

    const [selectDeleteStock, setSelectDeleteStock] = useState<Stock | null>(null);

    const [selectEditStock, setSelectEditStock] = useState<Stock | null>(null);

    const [openEditModal, setOpenEditModal] = useState(false);

    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const {
        editStock, loading: editStockLoading, error: editStockError, setError: editStockSetError,
        edited, setEdited
    } = UseEditStock();

    const {
        deleteStock, loading: deleteStockLoading, error: deleteStockError, setError: deleteStockSetError,
        deleted, setDeleted
    } = useDeleteStock();

    const filteredStock = 
    search.trim() === ""
    ? stock
    : stock.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.store_name.toLowerCase().includes(search.toLowerCase()) 
    );

    useEffect(() => {
        getStock();
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

        {stock.length === 0 ? ( 
        <div className='flex flex-col gap-2 items-center justify-center w-[90%] px-10 rounded-lg
        '>
            {loading ? (
                <div className="flex flex-col py-12 items-center justify-center gap-2 text-blue-600">
                <LoaderCircle className="animate-spin" size={50} />
                    <p className='animate-pulse text-lg'>Carregando Estoque...</p>
                </div>
            ) : error ? (
                <div className="flex flex-col items-center py-12">
                <p className="text-black font-semibold">
                    Erro ao encontrar estoque.
                 </p>
                 <p className="text-[#545353] text-[0.9rem]">
                    Por favor tente novamente mais tarde.
                </p>
                </div>

            ) : (
                <div className="flex flex-col items-center py-12">
                <p className="text-black font-semibold">
                    Nenhum estoque cadastrado.
                 </p>
                 <p className="text-[#545353] text-[0.9rem]">
                    Cadastre seu estoque através do botão no canto superior direito.
                </p>
                </div>
            )}
        </div>
        ) : (
        <>
          <table className="w-[90%] bg-white rounded-lg shadow-md overflow-hidden">
      <thead className="bg-gray-100 sticky top-0 z-10">
      <tr className="text-[0.75rem] text-gray-600 uppercase tracking-wide">
        <th className="px-6 py-4 text-left w-[28%]">Produto</th>
        <th className="px-6 py-4 text-left w-[15%]">Loja</th>

        <th className="px-4 py-4 text-right w-[8%] whitespace-nowrap">
          Estoque Inicial
        </th>
        <th className="px-4 py-4 text-right w-[8%] whitespace-nowrap">
          Estoque Atual
        </th>

        <th className="px-4 py-4 text-right w-[8%] whitespace-nowrap">
          Estoque Mínimo
        </th>

        <th className="px-4 py-4 text-right w-[10%] whitespace-nowrap">
          Consumo / dia
        </th>

        <th className="px-4 py-4 text-right w-[10%] whitespace-nowrap">
          Cobertura
        </th>

        <th className="px-4 py-4 text-center w-[13%] whitespace-nowrap">
          Atualização
        </th>

        <th className="px-4 py-4 text-center w-[8%] whitespace-nowrap">
          Ações
        </th>
      </tr>
    </thead>

    <tbody>
      {filteredStock.length > 0 ? (
        filteredStock.map((stock) => (
          <tr
            key={stock.id}
              className={`text-[0.8rem] font-medium hover:bg-gray-100 transition
              ${stock.status === "Crítico" ? "bg-red-50 text-red-600 hover:bg-red-100"
              :"text-gray-700 even:bg-gray-50 "}
              `}
          >
            <td className="px-6 py-3 font-semibold">
              {stock.name}
            </td>
            
            <td className="px-6 py-3">
              {stock.store_name}
            </td>

            <td className="px-4 py-3 text-right">
              {stock.starting_stock}
            </td>

            <td className="px-4 py-3 text-right font-bold">
              {stock.remainingStock ===0 ? "Sem Estoque" : stock.remainingStock}
            </td>

            <td className="px-4 py-3 text-right">
              {stock.min_stock}
            </td>

            <td className="px-4 py-3 text-right whitespace-nowrap">
              {stock.daily_consumption}
            </td>

            <td className="px-4 py-3 text-right whitespace-nowrap">
              {stock.daysOfCoverage} dias
            </td>

            <td className="px-4 py-3 text-center text-gray-500 whitespace-nowrap">
              {stock.updatedDate}
            </td>

            <td className="px-4 py-3">
              <div className="flex justify-center gap-3 whitespace-nowrap">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectEditStock(stock);
                  }}
                  className="p-2 rounded-md text-blue-600 hover:bg-blue-100 transition"
                  title="Atualizar"
                >
                  <RefreshCcw size={16} />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectDeleteStock(stock);
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
            colSpan={8}
            className="py-10 text-center text-gray-400 font-semibold"
          >
            Nenhum produto encontrado.
          </td>
        </tr>
      )}
    </tbody>
  </table>

          {selectEditStock && (
                <Modal
                isOpen={true}
                disableClose={editStockLoading}
                onClose={() => {
                      setSelectEditStock(null);
                      setOpenEditModal(false);
                      setEdited(false);
                      editStockSetError(null);
                  }}>
                  <EditStock
                      onEdit={editStock}
                      onSuccess={async () => {
                        await getStock();
                      }}
                      error={editStockError}
                      loading={editStockLoading}
                      edited={edited}
                      stock={selectEditStock}
                      onCancel={() => {
                      setSelectEditStock(null);
                      editStockSetError(null);
                      setEdited(false);
                      }}/>
              </Modal>
          )}

       {selectDeleteStock && (
                <Modal
                isOpen={true}
                disableClose={deleteStockLoading}
                onClose={() => {
                        setSelectDeleteStock(null);
                        setOpenDeleteModal(false);
                        setDeleted(false);
                        deleteStockSetError(null);
                    }}>
                    <DeleteStock
                        onDelete={deleteStock}
                        onSuccess={getStock}
                        error={deleteStockError}
                        loading={deleteStockLoading}
                        deleted={deleted}
                        stock={selectDeleteStock}
                        onCancel={() => {
                        setSelectDeleteStock(null);
                        deleteStockSetError(null);
                        setDeleted(false);
                        }}/>
                </Modal>
            )}     
       </>
        )}         
    </div>
  );
}