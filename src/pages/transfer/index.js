import React, {useState, useEffect} from 'react'
import Image from 'next/image';
import {FiBell} from 'react-icons/fi'
import logout from '../../../public/log-out.png';
import grid from '../../../public/grid.svg';
import {AiOutlineUser} from 'react-icons/ai';
import {AiOutlinePlus} from 'react-icons/ai';
import {AiOutlineArrowUp} from 'react-icons/ai';
import {AiOutlineSearch} from 'react-icons/ai';
import Link from 'next/link'
import { withIronSessionSsr } from "iron-session/next";
import axios from 'axios';
import checkCredentials from '@/helpers/checkCredentials';
import cookieConfig from '@/helpers/cookieConfig';

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req, res }) {
        const token = req.session?.token
        checkCredentials(token, res, '/auth/login')
        const {data} = await axios.get('https://cute-lime-goldfish-toga.cyclic.app/profile', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const {data: dataHistoryTransactions} = await axios.get('https://cute-lime-goldfish-toga.cyclic.app/transactions', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return {
            props: {
                token,
                user: data.results,
                history: dataHistoryTransactions.results
            },
        };
    },
    cookieConfig
);

function Transfer({user, history}) {
    const [historyUser, setHistoryUser] = useState([])
    
    useEffect(()=> {
        setHistoryUser(history)
    }, [history])

    return (
        <div className='bg-[#E5E5E5]'>
            <div className='w-full bg-white h-24 flex justify-around items-center'>
                <div className='text-blue-500 text-2xl font-bold'>FazzPay</div>
                <div className='flex items-center gap-6'>
                    <Image className='rounded-xl' src={user.picture} width={50} height={50} alt='avatar'/>
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
                <div className='w-[950px] h-[678px] bg-white relative top-12 rounded-xl'>
                    <div className='w-[850px]'>
                        <div className='grid relative top-12 left-12 gap-4 h-20'>
                            <div className='font-bold'>Search Receiver</div>
                            <input type="text" placeholder="Search receiver here" class="input input-bordered w-full bg-slate-200 pl-16" />
                            <AiOutlineSearch size={30} className='relative top-[-55px] left-4 text-slate-400'/>
                        </div>
                        <div className='grid gap-12 relative top-[100px] left-12'>
                            {historyUser.map(historyUser => {
                                return (
                            <Link href={`/transfer/transfer-user/${historyUser.id}`} key={`transaksi-${historyUser.id}`} className='grid grid-col justify-items-start content-between'>
                                <div className='flex gap-4 drop-shadow-lg rounded-lg bg-white w-full'>
                                    <Image src={historyUser.recipient.picture} className='rounded-xl' width={50} height={50} alt='avatar' />
                                    <div className='grid gap-2'>
                                        <div className='font-bold'>{historyUser.recipient.fullName}</div>
                                        <div className='text-sm'>{historyUser.recipient.username}</div>
                                    </div>
                                </div>
                            </Link>
                                )
                            })}
                            {/* <div className='flex justify-start items-center'>
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
                            </div> */}
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