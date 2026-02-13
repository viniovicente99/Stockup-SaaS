
import { useState } from "react";

import type { Store } from "../../types/Store";

import { LoaderCircle } from "lucide-react";

import { FormsError } from "../FormsError/FormsError";
import { FormSuccess } from "../FormSuccess/FormSuccess";

import { Store as StoreIcon } from "lucide-react";

type DeleteStoreProps = {
    store: Store;
    onCancel: () => void;
    onDelete: (id: string) => Promise<void>;
    onSuccess: () => Promise<void>;
    error: string | null;
    loading: boolean;
    deleted: boolean;    
};

export function DeleteStore
({ store, onCancel, onDelete, onSuccess, error, loading, deleted}: DeleteStoreProps){   

    async function deleteStore(){

        await onDelete(store.id);

        await onSuccess();

    };

    return (
        <>
         {!deleted ? (
            <div className="flex flex-col p-6">
                <h3 className="text-[1.8rem] font-semibold text-[#f63b3b]">Excluir Loja</h3>
                <p className="text-sm mt-2">Esta loja será excluída permanentemente. Deseja continuar?</p>

                {error && (
                    <div className='mt-6'>
                        <FormsError text={error}/>
                    </div>
                )}

                <div className='flex items-center gap-4 mt-8 py-1 px-2 w-full
                text-sm rounded-lg border-2 border-red-300 bg-red-50 text-red-600 font-semibold'>

                <StoreIcon size={30}/>

                <p
                className='py-2 rounded-lg focus:outline-none
                focus:outline-none whitespace-nowrap'>
                   Código: {store.store_id}
                </p>

                <p
                className='rounded-lg focus:outline-none
                focus:outline-none max-w-[80%]'>
                    Nome: {store.name}
                </p>

                </div>

                <div
                className="flex flex-col gap-2 mt-4">            

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
                                        'Excluir'                              
                                    )}
                            </button>
                    </div> 
                </div>
            </div>

            ): (
                <div className="flex flex-col p-6">
                    <h3 className="text-[1.8rem] font-semibold text-[#f63b3b]">
                        Loja Excluída
                    </h3>
                    <div className='flex flex-col gap-2 mt-6'>
                        <FormSuccess text="Loja excluída com sucesso."/>
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
