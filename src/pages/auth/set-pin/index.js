import React from 'react'
import Image from 'next/image'
import phone from '../../../../public/Group57.png'
import Head from 'next/head'
import { useRouter } from 'next/router'
import http from '@/helpers/http.helper'
import PinInput from '@/components/PinInput'
import { useDispatch, useSelector } from 'react-redux'
import { clearAuthState } from '@/redux/reducers/auth'

function CreatePin() {
    const email = useSelector(state => state.auth.email)
    const [errorMessage, setErrorMessage] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const router = useRouter()
    const dispatch = useDispatch()
    const [pin, setPin] = React.useState('')
    
    React.useEffect(()=> {
        if(!email){
            router.back()
        }
    }, [email, router])

    const setUserPin = async(event)=> {
        try{
            setLoading(true)
            event.preventDefault()
            const pinValue = pin.toString()
            const body = new URLSearchParams({
                email,
                pin
            }).toString()
            const {data} = await http().post('/auth/set-pin', body)
            setLoading(false)
            dispatch(clearAuthState())
            router.push('/auth/login')
        }catch(err){
            console.log(err)
            setLoading(false)
            setErrorMessage('Error!')
        }
    }

    return (
        <>
        <Head>
            <title>Page Create Pin</title>
        </Head>
        <div className='flex'>
        <div className='w-[55%] max-sm:hidden h-screen bg-[#05BFDB] relative'>
                <div className='absolute left-[15%] max-md:left-[5%] top-12 text-white'>
                    <div className='text-2xl font-semibold text-white'>Pay<span className='text-[#0A4D68]'>Easy</span></div>
                    <Image className='h-[575px] max-xl:h-[530px] w-[512px]' src={phone} alt='phone' />
                    <div className='grid gap-4 relative top-[-30px] w-full'>
                        <div className='font-semibold text-xl'>App that Covering Banking Needs.</div>
                        <div className='text-sm font-extralight'>FazzPay is an application that focussing in banking needs for all users in the world. Always updated and always following world trends. 5000+ users registered in FazzPay everyday with worldwide users coverage.</div>
                    </div>
                </div>
            </div>
            <div className='w-[45%] max-sm:w-[90%] max-sm:ml-4 max-sm:mt-12 h-screen max-sm:h-[500px]'>
                <div className='w-[85%] max-lg:w-[90%] grid left-12 max-lg:left-2 relative top-20 max-md:top-0 gap-7'>
                    <div className='w-full font-bold text-2xl leading-relaxed'>Secure Your Account, Your Wallet, and Your Data With 6 Digits PIN That You Created Yourself.</div>
                    <div className='w-full text-slate-400 leading-8 text-base'>Create 6 digits pin to secure all your money and your data in FazzPay app. Keep it secret and don’t tell anyone about your FazzPay account password and the PIN.</div>
                    <form onSubmit={setUserPin} className='grid gap-10 relative top-4'>
                        {errorMessage && 
                        <div className='alert alert-error'>
                            {errorMessage}
                        </div>}
                        <PinInput onChangePin={setPin}/>
                        <div className='grid gap-4'>
                            <button disabled={loading} type='submit' className='btn btn-primary w-full tracking-wider'>Confirm</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default CreatePin