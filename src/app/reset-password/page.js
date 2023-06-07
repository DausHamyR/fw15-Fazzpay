import React from 'react'
import Image from 'next/image';
import mail from '../../../public/mail.png';
import lock from '../../../public/lock.png';
import phone from '../../../public/Group 57.png';
import {AiOutlineEyeInvisible} from 'react-icons/ai';
import Link from 'next/link'

function ResetPassword() {
    return (
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
                <div className='w-36 grid left-12 relative top-20 gap-7'>
                    <div className='w-[90%] font-bold text-2xl leading-relaxed'>Did You Forgot Your Password?
Don’t Worry, You Can Reset Your
Password In a Minutes.</div>
                    <div className='w-[433px] text-slate-400 leading-8 text-base'>To reset your password, you must type your e-mail and we will send a link to your email and you will be directed to the reset password screens.</div>
                    <div className='grid gap-12 relative top-8'>
                        <div className='grid gap-1'>
                            <div className='flex gap-4'>
                                <Image src={mail} alt='mail' />
                                <input type='email' placeholder='Enter your e-mail' className='border-none pl-4 tracking-wider w-full border-slate-400'/>
                            </div>
                            <hr className='h-0.5 bg-slate-300' />
                        </div>
                        <div className='grid gap-4'>
                            <button className='btn btn-primary w-full tracking-wider'>Confirm</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword