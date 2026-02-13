
import type { Product } from '../../types/Product';

import { useForm } from 'react-hook-form';
import z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';

import { useEffect } from 'react';

import { FormsError } from '../FormsError/FormsError';
import { FormSuccess } from '../FormSuccess/FormSuccess';

import { LoaderCircle, Milk } from 'lucide-react';

type EditStoreProps = {
    product: Product; 
    onCancel: () => void;
    onSuccess: () => Promise<void>;
    onEdit: (id: string, payload: Partial<Product>) => Promise<void>;
    error: boolean;
    edited: boolean;
    loading: boolean; 
};

export function EditProduct({
    product, onCancel, onSuccess, onEdit, error, loading, edited}: EditStoreProps){
    
    const formSchema = z.object({
        name: z.string()
        .min(1, "O nome é obrigatório")
        .max(100, "O nome deve ter até no máximo 100 caracteres.")
    })

    type FormData = z.infer<typeof formSchema>

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    useEffect(() => {
        reset({
            name: product.name
        });
    }, [product, reset]);

    async function onSubmit(data: FormData){
        


        await onEdit(product.id, {
                name: data.name
        });

        await onSuccess();

    };

    return (
        <div className="flex flex-col p-6">
            <h3 className="text-[1.8rem] font-semibold text-[#3B82F6]">Editar Produto</h3>

             {error && (
                <div className='mt-2'>
                <FormsError text={"Erro ao editar produto, tente novamente mais tarde."}/>
                </div>
            )}

             {edited && (
                <div className='mt-2'>
                <FormSuccess text={"Produto alterado com sucesso."}/>
                </div>
            )}

             <div className='flex items-center mt-4 mb-2 py-2 px-2 w-full
             text-sm rounded-lg border-2 border-blue-300 bg-blue-50 text-blue-600 font-semibold'>

                <Milk size={25}/>

                <div className='px-2 flex items-center gap-4'>

                    <p>Sku: {product.sku}</p>

                    <p>GTIN: {product.gtin}</p>

                </div>

            </div>

            <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2 mt-4">            
            <label className='font-semibold'>Nome</label>
                <input
                    type="text"
                    disabled={loading}
                    placeholder="Loja Centro - SP1"
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
                                    'Editar'                              
                                )}
                        </button>
                    </div> 
            </form>
        </div>
    )
};