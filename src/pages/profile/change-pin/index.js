import React from 'react'
import Image from 'next/image';
import {FiBell} from 'react-icons/fi'
import logout from '../../../public/log-out.png';
import plusTransfer from '../../../public/Group 33.png';
import topUp from '../../../public/Group 34.png';
import avatar from '../../../public/Rectangle 25.png';
import graphic from '../../../public/graphic.png';
import grid from '../../../public/grid.svg';
import {AiOutlineUser} from 'react-icons/ai';
import {AiOutlinePlus} from 'react-icons/ai';
import {AiOutlineArrowUp} from 'react-icons/ai';
import {HiOutlineLockClosed} from 'react-icons/hi';
import {AiOutlineEyeInvisible} from 'react-icons/ai';
import Link from 'next/link'

function ChangePin() {
    return (
        <div className='bg-[#E5E5E5]'>
            <div className='w-full bg-white h-24 flex justify-around items-center'>
                <div className='text-blue-500 text-2xl font-bold'>FazzPay</div>
                <div className='flex items-center gap-6'>
                    <Image src={avatar} alt='avatar'/>
                    <div className='grid'>
                        <div>Robert Chandler</div>
                        <div>+62 8139 3877 7946</div>
                    </div>
                    <FiBell size={25}/>
                </div>
            </div>
            <div className='flex justify-center gap-8'>
                <div className='w-[270px] h-[678px] grid content-around justify-items-center bg-white relative top-12 rounded-xl'>
                    <div className='relative grid gap-12 top-12 font-semibold'>
                        <div className='flex gap-2 items-center'>
                            <Image src={grid} alt='grid' />
                            <Link href='/home' className='text-blue-500'>Dashboard</Link>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <AiOutlineArrowUp />
                            <Link href='/transfer'>Transfer</Link>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <AiOutlinePlus />
                            <Link href='/'>Top uP</Link>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <AiOutlineUser />
                            <Link href='/profile'>Profile</Link>
                        </div>
                    </div>
                    <div className='flex gap-2 items-center font-semibold'>
                        <Image src={logout} alt='logout'/>Logout
                    </div>
                </div>
                <div className='w-[950px] h-[678px] bg-white relative top-12 rounded-xl'>
                    <div className='relative left-12 top-8 grid gap-6'>
                        <div className='font-bold text-xl'>Change Pin</div>
                        <div className='w-[350px] text-slate-400'>Enter your current 6 digits Fazzpay PIN below to continue to the next steps.</div>
                    </div>
                    <div className='grid justify-center content-center gap-12 relative top-24 w-full'>
                        <div className='flex gap-6'>
                            <div className='w-[53px] h-[65px] bg-white border-2 rounded-xl'></div>
                            <div className='w-[53px] h-[65px] bg-white border-2 rounded-xl'></div>
                            <div className='w-[53px] h-[65px] bg-white border-2 rounded-xl'></div>
                            <div className='w-[53px] h-[65px] bg-white border-2 rounded-xl'></div>
                            <div className='w-[53px] h-[65px] bg-white border-2 rounded-xl'></div>
                            <div className='w-[53px] h-[65px] bg-white border-2 rounded-xl'></div>
                        </div>
                        <button className='btn btn-primary text-white'>Continue</button>
                    </div>
                </div>
            </div>
            <div className='flex justify-around items-center relative top-20 bg-[#6379F4] h-[68px] text-white'>
                <div>2020 FazzPay. All right reserved.</div>
                <div className='flex gap-8'>
                    <div>+62 5637 8882 9901</div>
                    <div>contact@fazzpay.com</div>
                </div>
            </div>
        </div>
    )
}

export default ChangePin