import React from 'react'
import Image from 'next/image';
import {FiBell} from 'react-icons/fi'
import logout from '../../../public/log-out.png';
import grid from '../../../public/grid.svg';
import {AiOutlineUser} from 'react-icons/ai';
import {AiOutlinePlus} from 'react-icons/ai';
import {AiOutlineArrowUp} from 'react-icons/ai';
import {AiOutlineArrowRight} from 'react-icons/ai';
import {AiOutlineEdit} from 'react-icons/ai';
import Link from 'next/link'
import cookieConfig from '@/helpers/cookieConfig';
import { withIronSessionSsr } from "iron-session/next";
import axios from 'axios';
import checkCredentials from '@/helpers/checkCredentials';

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

function Profile({token, user}) {
    return (
        <div className='bg-[#E5E5E5]'>
            {token}
            <div className='w-full bg-white h-24 flex justify-around items-center'>
                <div className='text-blue-500 text-2xl font-bold'>FazzPay</div>
                <div className='flex items-center gap-6'>
                    <Image src={user.picture} width={50} height={50} className='rounded-xl' alt='avatar'/>
                    <div className='grid'>
                        <div>{user.fullName}</div>
                        <div>{user.phones}</div>
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
                    <Link href='/auth/logout' className='flex gap-2 items-center font-semibold'>
                        <Image src={logout} alt='logout'/>Logout
                    </Link>
                </div>
                <div className='w-[950px] h-[678px] bg-white relative top-12 rounded-xl grid justify-items-center gap-16'>
                    <div className='grid justify-items-center content-start gap-2 relative top-24'>
                        <Image src={user.picture} width={50} height={50} className='rounded-xl' alt='user'/>
                        <div className='flex gap-2 items-center'>
                            <AiOutlineEdit />
                            <div className='text-xs'>Edit</div>
                        </div>
                        <div className='font-bold text-xl'>{user.fullName}</div>
                        <div className='font-normal text-sm text-slate-400'>{user.phones}</div>
                    </div>
                    <div className='grid font-semibold'>
                        <div className='flex justify-around items-center w-[433px] h-[64px] bg-slate-200 rounded-lg'>
                            <div>Personal Information</div>
                            <AiOutlineArrowRight size={20}/>
                        </div>
                        <div className='flex justify-around items-center w-[433px] h-[64px] bg-slate-200 rounded-lg'>
                            <div>Change Password</div>
                            <AiOutlineArrowRight size={20}/>
                        </div>
                        <div className='flex justify-around items-center w-[433px] h-[64px] bg-slate-200 rounded-lg'>
                            <div>Change Pin</div>
                            <AiOutlineArrowRight size={20}/>
                        </div>
                        <div className='flex justify-around items-center w-[433px] h-[64px] bg-slate-200 rounded-lg'>
                            <div>Logout</div>
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

export default Profile