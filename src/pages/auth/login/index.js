import React, { useState } from 'react'
import Image from 'next/image';
import mail from '../../../../public/mail.png';
import lock from '../../../../public/lock.png';
import phone from '../../../../public/Group57.png';
import {AiOutlineEyeInvisible, AiOutlineEye} from 'react-icons/ai';
import Link from 'next/link'
import Head from 'next/head';
import {useRouter} from 'next/router';
import { withIronSessionSsr } from "iron-session/next";
import cookieConfig from '@/helpers/cookieConfig';
import axios from 'axios';

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req, res }) {
      const token = req.session?.token;

      if (token) {
        console.log('login')
        res.setHeader('location', '/home')
        console.log('login masuk')
        res.statusCode = 302
        res.end()
        return {
            props: {
                token
            }
        };
      }

      return {
        props: {},
      };
    },
    cookieConfig
  );

function Login() {
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const doLogin = async(e)=> {
        try{
            setLoading(true)
            e.preventDefault()
            const {value: email} = e.target.email
            const {value: password} = e.target.password
            setSuccessMessage('')
            const form = new URLSearchParams({
                email, password
            }).toString()
            const {data} = await axios.post('/api/login', form)
            if(data.success === true){
                router.push('/home')
                setSuccessMessage(data.message)
                setLoading(false)
                setErrorMessage('')
            }
            if(data.success === false){
                setErrorMessage(data.message)
                setLoading(false)
            }
            setLoading(false)
        }catch(err){
            const message = err?.response?.data?.message
            if(message){
                setErrorMessage(message)
                setLoading(false)
            }
            setSuccessMessage('')
        }
    }

    const [showPassword, setShowPassword] = useState(false)
    const handleTogglePassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <>
        <Head>
            <title>Page Login</title>
        </Head>
        <div className='flex'>
            <div className='w-[55%] max-sm:hidden h-screen bg-[#05BFDB] relative'>
                <div className='absolute left-[15%] max-md:left-[5%] top-10 text-white'>
                    <div className='text-2xl font-semibold text-white'>Pay<span className='text-[#0A4D68]'>Easy</span></div>
                    <Image className='h-[575px] max-lg:h-[530px] w-[512px]' src={phone} alt='phone' />
                    <div className='grid gap-4 relative top-[-30px] w-full'>
                        <div className='font-semibold text-xl'>App that Covering Banking Needs.</div>
                        <div className='text-sm font-extralight'>FazzPay is an application that focussing in banking needs for all users in the world. Always updated and always following world trends. 5000+ users registered in FazzPay everyday with worldwide users coverage.</div>
                    </div>
                </div>
            </div>
            <div className='w-[45%] max-sm:w-[90%] max-sm:ml-4 max-sm:mt-12 h-screen max-sm:h-[500px]'>
                <div className='w-[85%] max-lg:w-[90%] grid left-12 max-lg:left-2 relative top-4 max-md:top-0'>
                    <div className='w-[90%] max-sm:hidden font-bold text-2xl leading-relaxed'>Start Accessing Banking Needs With All Devices and All Platforms With 30.000+ Users</div>
                    <div className='w-[90%] sm:hidden sm:text-center font-bold text-2xl leading-relaxed'>Login</div>
                    <div className='w-full max-sm:hidden text-slate-400 leading-8 text-base'>Transfering money is eassier than ever, you can access FazzPay wherever you are. Desktop, laptop, mobile phone? we cover all of that for you!</div>
                    <div className='w-full sm:hidden text-slate-400 leading-8 text-base'>Login to your existing account to access
all the features in FazzPay.</div>
                    {errorMessage && (
                    <div>
                        <h1 className="alert alert-error max-w-[330px]">{errorMessage}</h1>
                    </div>
                    )}
                    {successMessage && (
                    <div>
                        <h1 className="alert alert-success max-w-[330px]">{successMessage}</h1>
                    </div>
                    )}
                    <form onSubmit={doLogin} className='grid gap-12 relative top-8'>
                        <div className='grid gap-1'>
                            <div className='flex gap-4'>
                                <Image src={mail} alt='mail' />
                                <input name='email' type='email' placeholder='Enter your e-mail' className='border-none pl-4 tracking-wider w-full border-slate-400'/>
                            </div>
                            <hr className='h-0.5 bg-slate-300' />
                        </div>
                        <div className='grid gap-1'>
                            <div className='flex gap-4'>
                                <Image src={lock} alt='lock' />
                                <input name='password' type={showPassword? 'text' : 'password'} placeholder='Enter your password' className='border-none pl-4 tracking-wider w-full border-slate-400'/>
                                <div className='absolute right-6' onClick={handleTogglePassword}>
                                    {showPassword ? 
                                        <AiOutlineEye size={25}/> :
                                        <AiOutlineEyeInvisible size={25}/> 
                                    }
                                </div>
                            </div>
                            <hr className='h-0.5 bg-slate-300' />
                            <Link href='/auth/forgot-password' className='place-self-end top-2 relative font-semibold text-slate-500'>Forgot Password</Link>
                        </div>
                        <div className='grid gap-4'>
                            <button disabled={loading} className='btn btn-primary w-full tracking-wider'>
                                {loading && <span className='loading loading-spinner loading-sm'></span>}
                                {!loading && 'Login'}
                            </button>
                            <div className='place-self-center tracking-wider text-slate-500'>Don’t have an account? Let’s <Link href='/auth/register' className='text-blue-500 font-semibold'> Sign Up</Link></div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default Login