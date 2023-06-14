import React from 'react'
import TopUp from './TopUp'
import Link from 'next/link'
import Image from 'next/image';
import {AiOutlineUser, AiOutlinePlus, AiOutlineArrowUp} from 'react-icons/ai';
import grid from '../../public/grid.svg';
import logout from '../../public/log-out.png';

function Dashboard() {
  return (
    <div className='max-md:hidden w-[270px] h-[678px] grid content-around justify-items-center bg-white relative top-12 rounded-xl'>
        <div className='relative grid gap-12 top-12 font-semibold'>
            <Link href='/home' className='flex gap-2 items-center border-l-4 border-primary'>
                <Image src={grid} alt='grid' />
                <div className='text-blue-500'>Dashboard</div>
            </Link>
            <div className='flex gap-2 items-center'>
                <AiOutlineArrowUp />
                <Link href='/transfer'>Transfer</Link>
            </div>
            <div className='flex gap-2 items-center'>
                <AiOutlinePlus />
                <TopUp />
            </div>
            <div className='flex gap-2 items-center'>
                <AiOutlineUser />
                <Link href='/profile'>Profile</Link>
            </div>
        </div>
        <Link href='/auth/logout' className='flex gap-2 items-center font-semibold'>
            <Image src={logout} alt='logout'/>Logout
        </Link>
    </div>
  )
}

export default Dashboard