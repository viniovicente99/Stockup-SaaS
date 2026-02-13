
import type { Store } from '../../types/Store';

import { FormsError } from "../FormsError/FormsError"
import { useForm } from "react-hook-form";
import z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";


import { FormSuccess } from '../FormSuccess/FormSuccess';

import { LoaderCircle } from 'lucide-react';


type CreateStoreProps = {
    onCancel: () => void;
    onCreate: (store: Omit<Store, 'id'>) => Promise<void>;
    loading: boolean;
    loadStores: () => Promise<void>;
    error: string | null;
    created: boolean;
};

export function CreateStore({onCancel, onCreate, error, loading, created, loadStores}: CreateStoreProps){

    const formSchema = z.object({
        store_id: z.string()
        .min(1, "O código da loja é obrigatório.")
        .max(20, "Limite máximo de 20 caracteres."),
        name: z.string().min(1, "O nome da loja é obrigatório.")
    });

    type FormData = z.infer<typeof formSchema>

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm<FormData>({
        resolver: zodResolver(formSchema)
    });

    async function onSubmit(data: FormData){

        try{            
            await onCreate({
                store_id: data.store_id,
                name: data.name
            });
            
            await loadStores();

            reset();
        } catch (err){
            return console.log(err);
        }
    };

    return (
        <div className="flex flex-col p-6">
            <h3 className="text-[1.8rem] font-semibold text-[#3B82F6]">Cadastrar Loja</h3>
            
            {error && (
                <div className='mt-6'>
                <FormsError text={error}/>
                </div>
            )}

            {created && (
                <div className='mt-6'>
                <FormSuccess text={"Loja cadastrada com sucesso."}/>
                </div>
            )}
            
            <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2 mt-6">
                <div className="relative group w-4">
                    <label className='font-semibold'>Código</label>
                    <span className="absolute bottom-[0px] left-[240px]
                    opacity-0 group-hover:opacity-100 
                    pointer-events-none
                    bg-gray-700 text-white text-sm px-2 py-1 
                    rounded whitespace-nowrap 
                    transform -translate-x-1/2">
                         Código identificador da loja, este valor deve ser único.
                    </span>
                </div>
                <input
                    type="text"
                    placeholder="0001"
                    disabled={loading}
                    {...register('store_id')}
                    className='w-full px-6 py-2 bg-[#EBEBEB] rounded-lg focus:outline-none
                    disabled:opacity-60'/>
                    <p className='text-red-700 text-sm'>
                        {errors.store_id?.message}
                    </p>

                <div className="relative group w-4">
                <label className='font-semibold'>Nome</label>
                <span className="absolute bottom-[0px] left-[210px]
                 opacity-0 group-hover:opacity-100 
                    pointer-events-none
                    bg-gray-700 text-white text-sm px-2 py-1 
                    rounded whitespace-nowrap 
                    transform -translate-x-1/2">
                         Nome usado para identificar a loja no estoque.
                    </span>
                </div>

                <input
                    type="text"
                    disabled={loading}
                    placeholder="Loja Centro SP"
                    {...register('name')}
                    className='w-full px-6 py-2 bg-[#EBEBEB] rounded-lg focus:outline-none
                    disabled:opacity-60'/>
                    <p className='text-red-700 text-sm'>
                        {errors.name?.message}
                    </p>

                    <div className='flex justify-end gap-8 mt-6'>
                        <button
                        type='button'
                        disabled={loading}
                        onClick={onCancel}
                        className='text-gray-500 hover:text-black disabled:pointer-events-none
                        disabled:opacity-70 disabled:cursor-not-allowed'>
                            Cancelar
                        </button>

                        <button
                        type='submit'
                        disabled={loading}
                        className={`bg-gradient-to-r from-[#3B82F6] to-[#2259b3] font-semibold
                        text-[#fff] p-2 px-8 rounded-lg hover:bg-gradient-to-b hover:from-[#3B82F6]
                        hover:to-[#3B82F6] disabled:pointer-events-none
                        disabled:opacity-70 disabled:cursor-not-allowed`}>
                           {loading ? (                                
                                    <div className='flex justify-center px-6'>
                                        <LoaderCircle className='animate-spin' size={25}/>
                                    </div>                                   
                                ) : (
                                    'Cadastrar'                              
                                )}
                        </button>
                    </div> 
            </form>
        </div>
    )
};