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
import {AiOutlineSearch} from 'react-icons/ai';

function Transfer() {
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
                            <div className='text-blue-500'>Dashboard</div>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <AiOutlineArrowUp />
                            <div>Transfer</div>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <AiOutlinePlus />
                            <div>Top uP</div>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <AiOutlineUser />
                            <div>Profile</div>
                        </div>
                    </div>
                    <div className='flex gap-2 items-center font-semibold'>
                        <Image src={logout} alt='logout'/>Logout
                    </div>
                </div>
                <div className='w-[950px] h-[678px] bg-white relative top-12 rounded-xl'>
                    <div className='w-[850px]'>
                        <div className='grid relative top-12 left-12 gap-4 h-20'>
                            <div className='font-bold'>Search Receiver</div>
                            <input type="text" placeholder="Search receiver here" class="input input-bordered w-full bg-slate-200 pl-16" />
                            <AiOutlineSearch size={30} className='relative top-[-55px] left-4 text-slate-400'/>
                        </div>
                        <div className='grid gap-12 relative top-12 left-12'>
                            <div className='flex justify-start items-center'>
                                <div className='flex relative top-12 left-4 gap-4 drop-shadow-lg rounded-lg bg-white w-full'>
                                    <Image src={avatar} alt='avatar' />
                                    <div className='grid gap-2'>
                                        <div className='font-bold'>Samuel Suhi</div>
                                        <div className='text-sm'>+62 813-8492-9994</div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-start items-center'>
                                <div className='flex relative top-12 left-4 gap-4 drop-shadow-lg rounded-lg bg-white w-full'>
                                    <Image src={avatar} alt='avatar' />
                                    <div className='grid gap-2'>
                                        <div className='font-bold'>Samuel Suhi</div>
                                        <div className='text-sm'>+62 813-8492-9994</div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-start items-center'>
                                <div className='flex relative top-12 left-4 gap-4 drop-shadow-lg rounded-lg bg-white w-full'>
                                    <Image src={avatar} alt='avatar' />
                                    <div className='grid gap-2'>
                                        <div className='font-bold'>Samuel Suhi</div>
                                        <div className='text-sm'>+62 813-8492-9994</div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-start items-center'>
                                <div className='flex relative top-12 left-4 gap-4 drop-shadow-lg rounded-lg bg-white w-full'>
                                    <Image src={avatar} alt='avatar' />
                                    <div className='grid gap-2'>
                                        <div className='font-bold'>Samuel Suhi</div>
                                        <div className='text-sm'>+62 813-8492-9994</div>
                                    </div>
                                </div>
                            </div>
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

export default Transfer