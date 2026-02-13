
import { Login } from '../../components/Login/Login';
import { UseLogin } from '../../hooks/UseLogin';

export function LoginPage(){
    const {loginUser, loading, error} = UseLogin();

    return( 
        <div className="flex w-[100%] h-full bg-gradient-to-r from-[#3B82F6] to-[#0F172A]">
            <div className="flex flex-col justify-center w-full mx-[5vw] text-left">
                <h1 className='font-extrabold text-[4rem] text-[#fff]'>Stokup</h1>
                <p className='font-semibold text-[1rem] text-[#dbdbdb]'>
                    Centralize, acompanhe e evite rupturas.
                </p>
            </div>            
            <div className='flex w-full justify-end'>
                < Login
                onLogin={loginUser}
                loading={loading}
                error={error}
                 />
            </div>            
        </div>
    )
};