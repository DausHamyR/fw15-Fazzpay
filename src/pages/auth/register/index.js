import React from 'react'
import Image from 'next/image';
import mail from '../../../../public/mail.png';
import lock from '../../../../public/lock.png';
import phone from '../../../../public/Group 57.png';
import {AiOutlineEyeInvisible} from 'react-icons/ai';
import {AiOutlineUser} from 'react-icons/ai';
import Link from 'next/link'
import Head from 'next/head';
import {useRouter} from 'next/router';
import axios from 'axios';

function Register() {
    const router = useRouter()
    const [errorMessage, setErrorMessage] = React.useState('')
    const [successMessage, setSuccessMessage] = React.useState('')
    // const [showPassword, setShowPassword] = React.useState(false)
    // const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)

    // const handleTogglePassword = () => {
    //     setShowPassword((prevState) => !prevState)
    // }
    // const handleToggleConfirmPassword = () => {
    //     setShowConfirmPassword((prevState) => !prevState)
    // }
    const doRegister = async (event) => {
        try{
            event.preventDefault()
            const {value: firstname} = event.target.firstname
            const {value: lastname} = event.target.lastname
            const {value: email} = event.target.email
            const {value: password} = event.target.password
            setSuccessMessage('')
            
            if(!firstname || firstname.length < 3){
                setErrorMessage('firstname must be at least 3 characters long')
                return
            }
            if(!lastname || !lastname.length < 3){
                setErrorMessage('lastname must be at least 3 characters long')
                return
            }
            if(!email || !email.includes('@')){
                setErrorMessage('Invalid email')
                return
            }
            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
            if (!password || !passwordRegex.test(password)) {
                setErrorMessage('Password must contain at least 8 characters, including 1 uppercase letter, 1 lowercase letter, 1 number, and 1 symbol')
                return
            }
            const body = new URLSearchParams({firstname, lastname, email, password}).toString()
            const {data} = await axios.post('https://cute-lime-goldfish-toga.cyclic.app/auth/register', body)
            setSuccessMessage(data.message)
            router.push('/auth/login')
            setErrorMessage('')
        }catch(err){
            console.log(err)
        }
    }

    return (
        <>
        <Head>
            <title>Page Register</title>
        </Head>
        <div className='flex'>
            <div className='w-[55%] h-screen bg-[#6379F4] relative'>
                <div className='absolute left-32 top-12 text-white'>
                    <div className='text-2xl font-semibold text-white'>FazzPay</div>
                    <Image src={phone} alt='phone' />
                    <div className='grid gap-4 relative top-[-30px] w-[550px]'>
                        <div className='font-semibold text-xl'>App that Covering Banking Needs.</div>
                        <div className='text-sm font-extralight'>FazzPay is an application that focussing in banking needs for all users
    in the world. Always updated and always following world trends.
    5000+ users registered in FazzPay everyday with worldwide
    users coverage.</div>
                    </div>
                </div>
            </div>
            <div className='w-[40%] h-screen'>
                <div className='w-36 grid left-12 relative gap-7'>
                    <div className='w-[90%] font-bold text-2xl leading-relaxed'>Start Accessing Banking Needs
    With All Devices and All Platforms
    With 30.000+ Users</div>
                    <div className='w-[433px] text-slate-400 leading-8 text-base'>Transfering money is eassier than ever, you can access FazzPay wherever you are. Desktop, laptop, mobile phone? we cover all of that for you!</div>
                    {errorMessage && (
                    <div>
                        <h1 className="alert alert-error w-[400px]">{errorMessage}</h1>
                    </div>
                    )}
                    {successMessage && (
                    <div>
                        <h1 className="alert alert-success w-[400px]">{successMessage}</h1>
                    </div>
                    )}
                    <form onSubmit={doRegister} className='grid gap-10 relative top-4'>
                        <div className='grid gap-1'>
                            <div className='flex gap-4'>
                                <AiOutlineUser size={20} className='text-slate-400'/>
                                <input name='firstname' type='text' placeholder='Enter your firstname' className='border-none pl-4 tracking-wider w-full border-slate-400'/>
                            </div>
                            <hr className='h-0.5 bg-slate-300' />
                        </div>
                        <div className='grid gap-1'>
                            <div className='flex gap-4'>
                                <AiOutlineUser size={20} className='text-slate-400'/>
                                <input name='lastname' type='text' placeholder='Enter your lastname' className='border-none pl-4 tracking-wider w-full border-slate-400'/>
                            </div>
                            <hr className='h-0.5 bg-slate-300' />
                        </div>
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
                                <input name='password' type='password' placeholder='Create your password' className='border-none pl-4 tracking-wider w-full border-slate-400'/>
                                <AiOutlineEyeInvisible size={25}/>
                            </div>
                            <hr className='h-0.5 bg-slate-300' />
                        </div>
                        <div className='grid gap-4'>
                            <button className='btn btn-primary w-full tracking-wider'>Sign Up</button>
                            <div className='place-self-center tracking-wider text-slate-500'>Already have an account?<Link href='/auth/login' className='text-blue-500 font-semibold'> Let’s Login</Link></div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default Register