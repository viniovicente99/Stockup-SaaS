
import { User, Mail, Lock, LoaderCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FormsError } from '../../components/FormsError/FormsError';
import type { Usuario } from '../../types/User';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormSuccess } from '../FormSuccess/FormSuccess';

type registerProps = {
    oncreate: (user: Usuario) => Promise<void>;
    loading: boolean;
    error: string | null;
    created: boolean;
};

export function Register({oncreate, loading, error, created}: registerProps ){
    
    const formSchema = z.object({
        name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres.'),
        email: z.string().email("E-mail inválido."),
        password: z.string()
        .min(8, 'A senha deve ter pelo menos 8 caracteres.')
        .regex(/[A-Z]/, "A senha deve ter pelo menos uma letra maiúscula.")
        .regex(/[a-z]/, "A senha deve ter pelo menos uma letra minúscula.")
        .regex(/[0-9]/, "A senha deve ter pelo menos um número.")
        .regex(/[^A-Za-z0-9]/, "A senha deve ter pelo menos um caracter especial."),
        confirmPassword: z.string()
    }).refine((data) => data.confirmPassword === data.password, {
        message: 'As senhas não coincidem.',
        path: ['confirmPassword']
    })

    type FormData = z.infer<typeof formSchema>;
    
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: {errors, isSubmitting},
    } = useForm<FormData>({
        resolver: zodResolver(formSchema)
    });

    async function onSubmit(data: FormData){
        try {
        await oncreate({
            name: data.name,
            email: data.email,
            password: data.password,
            confirmPassword: data.confirmPassword
        });
        reset();
        } catch (err){
            return console.log(err);
        }
    };


    return (
        <div>
            {created ?(
                <div className="flex w-[60vw] justify-center h-full items-center bg-gradient-to-b from-[#e7e7e7] to-[#fff]
            ">
                <div
                className="flex flex-col w-[620px] justify-center py-[50px] items-center
                bg-[#fff] rounded-lg">

                    <h2 className="font-bold text-[2.5rem] text-[#3B82F6] mt-[20px]">Bem vindo(a)!</h2>
                    <div className="flex flex-col relative  w-[80%] my-[20px] gap-3">

                        <FormSuccess
                        text='Conta criada com sucesso.'
                        />

                        <p className="text-gray-600 text-center my-4 mb-6">
                            Sua conta foi criada com sucesso. Agora você pode fazer login e começar a usar o sistema.
                        </p>

                       
                          <Link
                            to="/login"
                            className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors duration-300"
                            >
                            Ir para Login
                            </Link>
                    </div>
                </div>
            </div>

            ) : (
                <div className="flex w-[60vw] justify-center h-full items-center bg-gradient-to-b from-[#e7e7e7] to-[#fff]
            ">
                <form onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col w-[620px] max-h-[660px] items-center
                bg-[#fff] rounded-lg">

                    <h2 className="font-bold text-[3rem] text-[#3B82F6] mt-[20px]">Criar conta</h2>
                    <p>Preencha as informações abaixo para continuar.</p>
                    <div className="flex flex-col relative w-[80%] my-[20px] gap-3">

                        {error && (
                            <FormsError text={error}/>
                        )}                        

                        <label
                        className="font-semibold text-[1rem]">
                            Nome
                        </label>
                        <div className='relative'>                          
                            
                        <input                        
                        type="text"
                        placeholder="email@empresa.com"
                        disabled={isSubmitting}
                        {...register('name')}
                        className='w-full px-10 py-1 bg-[#EBEBEB] rounded-lg focus:outline-none
                        disabled:opacity-60'/> 
                        <User className='absolute inset-y-1 left-2 text-[#5e5e5e]' />
                        {errors.name &&
                        <p className='text-[0.8rem] text-red-500 mt-[2px]'>
                            {errors.name.message}
                        </p>}
                        </div>
                                               
                        <label
                        className="font-semibold text-[1rem]">
                            E-mail
                        </label>
                        <div className='relative'>                          
                            
                        <input
                        placeholder="email@empresa.com"
                        disabled={isSubmitting}
                        type="text"
                        {...register('email')}
                        className='w-full px-10 py-1 bg-[#EBEBEB] rounded-lg focus:outline-none
                        disabled:opacity-60' /> 
                        <Mail className='absolute inset-y-1 left-2 text-[#5e5e5e]' />
                        {errors.email &&
                        <p className='text-[0.8rem] text-red-500 mt-[2px]'>
                            {errors.email.message}
                        </p>}
                        </div>

                        <label
                        className="font-semibold text-[1rem]">
                            Senha
                        </label>
                        
                        <div className='relative justify-center'>
                        <input
                        type='password'
                        disabled={isSubmitting}
                        placeholder='***********'
                        {...register('password')}
                        className='w-full px-10 py-1 bg-[#EBEBEB] rounded-lg focus:outline-none
                        disabled:opacity-60' /> 
                        <Lock className='absolute inset-y-1 left-2 text-[#5e5e5e]' />
                        {errors.password &&
                        <p className='text-[0.8rem] text-red-500 mt-[2px]'>
                            {errors.password.message}
                        </p>}
                        
                        </div>

                        <label
                        className="font-semibold text-[1rem]"
                        htmlFor="confirmPassword">
                            Confirmar Senha
                        </label>
                        
                        <div className='relative justify-center'>
                        <input
                        placeholder="***********"
                        disabled={isSubmitting}
                        type="password"
                        {...register('confirmPassword')}
                        className='w-full px-10 py-1 bg-[#EBEBEB] rounded-lg focus:outline-none
                        disabled:opacity-60' /> 
                        <Lock className='absolute inset-y-1 left-2 text-[#5e5e5e]' />
                        {errors.confirmPassword &&
                        <p className='text-[0.8rem] text-red-500 mt-[2px]'>
                            {errors.confirmPassword.message}
                        </p>}
                        </div>

                        <button
                            type='submit'
                            disabled={isSubmitting}
                            className='w-full bg-gradient-to-r from-[#3B82F6] to-[#2259b3] font-semibold
                            text-[#fff] p-2 rounded-lg mt-5 hover:bg-gradient-to-b hover:from-[#3B82F6]
                            hover:to-[#3B82F6] disabled:opacity-70'>
                                {isSubmitting ? (                                
                                    <div className='flex justify-center'>
                                        <LoaderCircle className='animate-spin' size={25}/>
                                    </div>                                   
                                ) : (
                                    'Criar conta'                              
                                )}
                        </button>

                        <div className='flex gap-2 mt-3'>
                            <h3>Já possui uma conta?</h3>
                            <Link
                            className='text-[#3B82F6] underline hover:text-[#2259b3]'
                            to="/login">
                                Login
                            </Link>
                        </div>
                    </div>
                </form>
            </div>

            )}
            
        </div>
    )
};