import React from 'react'
import Image from 'next/image';
import logout from '../../../public/log-out.png';
import avatar from '../../../public/Rectangle 25.png';
import grid from '../../../public/grid.svg';
import {AiOutlineUser} from 'react-icons/ai';
import {AiOutlinePlus} from 'react-icons/ai';
import {AiOutlineArrowUp} from 'react-icons/ai';
import Link from 'next/link'
import Navbar from '@/components/Navbar';
import cookieConfig from '@/helpers/cookieConfig';
import { withIronSessionSsr } from "iron-session/next";
import checkCredentials from '@/helpers/checkCredentials';
import http from '@/helpers/http.helper';

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req, res }) {
        const token = req.session?.token
        checkCredentials(token, res, '/auth/login')
        const {data} = await http(token).get('/profile')
        return {
            props: {
                token,
                user: data.results,
            },
        };
    },
    cookieConfig
);

function Confirmation({user}) {
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
                    <div className='flex gap-2 items-center font-semibold'>
                        <Image src={logout} alt='logout'/>Logout
                    </div>
                </div>
                <div className='w-[950px] h-[678px] bg-white relative top-12 rounded-xl'>
                    <div className='w-[850px]'>
                        <div className='grid relative top-12 left-12 gap-4 h-20'>
                            <div className='font-bold'>Transfer To</div>
                            <div className='drop-shadow-lg rounded-lg bg-white w-full flex gap-4'>
                                <Image src={avatar} alt='user'/>
                                <div className='grid gap-1'>
                                    <div className='font-bold'>Samuel Suhi</div>
                                    <div className='font-normal text-sm'>+62 813-8492-9994</div>
                                </div>
                            </div>
                        </div>
                        <div className='relative top-28 left-12 grid gap-8'>
                            <div className='font-bold'>Details</div>
                            <div className='grid gap-8'>
                                <div className='drop-shadow-lg rounded-lg bg-white w-full grid gap-2 pl-6'>
                                    <div className='font-light'>Amount</div>
                                    <div className='font-bold'>Rp.100.000</div>
                                </div>
                                <div className='drop-shadow-lg rounded-lg bg-white w-full grid gap-2 pl-6'>
                                    <div className='font-light'>Balance Left</div>
                                    <div className='font-bold'>Rp.20.000</div>
                                </div>
                                <div className='drop-shadow-lg rounded-lg bg-white w-full grid gap-2 pl-6'>
                                    <div className='font-light'>Date & Time</div>
                                    <div className='font-bold'>May 11, 2020 - 12.20</div>
                                </div>
                                <div className='drop-shadow-lg rounded-lg bg-white w-full grid gap-2 pl-6'>
                                    <div className='font-light'>Notes</div>
                                    <div className='font-bold'>For buying some socks</div>
                                </div>
                                <button className='btn btn-primary text-white'>Continue</button>
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

export default Confirmation