import React from 'react'
import TopUp from './TopUp'
import Link from 'next/link'
import Image from 'next/image';
import {AiOutlineUser, AiOutlinePlus, AiOutlineArrowUp} from 'react-icons/ai';
import {BsGrid} from 'react-icons/bs';
import {TbLogout} from 'react-icons/tb';
import { useRouter } from 'next/router';

function Dashboard() {
  const router = useRouter()
  return (
    <div className='bg-white max-w-[270px] h-[678px] rounded-xl py-4 px-16 flex flex-col justify-around items-center'>
      <div className='flex flex-col gap-8'>
        <Link href='/home' className={`flex items-center gap-4 hover:text-blue-500 ${router.pathname === '/home' ? 'text-[#FF8551] border-l-4 border-[#FF8551] pl-2' : ''}`}>
          <BsGrid size={30}/>
          <div>Dashboard</div>
        </Link>
        <Link href='/transfer' className={`flex items-center gap-4 hover:text-blue-500 ${router.pathname === '/transfer' ? 'text-[#FF8551] border-l-4 border-[#FF8551] pl-2' : ''}`}>
          <AiOutlinePlus size={30}/>
          <div>Transfer</div>
        </Link>
        <div className={`flex items-center gap-4 hover:text-blue-500 ${router.pathname === '/home1' ? 'text-[#FF8551] border-l-4 border-[#FF8551] pl-2' : ''} cursor-pointer`}>
          <AiOutlineArrowUp size={30}/>
          <div>Top up</div>
        </div>
        <Link href='/profile' className={`flex items-center gap-4 hover:text-blue-500 ${router.pathname === '/profile' ? 'text-[#FF8551] border-l-4 border-[#FF8551] pl-2' : ''}`}>
          <AiOutlineUser size={30}/>
          <div>Profile</div>
        </Link>
      </div>
      <Link href='/auth/logout' className='flex items-center gap-4 hover:text-blue-500 text-red-500 font-semibold'>
        <TbLogout size={30}/>
        <div>Logout</div>
      </Link>
    </div>
  )
}

export default Dashboard