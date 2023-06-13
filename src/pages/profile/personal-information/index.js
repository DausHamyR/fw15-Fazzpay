import React from 'react'
import Image from 'next/image';
import {FiBell} from 'react-icons/fi'
import logout from '../../../../public/log-out.png';
import grid from '../../../../public/grid.svg';
import {AiOutlineUser} from 'react-icons/ai';
import {AiOutlinePlus} from 'react-icons/ai';
import {AiOutlineArrowUp} from 'react-icons/ai';
import Link from 'next/link'
import { withIronSessionSsr } from "iron-session/next";
import cookieConfig from '@/helpers/cookieConfig';
import checkCredentials from '@/helpers/checkCredentials';
import axios from 'axios';
import Navbar from '@/components/Navbar';

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req, res }) {
        const token = req.session?.token
        checkCredentials(token, res, '/auth/login')

      const {data} = await axios.get('https://cute-lime-goldfish-toga.cyclic.app/profile', {
        headers: {
            Authorization: `Bearer ${token}`
        }
      })
  
      return {
        props: {
          token,
          user: data.results
        },
      };
    },
    cookieConfig
  );

function PersonalInformation({user}) {
    return (
        <div className='bg-[#E5E5E5]'>
            <Navbar user={user}/>
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
                    <Link href='/auth/logout' className='flex gap-2 items-center font-semibold'>
                        <Image src={logout} alt='logout'/>Logout
                    </Link>
                </div>
                <div className='w-[950px] h-[678px] bg-white relative top-12 rounded-xl'>
                    <div className='relative left-12 top-8 grid gap-6'>
                        <div className='font-bold text-xl'>Personal Information</div>
                        <div className='w-[370px] text-slate-400'>We got your personal information from the sign up proccess. If you want to make changes on your information, contact our support.</div>
                    </div>
                    <div className='grid justify-center gap-4 relative top-16'>
                        <div className='w-[840px] h-[92px] bg-slate-100 rounded-xl grid content-center gap-2 pl-6'>
                            <div className='text-sm text-slate-500'>First Name</div>
                            {user.fullName === null ? 
                                <div className='font-bold'>{user.fullName}</div> :
                                <div className='font-bold'>{user.fullName.split(' ')[0]}</div>
                            }
                        </div>
                        <div className='w-[840px] h-[92px] bg-slate-100 rounded-xl grid content-center gap-2 pl-6'>
                            <div className='text-sm text-slate-500'>Last Name</div>
                            {user.fullName === null ? 
                                <div className='font-bold'>{user.fullName}</div> :
                                <div className='font-bold'>{user.fullName.split(' ').pop()}</div>
                            }
                        </div>
                        <div className='w-[840px] h-[92px] bg-slate-100 rounded-xl grid content-center gap-2 pl-6'>
                            <div className='text-sm text-slate-500'>Verified E-mail</div>
                            <div className='font-bold'>{user.email}</div>
                        </div>
                        <div className='w-[840px] h-[92px] flex justify-between items-center bg-slate-100 rounded-xl pl-6'>
                            <div className='grid content-center gap-2 h-[92px]'>
                                <div className='text-sm text-slate-500'>Phone Number</div>
                                <div className='font-bold'>{user.phones}</div>
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