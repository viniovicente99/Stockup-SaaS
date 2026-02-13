import { LogOut  } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function UserCard(){

    const userName = localStorage.getItem('name');
    const userEmail = localStorage.getItem('email');

    const navigate = useNavigate();
    
    const handleLogout = (): void => {
        localStorage.removeItem('token');
        navigate('/login');

    };
    return (
        <div className="flex x-8 py-3 items-center gap-2">
            <div className='relative flex'>
                <div className='group'>
                <button
                type='button'
                onClick={handleLogout}
                >
                <LogOut className='transition-all duration-200 text-[#B03131]
                hover:scale-125 hover:text-[#b80d0d]' size={25}
                aria-label='Logout'/>
                </button>
                <p className='opacity-0 group-hover:opacity-100 absolute left-8 top-0 bg-[#404040] px-4 font-semibold
                text-[#bdbfbe] rounded-sm'>
                    Sair
                </p>
                </div>
            </div>
            <div className="flex flex-col">
                <p className="text-[0.9rem] font-semibold truncate">{userName || 'Convidado'}</p>           
                <p className="text-[0.8rem] text-[#404040] truncate">{userEmail || 'E-mail'}</p>
            </div>
        </div>
    )
};