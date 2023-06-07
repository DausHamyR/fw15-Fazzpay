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
import {AiOutlineArrowRight} from 'react-icons/ai';
import {AiOutlineEdit} from 'react-icons/ai';

function PersonalInformation() {
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
                    <div className='relative left-12 top-8 grid gap-6'>
                        <div className='font-bold text-xl'>Personal Information</div>
                        <div className='w-[370px] text-slate-400'>We got your personal information from the sign up proccess. If you want to make changes on your information, contact our support.</div>
                    </div>
                    <div className='grid justify-center gap-4 relative top-16'>
                        <div className='w-[840px] h-[92px] bg-slate-100 rounded-xl grid content-center gap-2 pl-6'>
                            <div className='text-sm text-slate-500'>First Name</div>
                            <div className='font-bold'>Robert</div>
                        </div>
                        <div className='w-[840px] h-[92px] bg-slate-100 rounded-xl grid content-center gap-2 pl-6'>
                            <div className='text-sm text-slate-500'>Last Name</div>
                            <div className='font-bold'>Chandler</div>
                        </div>
                        <div className='w-[840px] h-[92px] bg-slate-100 rounded-xl grid content-center gap-2 pl-6'>
                            <div className='text-sm text-slate-500'>Verified E-mail</div>
                            <div className='font-bold'>pewdiepie1@gmail.com</div>
                        </div>
                        <div className='w-[840px] h-[92px] flex justify-between items-center bg-slate-100 rounded-xl pl-6'>
                            <div className='grid content-center gap-2 h-[92px]'>
                                <div className='text-sm text-slate-500'>Phone Number</div>
                                <div className='font-bold'>+62 813-9387-7946</div>
                            </div>
                            <div className='text-blue-500 mr-4 font-semibold'>Manage</div>
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

export default PersonalInformation