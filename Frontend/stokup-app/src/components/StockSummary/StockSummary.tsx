
import {  LoaderCircle, Package, CalendarCheck  } from 'lucide-react';

import type { Stock } from '../../types/Stock';

type summaryProps = {
    stock: Stock[];
    loading: boolean;
    error: boolean;
};

export function StockSummary({stock, loading, error}: summaryProps) {

  const stockSummary = stock.length > 0 ? stock.filter(item => item.remainingStock).reduce((sum, item) =>
  sum + item.remainingStock, 0 ) : 0;
  
  const avgCoverage = stock.length > 0 ? stock.filter(item => item.daysOfCoverage).reduce((acc, item) =>
  acc + item.daysOfCoverage, 0) : 0;

  return (
    <div className="flex flex-col space-y-8">     

      <div className="flex flex-col bg-[#fff] px-4 py-2.5 w-[220px] hover:bg-gray-50
      shadow-[0_0_10px_rgba(0,0,0,0.3)] rounded-md">
    
            <div className="flex relative text-blue-600">
              <h2 className="text-sm">Total em Estoque</h2>
              <div className='absolute right-0 flex w-10 h-10 bg-blue-100
              items-center justify-center rounded-full'>
                <Package size={20}/>
              </div>
            </div>

            <div className="flex text-[#3666ba] rounded-lg py-1">
              {loading ? (
                <LoaderCircle className="animate-spin" size={30}/>
              ): (
              <h3 className="text-[1.3rem] font-bold">{stockSummary}</h3>
              )}
            </div>

            <p className="text-[0.8rem] text-gray-600">Items disponíveis</p>
      </div>


      <div className="flex flex-col bg-[#fff] px-4 py-2.5 w-[220px] hover:bg-gray-50
      shadow-[0_0_10px_rgba(0,0,0,0.3)] rounded-md">

            <div className="flex relative text-blue-600">
              <h2 className="text-sm">Autonomia Média</h2>
              <div className='absolute right-0 flex w-10 h-10 bg-blue-100
              items-center justify-center rounded-full'>
              <CalendarCheck size={20} />
              </div>
            </div>

            <div className="flex text-[#3666ba] rounded-lg py-1">
              {loading ? (
                <LoaderCircle className="animate-spin" size={30}/>
              ): (
              <h3 className="text-[1.3rem] font-bold">{avgCoverage}</h3>
              )}
            </div>

            <p className="text-[0.8rem] text-gray-600">Dias</p>
      </div>
    </div>
  );
}
