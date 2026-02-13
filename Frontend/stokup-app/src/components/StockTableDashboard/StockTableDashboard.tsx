import type { Stock } from '../../types/Stock';
import { CircleCheck, AlertCircle, AlertTriangle, LoaderCircle, Search } from 'lucide-react';

type dashboardProps = {
    stock: Stock[];
    loading: boolean;
    error: boolean;
};

export function StockTableDashboard({ stock, loading, error }: dashboardProps) {

    function getTextColor(status: Stock["status"]) {
        switch (status) {
            case "Crítico":
                return "#DC2626";
            case "Atenção":
                return "#EA580C";
            case "Saudável":
                return "#16A34A";
            default:
                return "#4B5563";
        }
    }

    function getBackgroundColor(status: Stock["status"]) {
        switch (status) {
            case "Crítico":
                return "#FEE2E2";
            case "Atenção":
                return "#FFEDD5";
            case "Saudável":
                return "#DCFCE7";
            default:
                return "#F3F4F6";
        }
    }

    function getIcon(status: Stock["status"]) {
        switch (status) {
            case "Crítico":
                return <AlertTriangle size={25} />;
            case "Atenção":
                return <AlertCircle size={25} />;
            case "Saudável":
                return <CircleCheck size={25} />;
            default:
                return <Search />;
        }
    }

    function getToolTip(status: Stock["status"]) {
        switch (status) {
            case "Crítico":
                return "Crítico";
            case "Atenção":
                return "Atenção";
            case "Saudável":
                return "Saudável";
            default:
                return "Sem Status";
        }
    }

    return (
        <div className="flex items-center justify-center gap-20 w-full">

            <table className="w-[90%] bg-white rounded-lg shadow-md overflow-hidden">
                <thead className="bg-gray-100 sticky top-0 z-10">
                    <tr className="text-[0.75rem] text-gray-600 uppercase tracking-wide">
                        <th className="px-6 py-4 text-left w-[28%]">Produto</th>
                        <th className="px-6 py-4 text-left w-[15%]">Loja</th>
                        <th className="px-4 py-4 text-right w-[8%] whitespace-nowrap">
                            Estoque Atual
                        </th>
                        <th className="px-4 py-4 text-right w-[10%] whitespace-nowrap">
                            Consumo / dia
                        </th>
                        <th className="px-4 py-4 text-right w-[10%] whitespace-nowrap">
                            Cobertura
                        </th>
                        <th className="px-4 py-4 text-center w-[8%] whitespace-nowrap">
                            Status
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={6} className="py-6 text-center">
                                <div className="flex flex-col items-center justify-center gap-2 text-blue-600">
                                    <LoaderCircle className="animate-spin" size={40} />
                                    <p className="animate-pulse text-lg">
                                        Carregando Estoque...
                                    </p>
                                </div>
                            </td>
                        </tr>
                    ) : error ? (
                        <tr>
                            <td colSpan={6} className="py-10 text-center">
                                <div className="flex flex-col items-center">
                                    <p className="text-black font-semibold">
                                        Erro ao encontrar estoque.
                                    </p>
                                    <p className="text-[#545353] text-[0.9rem]">
                                        Por favor tente novamente mais tarde.
                                    </p>
                                </div>
                            </td>
                        </tr>
                    ) : stock.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="py-10 text-center text-gray-400 font-semibold">
                                Nenhum estoque cadastrado.
                            </td>
                        </tr>
                    ) : (
                        stock.map((stock) => (
                            <tr
                                key={stock.id}
                                className={`text-[0.8rem] font-medium hover:bg-gray-100 transition
                                ${stock.status === "Crítico" ? "bg-red-50 text-red-600 hover:bg-red-100"
                                :"text-gray-700 even:bg-gray-50 "}
                                `}
                            >
                                <td className="px-6 py-3 font-semibold">
                                    {stock.name}
                                </td>

                                <td className="px-6 py-3">
                                    {stock.store_name}
                                </td>

                                <td className="px-4 py-3 text-right font-bold">
                                    {stock.remainingStock === 0 ? "Sem Estoque" : stock.remainingStock}
                                </td>

                                <td className="px-4 py-3 text-right whitespace-nowrap">
                                    {stock.daily_consumption}
                                </td>

                                <td className="px-4 py-3 text-right whitespace-nowrap">
                                    {stock.daysOfCoverage} dias
                                </td>

                                <td
                                    className="px-4 py-3 text-right whitespace-nowrap"
                                    style={{ color: getTextColor(stock.status) }}
                                >
                                    <div className="flex relative group justify-center gap-3 whitespace-nowrap">
                                        {getIcon(stock.status)}
                                        <span
                                            className="absolute bottom-[0px] left-1/2
                                            opacity-0 group-hover:opacity-100
                                            pointer-events-none
                                            text-sm px-2 py-1
                                            rounded whitespace-nowrap
                                            transform -translate-x-1/2"
                                            style={{
                                                color: getTextColor(stock.status),
                                                backgroundColor: getBackgroundColor(stock.status)
                                            }}
                                        >
                                            {getToolTip(stock.status)}
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

        </div>
    );
}
