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
import {AiOutlineArrowDown} from 'react-icons/ai';
import {AiOutlineEdit} from 'react-icons/ai';
import Link from 'next/link'

function TransferUser() {
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
                    <div className='w-[850px]'>
                        <div className='grid relative top-12 left-12 gap-4 h-20'>
                            <div className='font-bold'>Transfer Money</div>
                            <div className='drop-shadow-lg rounded-lg bg-white w-full flex gap-4'>
                                <Image src={avatar} alt='user'/>
                                <div className='grid gap-1'>
                                    <div className='font-bold'>Samuel Suhi</div>
                                    <div className='font-normal text-sm'>+62 813-8492-9994</div>
                                </div>
                            </div>
                        </div>
                        <div className='relative top-28 left-12 grid gap-8'>
                            <div className='w-[350px] text-slate-400'>Type the amount you want to transfer and then press continue to the next steps.</div>
                            <div className='grid justify-items-center gap-6'>
                                <div className='text-5xl text-slate-400'>0.00</div>
                                <div className='font-bold'>Rp120.000 Available</div>
                                <div>
                                    <div className='grid gap-1'>
                                        <div className='flex gap-4 items-center'>
                                            <AiOutlineEdit size={25} className='text-slate-400'/>
                                            <input type='number' placeholder='Add some notes' className='border-none pl-4 tracking-wider w-full border-slate-400'/>
                                        </div>
                                        <hr className='h-0.5 bg-slate-300 w-[500px]' />
                                    </div>
                                </div>
                            </div>
                            <button className='btn btn-primary text-white relative top-8'>Continue</button>
                        </div>
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

export default TransferUser