import React, {useState, useEffect} from 'react'
import Image from 'next/image';
import {FiBell} from 'react-icons/fi'
import logout from '../../../../public/log-out.png';
import statusSuccess from '../../../../public/Group 39.png';
import grid from '../../../../public/grid.svg';
import {AiOutlineUser} from 'react-icons/ai';
import {AiOutlinePlus} from 'react-icons/ai';
import {AiOutlineArrowUp} from 'react-icons/ai';
import {AiOutlineDownload} from 'react-icons/ai';
import Link from 'next/link'
import cookieConfig from '@/helpers/cookieConfig';
import { withIronSessionSsr } from "iron-session/next";
import checkCredentials from '@/helpers/checkCredentials';
// import { useRouter } from 'next/router'
import http from '@/helpers/http.helper';
import moment from 'moment/moment';
import Navbar from '@/components/Navbar';

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req, res, params }) {
        const token = req.session?.token
        const {id} = params
        checkCredentials(token, res, '/auth/login')
        const {data} = await http(token).get('/profile')
        const {data: historyTransactions} = await http(token).get(`/transactions/${id}`)
        return {
            props: {
                token,
                user: data.results,
                history: historyTransactions.results
            },
        };
    },
    cookieConfig
);

function Status({user, history}) {

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
                    <div className='grid content-center justify-items-center relative top-6'>
                        <Image src={statusSuccess} alt='success' />
                        <div className='font-bold tracking-wide'>Transfer Success</div>
                    </div>
                    <div className='grid gap-8'>
                        <div className='drop-shadow-lg rounded-lg bg-white w-full grid gap-2 pl-6'>
                            <div className='font-light'>Amount</div>
                            <div className='font-bold'>{history.amount}</div>
                        </div>
                        <div className='drop-shadow-lg rounded-lg bg-white w-full grid gap-2 pl-6'>
                            <div className='font-light'>Balance Left</div>
                            <div className='font-bold'>{user.balance}</div>
                        </div>
                        <div className='drop-shadow-lg rounded-lg bg-white w-full grid gap-2 pl-6'>
                            <div className='font-light'>Date & Time</div>
                            <div className='font-bold'>{moment(history.createdAt).format('MMM D, YYYY - HH.mm')}</div>
                        </div>
                        <div className='drop-shadow-lg rounded-lg bg-white w-full grid gap-2 pl-6'>
                            <div className='font-light'>Notes</div>
                            <div className='font-bold'>{history.notes}</div>
                        </div>
                    </div>
                    <div className='grid relative top-8 left-12 gap-4 h-20 w-[95%]'>
                        <div className='font-bold'>Transfer To</div>
                        <div className='drop-shadow-lg rounded-lg bg-white w-full flex gap-4'>
                            <Image src={history.recipient.picture} className='rounded-xl' width={50} height={50} alt='user'/>
                            <div className='grid gap-1'>
                                <div className='font-bold'>{history.recipient.fullName}</div>
                                <div className='font-normal text-sm'>{history.recipient.username}</div>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-end items-end gap-4 h-[110px] w-[95%]'>
                        <div className='w-[200px] h-[45px] bg-slate-200 flex justify-center items-center rounded-xl gap-2 text-blue-500 font-bold'>
                            <AiOutlineDownload size={25}/>
                            <div className=''>Download PDF</div>
                        </div>
                        <Link href='/home' className='w-[200px] h-[45px] bg-blue-500 flex justify-center items-center text-white font-bold rounded-xl'>Back to Home</Link>
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

export default Status