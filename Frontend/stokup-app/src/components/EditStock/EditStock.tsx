
import type { Stock } from '../../types/Stock';

import { useForm } from 'react-hook-form';
import z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';

import { useEffect } from 'react';

import { FormsError } from '../FormsError/FormsError';
import { FormSuccess } from '../FormSuccess/FormSuccess';

import { LoaderCircle, Milk } from 'lucide-react';

type EditStockProps = {
    stock: Stock; 
    onCancel: () => void;
    onSuccess: () => Promise<void>;
    onEdit: (id: string, payload: Partial<Stock>) => Promise<void>;
    error: string | null;
    edited: boolean;
    loading: boolean; 
};

export function EditStock({
    stock, onCancel, onSuccess, onEdit, error, loading, edited}: EditStockProps){

    const numberField = (label: string) =>
    z
    .number()
    .int()
    .min(1, `${label} precisa ser maior que zero`)
    .optional()
    .refine((val) => val !== undefined, {
      message: `${label} é obrigatório`,
    });
    
    const formSchema = z.object({
        starting_stock: numberField("Estoque"),
        daily_consumption: numberField("Consumo diário"),
        min_stock: numberField("Estoque mínimo"),
    });

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
            starting_stock: stock.starting_stock,
            daily_consumption: stock.daily_consumption,
            min_stock: stock.min_stock
        });
    }, [stock, reset]);

    async function onSubmit(data: FormData){      


        await onEdit(stock.id, {
            starting_stock: data.starting_stock,
            daily_consumption: data.daily_consumption,
            min_stock: data.min_stock
        });

        await onSuccess();

    };

    return (
        <div className="flex flex-col p-6">
            <h3 className="text-[1.8rem] font-semibold text-[#3B82F6]">Atualizar Estoque</h3>

            {error && (
                <div className='mt-2'>
                <FormsError text={error}/>
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

                    <p>{stock.name}</p>

                    <p>Sku: {stock.product_sku}</p>

                    <p>GTIN: {stock.product_gtin}</p>

                </div>

            </div>

            <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2 mt-4">

                <label className='font-semibold'>Estoque</label>
                <input
                    type="number"
                    disabled={loading}
                    placeholder="250"
                    {...register("starting_stock", {
                        setValueAs: (value) =>
                        value === "" ? undefined : Number(value),
                    })}
                    className='w-full px-6 py-2 bg-[#EBEBEB] rounded-lg focus:outline-none
                    disabled:opacity-60 no-number-spinner'/>
                    <p className='text-red-700 text-sm'>
                        {errors.starting_stock?.message}
                    </p>

                <label className='font-semibold'>Consumo diário</label>
                <input
                    type="number"
                    disabled={loading}
                    placeholder="50"
                    {...register('daily_consumption', { valueAsNumber: true })}
                    className='w-full px-6 py-2 bg-[#EBEBEB] rounded-lg focus:outline-none
                    disabled:opacity-60 no-number-spinner'/>
                    <p className='text-red-700 text-sm'>
                        {errors.daily_consumption?.message}
                    </p>

                    <label className='font-semibold'>Estoque mínimo</label>
                    <input
                    type="number"
                    disabled={loading}
                    placeholder="50"
                    {...register('min_stock', { valueAsNumber: true })}
                    className='w-full px-6 py-2 bg-[#EBEBEB] rounded-lg focus:outline-none
                    disabled:opacity-60 no-number-spinner'/>
                    <p className='text-red-700 text-sm'>
                        {errors.min_stock?.message}
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
                                    'Atualizar'                              
                                )}
                        </button>
                    </div> 
            </form>
        </div>
    )
};