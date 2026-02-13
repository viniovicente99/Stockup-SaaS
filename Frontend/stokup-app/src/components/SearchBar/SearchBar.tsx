
import { Search } from "lucide-react"

type searchProps = {
    searchTerm: string;
    onSearchChange: (value: string) => void;
};

export function SearchBar({searchTerm, onSearchChange} : searchProps){
    return (
        <div className="flex relative">
             <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Buscar"
                className='w-full px-12 py-1 bg-[#fff] rounded-lg focus:outline-none
                focus:outline-none'/>                         
                <Search className='absolute inset-y-1 left-2 text-[#3666ba]' />
        </div>
    )
};