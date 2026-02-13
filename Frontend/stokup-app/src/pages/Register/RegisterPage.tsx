
import { Register } from "../../components/Register/Register"
import { UseRegister } from "../../hooks/UseRegister"

export function RegisterPage(){
    const { registerUser, loading, error, created } = UseRegister();

    return( 
        <div className="flex w-[100%] bg-gradient-to-r min-h-screen from-[#3B82F6] to-[#0F172A]">
            <div className="flex flex-col justify-center w-full  mx-[5vw] text-left">
                <h1 className='font-extrabold text-[4rem] text-[#fff]'>Stokup</h1>
                <p className='font-semibold text-[1rem] text-[#dbdbdb]'>
                    Centralize, acompanhe e evite rupturas.
                </p>
            </div>            
            <div className='flex w-full justify-end'>
                < Register
                oncreate={registerUser}
                loading={loading}
                error={error}
                created={created} />
            </div>            
        </div>
    )
};