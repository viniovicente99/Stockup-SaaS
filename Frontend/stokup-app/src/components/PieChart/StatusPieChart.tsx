import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer
} from 'recharts'

import type { Stock } from '../../types/Stock';

import { CustomToolTip } from '../CustomToolTip/CustomToolTip';

import { LoaderCircle, Inbox } from 'lucide-react';

type Props = {
    stock: Stock[];
    loading: boolean;
    error: boolean;    
};

export function StatusPieChart({ stock, loading, error}: Props){
    const criticalStatus = stock.filter(item => item.status === 'Crítico').length;   
    const warningStatus = stock.filter(item => item.status === 'Atenção').length;   
    const healthyStatus = stock.filter(item => item.status === 'Saudável').length;

    const pieData = [
       {
            name: "Crítico",
            value: criticalStatus,
            color: "#dd5151"
        },
       {
            name: "Atenção",
            value: warningStatus,
            color: "#e9b356"
        },
        {
            name: "Saudável",
            value: healthyStatus,
            color: "#10d673"
        }
    ].filter(item => item.value > 0);

    const totalStatus = stock.filter((stock) => stock.status).length;

    return (
        <div className='flex flex-col h-[280px] w-[30vw] bg-gradient-to-r from-white to-gray-100 rounded-lg
            border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300'>
            
            {loading ? (
                <div className="flex gap-4 flex-col items-center my-auto justify-center text-[#3666ba]
                py-8">
                    <LoaderCircle className="animate-spin" size={50} />
                    <p className='animate-pulse text-lg'>Carregando Gráfico...</p>
                </div>
            ) : stock.length === 0 ? (
                 <div className="flex gap-3 flex-col items-center my-auto text-gray-400 py-8">
                    <Inbox size={48} className="opacity-60" />
                    <p className='text-md text-center font-medium'>
                        Nenhum estoque registrado ainda.<br/>
                        Adicione produtos para visualizar o gráfico.
                    </p>
                </div>
            ) : (
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <text
                            x="50%"
                            y="8%"
                            textAnchor="middle"
                            dominantBaseline="middle"                    
                            style={{ fontSize: '15px', fontWeight: 300 }}
                        >
                            Distribuição do Estoque
                        </text>

                        <Pie                    
                            data={pieData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="55%"
                            innerRadius={0}
                            outerRadius={80}
                            paddingAngle={3} 
                            stroke="#ffffff" 
                            strokeWidth={2}
                            labelLine={false}
                            isAnimationActive={true}
                            animationDuration={800}
                            animationEasing="ease-out"
                            label={({ percent, index }) =>
                                percent !== undefined ? (
                                    <text
                                        fill={pieData[index].color}
                                        fontSize="12px"
                                        fontWeight={600}
                                        textAnchor="middle"
                                        dominantBaseline="central"
                                    >
                                        {(percent * 100).toFixed(0)}%
                                    </text>
                                ) : null
                            }
                        >
                            {pieData.map((entry, index) => (
                                <Cell
                                    key={index}
                                    fill={entry.color}
                                    style={{
                                        transition: "all 0.3s ease",
                                        cursor: "pointer"
                                    }}
                                />
                            ))}
                        </Pie>

                        <Tooltip
                            isAnimationActive={false}
                            cursor={{ fill: "rgba(0,0,0,0.05)" }}
                            content={<CustomToolTip total={totalStatus} />}
                        />
                    </PieChart>
                </ResponsiveContainer>
            )}
        </div>
    )
}
