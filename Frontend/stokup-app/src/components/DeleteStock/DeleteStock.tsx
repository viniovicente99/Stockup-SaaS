
import { useState } from "react";

import type { Stock } from "../../types/Stock";

import { LoaderCircle, Package } from "lucide-react";

import { FormsError } from "../FormsError/FormsError";
import { FormSuccess } from "../FormSuccess/FormSuccess";

type DeleteStoreProps = {
    stock: Stock;
    onCancel: () => void;
    onDelete: (id: string) => Promise<void>;
    onSuccess: () => Promise<Stock[]>;
    error: string | null;
    loading: boolean;
    deleted: boolean;    
};

export function DeleteStock
({ stock, onCancel, onDelete, onSuccess, error, loading, deleted}: DeleteStoreProps){   

    async function deleteStore(){

        await onDelete(stock.id);

        await onSuccess();

    };

    return (
        <>
         {!deleted ? (
            <div className="flex flex-col p-6">
                <h3 className="text-[1.8rem] font-semibold text-[#f63b3b]">
                    Remover Estoque
                </h3>
                <p className="text-sm mt-2">
                    Este estoque será excluído permanentemente. Deseja continuar?
                </p>

                {error && (
                    <div className='mt-6'>
                        <FormsError text={error}/>
                    </div>
                )}

                <div className="flex flex-col gap-2 mt-4">

                <div className='flex items-center gap-4 mt-4 mb-2 py-1 px-2 w-full
                text-sm rounded-lg border-2 border-red-300 bg-red-50 text-red-600 font-semibold'>

                <Package size={30}/>

                <p
                className='py-2 rounded-lg focus:outline-none
                focus:outline-none max-w-[80%]'>
                   {stock.name}
                </p>

                <p
                className='rounded-lg focus:outline-none
                focus:outline-none whitespace-nowrap'>
                    Loja: {stock.store_name}
                </p>

                <p
                className='rounded-lg focus:outline-none
                focus:outline-none whitespace-nowrap'>
                    Estoque: {stock.remainingStock}
                </p>
                </div>

                <div className='flex justify-end gap-8 mt-6'>
                    <button
                    type='button'
                    onClick={onCancel}
                    disabled={loading}
                    className='text-gray-500 hover:text-black
                    disabled:pointer-events-none disabled:opacity-70 disabled:cursor-default'>
                        Cancelar
                    </button>

                     <button
                        type='button'
                        onClick={deleteStore}
                        disabled={loading}
                        className={`bg-gradient-to-r from-red-400 to-red-600 font-semibold
                        text-[#fff] p-2 px-8 rounded-lg hover:bg-gradient-to-b hover:from-red-600
                        hover:to-red-800 disabled:pointer-events-none
                        disabled:opacity-70 disabled:cursor-not-allowed`}>
                        {loading ? (                                
                                <div className='flex justify-center px-6'>
                                    <LoaderCircle className='animate-spin' size={25}/>
                                </div>                                   
                                ) : (
                                    'Remover'                              
                                )}
                        </button>
                </div> 
            </div>
        </div>

            ): (
                <div className="flex flex-col p-6">
                    <h3 className="text-[1.8rem] font-semibold text-[#f63b3b]">
                        Estoque Removido
                    </h3>
                    <div className='flex flex-col gap-2 mt-6'>
                        <FormSuccess text="Estoque removido com sucesso."/>
                        <p className="text-sm mt-2 text-gray-700">                            
                        </p> 
                        <div className='flex justify-end gap-8 mt-6'>                          
                        <button
                            type='button'
                            onClick={onCancel}
                            className='bg-gradient-to-r from-[#3B82F6] to-[#2259b3] font-semibold
                            text-[#fff] p-2 px-8 rounded-lg hover:bg-gradient-to-b hover:from-[#3B82F6]
                            hover:to-[#3B82F6] '>
                                Voltar
                        </button>
                    </div>                             
                    </div>
                </div>
            )}
        </>
    )
};
