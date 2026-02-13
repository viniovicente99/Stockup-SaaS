
import { CircleX } from 'lucide-react';

interface Props{
    text: string;
};

export function FormsError({text}: Props){
    return (
        <div className="flex justify-start bg-[#F2D5D5] border-2 border-[#DEADAD] p-4 rounded-md">
            <div className='px-4 flex gap-3 text-[#B03131]'>
                <CircleX />
                <p>{text || 'Erro ao completar ação.'}</p>
            </div>
        </div>
    )
};