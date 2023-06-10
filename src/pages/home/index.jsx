import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import {FiBell} from 'react-icons/fi'
import logout from '../../../public/log-out.png';
import graphic from '../../../public/graphic.png';
import grid from '../../../public/grid.svg';
import {AiOutlineUser} from 'react-icons/ai';
import {AiOutlinePlus} from 'react-icons/ai';
import {AiOutlineArrowUp} from 'react-icons/ai';
import {AiOutlineArrowDown} from 'react-icons/ai';
import Link from 'next/link'
import cookieConfig from '@/helpers/cookieConfig';
import { withIronSessionSsr } from "iron-session/next";
import axios from 'axios';
import checkCredentials from '@/helpers/checkCredentials';
// import Navbar from '@/components/Navbar';

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

function Home({user,history}) {
    const [historyUser, setHistoryUser] = useState([])
    useEffect(()=> {
        async function getTransactions(){
            setHistoryUser(history)
        }
        getTransactions()
    }, [history])
    
    return (
        <div className='bg-[#E5E5E5]'>
            <div className='w-full bg-white h-24 flex justify-around items-center'>
                <div className='text-blue-500 text-2xl font-bold'>FazzPay</div>
                    <div className='flex items-center gap-6'>
                        <Image src={user.picture} width={60} height={60} className='rounded-xl' alt='avatar'/>
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
                            <div className='text-blue-500'>Dashboard</div>
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
                    <div className='bg-[#6379F4] h-[190px] rounded-xl flex justify-between items-center'>
                        <div className='relative left-8 text-slate-300 text-sm grid gap-5 font-semibold'>
                            <div>Balance</div>
                            <div className='text-white text-3xl'>Rp.{user.balance.toLocaleString('id-ID')}</div>
                            <div>{user.phones}</div>
                        </div>
                        <div className='grid gap-4 relative right-8'>
                            <Link href='/transfer' className='w-[162px] h-[57px] bg-slate-300 rounded-xl flex justify-center items-center gap-2'>
                                <AiOutlineArrowUp size={20} className='text-slate-500'/>
                                <div className='font-semibold text-lg text-white tracking-wide'>Transfer</div>
                            </Link>
                            <Link href='/' className='w-[162px] h-[57px] bg-slate-300 rounded-xl flex justify-center items-center gap-2'>
                                <AiOutlinePlus size={20} className='text-slate-500'/>
                                <div className='font-semibold text-lg text-white tracking-wide'>Top Up</div>
                            </Link>
                        </div>
                    </div>
                    <div className='flex justify-around'>
                        <div className='grid content-center gap-16'>
                            <div className='flex justify-around'>
                                <div className='grid gap-2'>
                                    <AiOutlineArrowDown size={25} className='text-green-600'/>
                                    <div>Income</div>
                                    {history.type = 'TOP-UP' && <div>{user.balance} </div>}
                                    <div>{history.type = 'TOP-UP'}</div>
                                </div>
                                <div className='grid gap-2'>
                                    <AiOutlineArrowUp size={25} className='text-red-600'/>
                                    <div>Expense</div>
                                    <div>Rp1.560.000</div>
                                </div>
                            </div>
                            <Image src={graphic} width={300} alt='graphic'/>
                        </div>
                        <div className='w-[367px] h-[468px]'>
                            <div className='flex justify-around relative top-4'>
                                <div className='font-bold'>Transaction History</div>
                                <Link href='/history' className='text-blue-400'>See all</Link>
                            </div>
                            <div className='grid gap-8'>
                                {historyUser.map(historyTransaksi => {
                                    return (
                                <div key={`history-${historyTransaksi.id}`} className='flex'>
                                    <div className='flex relative top-12 left-4 gap-4'>
                                        <Image src={historyTransaksi.picture} width={50} height={50} alt='avatar' />
                                        <div className='grid gap-2'>
                                            <div className='font-bold'>{historyTransaksi.fullName}</div>
                                            <div className='text-sm'>{historyTransaksi.type}</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className='text-green-500 relative top-12 right-[-100px] font-bold'>{historyTransaksi.amount}</div>
                                    </div>
                                </div>
                                    )
                                })}
                                {/* <div className='flex'>
                                    <div className='flex relative top-12 left-4 gap-4'>
                                        <Image src={avatar} alt='avatar' />
                                        <div className='grid gap-2'>
                                            <div className='font-bold'>Samuel Suhi</div>
                                            <div className='text-sm'>Accept</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className='text-red-500 relative top-12 right-[-100px] font-bold'>-Rp149.000</div>
                                    </div>
                                </div>
                                <div className='flex'>
                                    <div className='flex relative top-12 left-4 gap-4'>
                                        <Image src={avatar} alt='avatar' />
                                        <div className='grid gap-2'>
                                            <div className='font-bold'>Samuel Suhi</div>
                                            <div className='text-sm'>Accept</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className='text-green-500 relative top-12 right-[-100px] font-bold'>+Rp150.000</div>
                                    </div>
                                </div>
                                <div className='flex'>
                                    <div className='flex relative top-12 left-4 gap-4'>
                                        <Image src={avatar} alt='avatar' />
                                        <div className='grid gap-2'>
                                            <div className='font-bold'>Samuel Suhi</div>
                                            <div className='text-sm'>Accept</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className='text-red-500 relative top-12 right-[-100px] font-bold'>-Rp249.000</div>
                                    </div>
                                </div> */}
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

export default Home