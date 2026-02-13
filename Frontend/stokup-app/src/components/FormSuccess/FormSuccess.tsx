
import { CircleCheck  } from 'lucide-react';

interface Props{
    text: string;
};

export function FormSuccess({text}: Props){
    return (
        <div className="flex justify-start bg-[#DBF2D5] border-2 border-[#B7DEAD] p-4 rounded-md">
            <div className='px-4 flex gap-3 text-[#419638]'>
                <CircleCheck />
                <p>{text}</p>
            </div>
        </div>
    )
};