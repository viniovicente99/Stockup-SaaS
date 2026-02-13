import { useGetStock } from "../../hooks/UseGetStock";
import { StatusCards } from "../../components/StatusCards/StatusCards";
import { useEffect, useState } from "react";
import { DropdownFilter } from "../../components/DropdownFilter/DropdownFilter";
import { useGetAllStores } from "../../hooks/UseGetAllStores";
import { StatusPieChart } from "../../components/PieChart/StatusPieChart";
import { StockSummary } from "../../components/StockSummary/StockSummary";
import { StockTableDashboard } from '../../components/StockTableDashboard/StockTableDashboard';



export function Dashboard(){

    const [selectedStoreID, setSelectedStoreID] = useState<string | null>(null);
    const { getStock, stock, loading: stockLoading, error: stockError } = useGetStock();
    const { getAllStores, stores, loading: storesLoading, error: storesError } = useGetAllStores();


    useEffect(() => {
        getStock(selectedStoreID ?? undefined);
    },[selectedStoreID]);

    useEffect(() => {
        getAllStores();
    },[]);

    return (
        <div className="flex flex-col w-full mt-6 p-2 pb-20">
           <div className="flex justify-between items-center px-20 z-20">
            <h1 className="text-[2rem] font-bold">Dashboard</h1>
            <DropdownFilter
            getStores={getAllStores}
            onSelected={setSelectedStoreID}
            store={stores}
            loading={storesLoading}
            error={storesError}
            />           
           </div>
            <p className=" px-20 text-[#707070] text-[0.9rem]">
                Acompanhe o status do seu estoque em tempo real
            </p>
           <div className="flex w-full mt-4 z-2 ">
                <StatusCards
                stock={stock}
                error={stockError}
                loading={stockLoading}
                />
           </div>

           <div className="flex w-full justify-center mt-6 items-center z-2 gap-20">

           <StatusPieChart
                stock={stock}
                error={stockError}
                loading={stockLoading}/>


            <StockSummary
                stock={stock}
                error={stockError}
                loading={stockLoading}/>
            </div>

            <div className="flex items-center px-20">
            <h1 className="text-[1.3rem] font-bold mt-4">
                Estoque Atual
            </h1>
            </div>

            <div className="mt-6">
                <StockTableDashboard
                stock={stock}
                error={stockError}
                loading={stockLoading}/>
            </div>
        </div>
    )
};