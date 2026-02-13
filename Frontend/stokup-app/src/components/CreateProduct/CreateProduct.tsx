
import { useEffect, useState } from "react";

import type { Product } from "../../types/Product";
import type { Stock } from "../../types/Stock";
import type { Store } from "../../types/Store";

import { FormsError } from "../FormsError/FormsError"
import { useForm } from "react-hook-form";
import type { Resolver } from "react-hook-form";
import z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

import { FormSuccess } from '../FormSuccess/FormSuccess';

import { ChevronDown, ChevronUp, LoaderCircle } from 'lucide-react';

type CreateProductProps = {
    onCancel: () => void;
    onCreate: (product: Omit<Product, 'id'>) => Promise<void>;
    loading: boolean;
    getStock: () => Promise<Stock[]>;
    getAllStores: () => Promise<void>;
    store: Store[];
    error: string | null;
    created: boolean;
};

export const storeSchema = z.object({

    store_id: z.string(),
    
    starting_stock: z.number().int().nonnegative().optional(),

    daily_consumption: z.number().int().nonnegative().optional(),

    min_stock: z.number().int().nonnegative().optional()

});


export function CreateProductButton({
    onCancel, onCreate, error, loading, created, getStock, store
}: CreateProductProps){ 

    const productSchema = z.object({
        name: z.string()
        .min(1, "O nome do produto é obrigatório.")
        .max(100, "O nome deve ter no máximo 100 caracteres."),

        gtin: z.string()
        .min(1, "O número do GTIN é obrigatório.")
        .max(50, "O GTIN deve ter no máximo 50 caracteres."),

        sku: z.string()
        .min(1, "O código do produto é obrigatório.")
        .max(50, "O código deve ter no máximo 50 caracteres."),

        stores: z
        .array(storeSchema)
        .default([])
        .refine(
            (stores) => 
                stores.some(
                    (s) => 
                        typeof s.starting_stock === "number" &&
                        typeof s.daily_consumption === "number" &&
                        typeof s.min_stock === "number"
                ),
                {
                    message:
                    "Pelo menos uma loja precisa ter estoque, consumo diário e estoque mínimo preenchidos."

                }
            )

        });

    type FormData = z.infer<typeof productSchema>

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm<FormData>({
        resolver: zodResolver(productSchema) as unknown as Resolver<FormData>,
        shouldUnregister: false,
        defaultValues: {
            stores: store.map((s) => ({
                store_id: s.id,
                starting_stock: undefined,
                daily_consumption: undefined,
                min_stock: undefined
            }))
        }
    });

    async function onSubmit(data: FormData){

        try{            
            await onCreate({
                name: data.name,
                gtin: data.gtin,
                sku: data.sku,
                stores: data.stores.map(store => ({
                    store_id: store.store_id,
                    starting_stock: store.starting_stock,
                    daily_consumption: store.daily_consumption,
                    min_stock: store.min_stock
                }))
            });
            
            await getStock();

            reset();
        } catch (err){
            return console.log(err);
        }
    };

    const [openIds, setOpenIds] = useState<String[]>([]);
    
    return (
        <div className="relative flex flex-col py-2 px-6">
            <h3 className="text-[1.8rem] font-semibold text-[#3B82F6]">
                Cadastrar Produto
            </h3>

            <h2 className="mt-6 text-[1.2rem] font-semibold text-[#3B82F6]">
                Dados do Produto
            </h2>
            
            <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2 mt-2 text-sm">
                <div className="relative group w-4">
                    <label className='font-semibold'>Nome</label>
                    <span className="absolute bottom-[0px] left-[130px]
                    opacity-0 group-hover:opacity-100 
                    pointer-events-none
                    bg-gray-700 text-white text-sm px-2 py-1 
                    rounded whitespace-nowrap 
                    transform -translate-x-1/2">
                         Descrição do produto.
                    </span>
                </div>

                <input
                    type="text"
                    disabled={loading}
                    {...register('name')}
                    placeholder="Refrigerante Coca-Cola PET 2L"
                    className='w-full px-6 py-1 bg-[#EBEBEB] rounded-md focus:outline-none
                    disabled:opacity-60'/>
                   
                    <p className='text-red-700 text-sm'>
                        {errors.name?.message}                    
                    </p>

                 <div className="relative group w-4">
                    <label className='font-semibold'>GTIN</label>
                    <span className="absolute bottom-[0px] left-[185px]
                    opacity-0 group-hover:opacity-100 
                    pointer-events-none
                    bg-gray-700 text-white text-sm px-2 py-1 
                    rounded whitespace-nowrap 
                    transform -translate-x-1/2">
                         Número do código de barras do produto.
                    </span>
                </div>

                <input
                    type="text"
                    disabled={loading}
                    placeholder="7894900011517"
                    {...register('gtin')}
                    className='w-full px-6 py-1 bg-[#EBEBEB] rounded-md focus:outline-none
                    disabled:opacity-60'/>
                    <p className='text-red-700 text-sm'>
                        {errors.gtin?.message}
                    </p>

                    <div className="relative group w-4">
                    <label className='font-semibold whitespace-nowrap'>Sku</label>
                    <span className="absolute bottom-[0px] left-[185px]
                    opacity-0 group-hover:opacity-100 
                    pointer-events-none
                    bg-gray-700 text-white text-sm px-2 py-1 
                    rounded whitespace-nowrap 
                    transform -translate-x-1/2">
                         Código interno de identificação do produto.
                    </span>
                </div>

                <input
                    type="text"
                    disabled={loading}
                    placeholder="100245"
                    {...register('sku')}
                    className='w-full px-6 py-1 bg-[#EBEBEB] rounded-md focus:outline-none
                    disabled:opacity-60'/>
                    <p className='text-red-700 text-sm'>
                        {errors.sku?.message}
                    </p>

                    <div className="w-full h-[2px] bg-gray-400 mt-2"></div>

                    <h3 className="text-[1.2rem] font-semibold text-[#3B82F6] mt-4">
                        Configuração por Loja
                    </h3>

                    <div className="flex flex-col mt-2 gap-2 ">
                        {store.map((store, index) => {
                            const isOpen = openIds?.includes(store.id);

                            return (
                                !isOpen ? (
                                <div key={store.id}
                                onClick={() => {
                                if (isOpen) {
                                    setOpenIds(openIds.filter(id => id !== store.id));
                                } else {                                            
                                    setOpenIds([...openIds, store.id]);
                                }
                                }}
                                className="relative mt-2 py-1 px-6 rounded-lg border-2 hover:cursor-pointer
                                border-2 border-blue-400">
                                    
                                <div className="flex flex-col">
                                    <p className="py-1 font-semibold w-[95%]
                                    rounded-lg text-blue-700">
                                        {store.store_id} - {store.name} 
                                    </p>
                                                                            
                                <ChevronDown className="absolute right-2 top-1 hover:cursor-pointer
                                text-blue-500" size={30}/>
                                </div>                                                                                                                                      
                            </div>                                       
                            ) :                                     
                            ( 
                                <div key={store.id}
                                onClick={() => {
                                if (isOpen) {
                                    setOpenIds(openIds.filter(id => id !== store.id));
                                } else {                                            
                                    setOpenIds([...openIds, store.id]);
                                }
                                }}
                                className="relative mt-2 py-4 px-6 rounded-lg border-2 hover:cursor-pointer
                                border-2 border-blue-400">
                                    
                                <div className="flex flex-col">
                                    <p className="py-1 px-5 text-center font-semibold w-[95%]
                                    rounded-lg bg-blue-100 text-blue-700">
                                        {store.store_id} - {store.name} 
                                    </p>
                                                                            
                                <ChevronUp className="absolute right-2 top-1 text-blue-500"
                                size={30}/>
                                </div>
                                    <div className="flex flex-col">
                                    <h3 className="text-[1.2rem] font-semibold text-[#3B82F6] mt-4">
                                        Dados do Estoque
                                    </h3>

                                    <div className="relative group w-4 mt-4">
                                        <label className='font-semibold'>Estoque</label>
                                        <span className="absolute bottom-[0px] left-[210px]
                                        opacity-0 group-hover:opacity-100 
                                        pointer-events-none
                                        bg-gray-700 text-white text-sm px-2 py-1 
                                        rounded whitespace-nowrap 
                                        transform -translate-x-1/2">
                                            Quantidade do produto que há no estoque.
                                        </span>
                                    </div>

                                    <input
                                    type="number"
                                        {...register(`stores.${index}.store_id`)}
                                        defaultValue={store.id}
                                        onClick={(e) => e.stopPropagation()}
                                        placeholder="250"
                                        className='hidden w-full mt-2 px-6 py-1 bg-[#EBEBEB] rounded-md focus:outline-none
                                        no-number-spinner'/>

                                    <input
                                        {...register(`stores.${index}.starting_stock`, {
                                            setValueAs(value) {
                                                return value === "" ? undefined : Number(value)
                                            },
                                        })}
                                        onClick={(e) => e.stopPropagation()}
                                        disabled={loading}
                                        placeholder="250"
                                        className='w-full mt-2 px-6 py-1 bg-[#EBEBEB] rounded-md focus:outline-none
                                        disabled:opacity-60 no-number-spinner'/>
                                    
                                        <p className='text-red-700 text-sm'>
                                            {errors.stores?.[index]?.starting_stock?.message}                    
                                        </p>

                                        <div className="relative group w-8 mt-4">
                                        <label className='font-semibold whitespace-nowrap'>Consumo Diário</label>
                                        <span className="absolute bottom-[0px] left-[280px]
                                        opacity-0 group-hover:opacity-100 
                                        pointer-events-none
                                        bg-gray-700 text-white text-sm px-2 py-1 
                                        rounded whitespace-nowrap 
                                        transform -translate-x-1/2">
                                            Quantidade média de consumo diário do produto.
                                        </span>
                                    </div>

                                    <input
                                        type="number"
                                        {...register(`stores.${index}.daily_consumption`, {
                                            setValueAs(value) {
                                                return value === "" ? undefined : Number(value)
                                            },
                                        })}
                                        onClick={(e) => e.stopPropagation()}
                                        disabled={loading}
                                        placeholder="50"
                                        className='w-full mt-2 px-6 py-1 bg-[#EBEBEB] rounded-md focus:outline-none
                                        no-number-spinner disabled:opacity-60'/>
                                    
                                        <p className='text-red-700 text-sm'>
                                            {errors.stores?.[index]?.daily_consumption?.message}                    
                                        </p>

                                        <div className="relative group w-8 mt-4">
                                        <label className='font-semibold whitespace-nowrap'>Estoque mínimo</label>
                                        <span className="absolute bottom-[0px] left-[275px]
                                        opacity-0 group-hover:opacity-100 
                                        pointer-events-none
                                        bg-gray-700 text-white text-sm px-2 py-1 
                                        rounded whitespace-nowrap 
                                        transform -translate-x-1/2">
                                            Quantidade mínima que o estoque pode chegar.
                                        </span>
                                    </div>

                                    <input
                                        type="number"
                                        {...register(`stores.${index}.min_stock`, {
                                            setValueAs(value) {
                                                return value === "" ? undefined : Number(value)
                                            },
                                        })}
                                        onClick={(e) => e.stopPropagation()}
                                        disabled={loading}
                                        placeholder="50"
                                        className='w-full mt-2 px-6 py-1 bg-[#EBEBEB] rounded-md focus:outline-none
                                        no-number-spinner disabled:opacity-60'/>
                                    
                                        <p className='text-red-700 text-sm'>
                                            {errors.stores?.[index]?.min_stock?.message}                    
                                        </p>
                                    </div>                                                                                                                                    
                                    </div>
                                                                   
                                )        
                            )})}
                            <p className='text-red-700 text-sm'>
                                {errors.stores?.message}                    
                            </p>              
                        </div>

                         {error && (
                            <div className='mt-4'>
                                <FormsError text={error}/>
                            </div>
                         )}

                         {created && (
                            <div className='mt-6'>
                            <FormSuccess text={"Produto cadastrado com sucesso."}/>
                            </div>
                         )}
                        

                    <div className='bottom-0 right-2 flex justify-end gap-8 mt-6'>
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
                        text-md text-[#fff] p-3 px-8 rounded-lg hover:bg-gradient-to-b hover:from-[#3B82F6]
                        hover:to-[#3B82F6] disabled:pointer-events-none
                        disabled:opacity-70 disabled:cursor-not-allowed`}>
                           {loading ? (                                
                                    <div className='flex justify-center px-5'>
                                        <LoaderCircle className='animate-spin' size={20}/>
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