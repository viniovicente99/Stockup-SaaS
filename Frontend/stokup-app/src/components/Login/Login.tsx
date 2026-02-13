
import { Mail, Lock, LoaderCircle} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { FormsError } from '../FormsError/FormsError';
import type { Usuario } from '../../types/User';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';


type loginProps = {
    onLogin: (user: Omit<Usuario, 'id' | 'confirmPassword'>) => Promise<void>;
    error: string | null;
};

export function Login({onLogin, error}: loginProps){

    const navigate = useNavigate();

    const formSchema  = z.object({
        email: z.string().email("E-mail inválido"),
        password: z.string().min(1, "A senha é obrigatória")
    });

    type FormData = z.infer<typeof formSchema>;

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitting},
    } = useForm<FormData>({
        resolver: zodResolver(formSchema)
    });

    async function onSubmit(data: FormData){
        try {
            await onLogin({
                email: data.email,
                password: data.password
            });
            reset();
            navigate('/products-dashboard')
            } catch (err){
                return console.log(err);
            }
    };

    return (
        <div>
            <div className="flex w-[60vw] h-screen justify-center items-center
            bg-gradient-to-b from-[#e7e7e7] to-[#fff]">
                <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col w-[620px] items-center bg-[#fff] py-8
                rounded-lg">
                    <h2 className="font-bold text-[3rem] text-[#3B82F6] mt-[50px]">Login</h2>
                    <p>Acesse sua conta para continuar.</p>
                    <div className="flex flex-col relative w-[80%] my-[35px] gap-4">

                        {error && (
                            <FormsError text={error}/>
                        )}
                        
                        <label
                        className="font-semibold text-[1.2rem]">
                            E-mail
                        </label>
                        <div className='relative'>
                        <input
                        type="text"
                        disabled={isSubmitting}
                        placeholder="email@empresa.com"
                        {...register('email')}
                        className='w-full px-12 py-1 bg-[#EBEBEB] rounded-lg focus:outline-none
                        disabled:opacity-60'/>                         
                        <Mail className='absolute inset-y-1 left-2 text-[#5e5e5e]' />
                        {errors.email &&
                        <p className='text-[0.8rem] text-red-500 mt-[2px]'>
                            {errors.email.message}
                        </p>}
                        </div>

                        <label
                        className="font-semibold text-[1.2rem]">
                            Senha
                        </label>
                        
                        <div className='relative justify-center'>
                        <input
                        type="password"
                        disabled={isSubmitting}                   
                        placeholder="***********"
                        {...register('password')}                        
                        className='w-full px-12 py-1 bg-[#EBEBEB] rounded-lg focus:outline-none
                        disabled:opacity-60'/> 
                        <Lock className='absolute inset-y-1 left-2 text-[#5e5e5e]' />
                        {errors.password &&
                        <p className='text-[0.8rem] text-red-500 mt-[2px]'>
                            {errors.password.message}
                        </p>}
                        </div>

                        <button
                        type='submit'
                        disabled={isSubmitting}
                        className={`w-full bg-gradient-to-r from-[#3B82F6] to-[#2259b3] font-semibold
                        text-[#fff] p-2 rounded-lg mt-6 hover:bg-gradient-to-b hover:from-[#3B82F6]
                        hover:to-[#3B82F6] disabled:pointer-events-none
                        disabled:opacity-70 disabled:cursor-not-allowed`}>
                            {isSubmitting ? (                                
                                    <div className='flex justify-center'>
                                        <LoaderCircle className='animate-spin' size={30}/>
                                    </div>                                   
                                ) : (
                                    'Entrar'                              
                                )}
                        </button>
                        <div className='flex gap-2 mt-4'>
                            <h3>Não possui uma conta?</h3>
                            <Link
                            className='text-[#3B82F6] underline hover:text-[#2259b3]'
                            to="/register">
                                Registre-se
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
};