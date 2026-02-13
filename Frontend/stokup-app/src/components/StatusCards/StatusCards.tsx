
import type { Stock } from '../../types/Stock';

import { TriangleAlert, CircleCheck, Package, Milk, TrendingDown, LoaderCircle } from 'lucide-react';

type dashboardProps = {
    stock: Stock[];
    loading: boolean;
    error: boolean;
};

export function StatusCards({stock, loading, error}: dashboardProps) {

  const healthy = stock.filter(item => item.status === 'Saudável').length;
  const critical = stock.filter(item => item.status === 'Crítico').length;
  const dailyAvgConsumption = stock.length > 0 ? stock.filter(item => item.daily_consumption).reduce((sum, item) =>
  sum + item.daily_consumption, 0 ) : 0;

  return (
    <div className="flex items-center justify-center gap-8 w-full">     

      <div className="flex flex-col bg-[#fff] px-4 py-2.5 w-[220px] hover:bg-gray-50
      shadow-[0_0_10px_rgba(0,0,0,0.3)] rounded-md">
      
            <div className="flex relative text-red-600">
              <h2 className="text-sm">Em Risco</h2>
              <div className='absolute right-0 flex w-10 h-10 bg-red-100 rounded-full
              items-center justify-center'>
                <TriangleAlert size={20}/>
              </div>
            </div>

            <div className="flex text-red-600 py-1">
              {loading ? (
                <LoaderCircle className="animate-spin" size={30}/>
              ): (
              <h3 className="text-[1.3rem] font-bold">{critical}</h3>
              )}
            </div>

            <p className="text-[0.8rem] text-gray-600">Abaixo do mínimo</p>
      </div>


      <div className="flex flex-col bg-[#fff] px-4 py-2.5 w-[220px] hover:bg-gray-50
      shadow-[0_0_10px_rgba(0,0,0,0.3)] rounded-md">
        
            <div className="flex relative text-green-600">
              <h2 className='text-sm'>Estoque Saudável</h2>
              <div className='absolute right-0 flex w-10 h-10 bg-green-100 rounded-full
              items-center justify-center'>
              <CircleCheck  size={20} />
              </div>
            </div>

            <div className="flex text-[#419638] py-1">
            {loading ? (
                <LoaderCircle className="animate-spin" size={30}/>
              ): (
              <h3 className="text-[1.3rem] font-bold">{healthy}</h3>
              )}
            </div>

            <p className="text-[0.8rem] text-gray-600">Acima do mínimo</p>
      </div>


      <div className="flex flex-col bg-[#fff] px-4 py-2.5 w-[220px]
      shadow-[0_0_10px_rgba(0,0,0,0.3)] rounded-md hover:bg-gray-50">

            <div className="flex relative text-blue-600">
              <h2 className="text-sm">Produtos</h2>
              <div className='absolute right-0 flex w-10 h-10 bg-blue-100
              items-center justify-center rounded-full'>
              <Milk size={20} />
              </div>
            </div>

            <div className="flex text-[#3666ba] rounded-lg py-1">
              {loading ? (
                <LoaderCircle className="animate-spin" size={30}/>
              ): (
                <h3 className="text-[1.3rem] font-bold">{stock.length}</h3>
              )}
            </div>

            <p className="text-[0.8rem] text-gray-600 whitespace-nowrap">
              Total de SKUs cadastrados
            </p>
      </div>


      <div className="flex flex-col bg-[#fff] px-4 py-2.5 w-[220px] hover:bg-gray-50
      shadow-[0_0_10px_rgba(0,0,0,0.3)] rounded-md">
            <div className="flex relative text-orange-600">
              <h2 className="text-sm">Consumo</h2>
              <div className='absolute right-0 flex w-10 h-10 bg-orange-50
              items-center justify-center rounded-full'>
              <TrendingDown size={20} />
              </div>
            </div>

            <div className="flex text-[#d66a27] rounded-lg py-1">
              {loading ? (
                <LoaderCircle className="animate-spin" size={30}/>
              ): (
                 <h3 className="text-[1.3rem] font-extrabold">{dailyAvgConsumption}</h3>
              )}             
            </div>            
            <p className="text-[0.8rem] text-gray-600">Média diária</p>
          
      </div>

    </div>
  );
}
