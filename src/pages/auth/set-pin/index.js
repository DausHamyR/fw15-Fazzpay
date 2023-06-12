import React from 'react'
import Image from 'next/image'
import phone from '../../../../public/Group 57.png'
import Head from 'next/head'
import { useRouter } from 'next/router'
import http from '@/helpers/http.helper'
import PinInput from '@/components/PinInput'

function CreatePin({email}) {
    const router = useRouter()
    const [pin, setPin] = React.useState('')
    

    const submitPin = async(event)=> {
        event.preventDefault()
        const pinValue = pin.toString()
        const body = new URLSearchParams({pin: pinValue}).toString()
        const {data} = await http().post('/auth/set-pin', body)
        router.push('/auth/login')
    }

    return (
        <>
        <Head>
            <title>Page Create Pin</title>
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
                <div className='w-36 grid left-12 relative top-12 gap-7'>
                    <div className='w-full font-bold text-2xl leading-relaxed'>Secure Your Account, Your Wallet,
and Your Data With 6 Digits PIN
That You Created Yourself.</div>
                    <div className='w-[433px] text-slate-400 leading-8 text-base'>Create 6 digits pin to secure all your money and your data in FazzPay app. Keep it secret and don’t tell anyone about your FazzPay account password and the PIN.</div>
                    <PinInput onChangePin={}/>
                </div>
            </div>
        </div>
        </>
    )
}

export default CreatePin