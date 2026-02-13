
import type { TooltipProps } from "recharts";

interface CustomToolTipProps extends TooltipProps<number, string> {
    total: number;
    payload?: any;
}

type PayloadItem = {
    name: string;
    value: number;
    payload: {
        fill: string;
    }
};

export function CustomToolTip({ active, total, payload}: CustomToolTipProps) {

    if(!active || !payload || payload.length === 0) return null;

    const item = payload[0] as PayloadItem;

    const { name, value, payload: data} = payload[0];

    const percent = total > 0 ? ((value / total) * 100).toFixed(1) : 0; 

    return(
        <div
        style={{
            background: "#fff",
            padding: "12px 14px",
            borderRadius: "10px",
            boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
            fontSize: "14px"
        }}
        >
            <div style={{display: "flex", alignItems: "center", gap: 10}}>
                <span
                style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: data.fill
                }}
                />
                <strong>{item.name}</strong>
            </div>
            <div style={{ marginTop: 6}}>
                {item.value} Estoque(s) ({percent}%)
            </div>
        </div>
    )
}