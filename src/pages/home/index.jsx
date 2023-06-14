import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import graphic from '../../../public/graphic.png';
import defaultPicture from '../../../public/daw.jpg';
import {AiOutlinePlus} from 'react-icons/ai';
import {AiOutlineArrowUp} from 'react-icons/ai';
import {AiOutlineArrowDown} from 'react-icons/ai';
import Link from 'next/link'
import cookieConfig from '@/helpers/cookieConfig';
import { withIronSessionSsr } from "iron-session/next";
import checkCredentials from '@/helpers/checkCredentials';
import http from '@/helpers/http.helper';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Dashboard from '@/components/Dashboard';
import { useSelector } from 'react-redux';
import profile from '@/redux/reducers/profile';

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req, res }) {
        const token = req.session?.token
        checkCredentials(token, res, '/auth/login')
        // const {data} = await http(token).get('/profile')
        const {data: historyTransactions} = await http(token).get('/transactions', {params: {limit:4}})
        return {
            props: {
                token,
                // user: data.results,
                history: historyTransactions.results
            },
        };
    },
    cookieConfig
);

function Home({history, token}) {
    const user = useSelector(state => state.profile.data)
    const [historyUser, setHistoryUser] = useState([])

    const getTransaction = React.useCallback(async()=>{
        const {data} = await http(token).get('/transactions', {params: {limit:4}})
        setHistoryUser(data.results)
    },[token])

    useEffect(()=> {
        getTransaction()
    }, [getTransaction])

    const calculateTotalTopUp = () => {
        let totalTopUp = 0;
        let totalExpense = 0;
        historyUser.forEach((item) => {
            if (item.type === 'TOP-UP' || item.type === 'accept') {
                totalTopUp += item.amount;
            }else if (item.type === 'transfer') {
                totalExpense += item.amount;
            }
        });
        return {totalTopUp, totalExpense};
    };
    const { totalExpense, totalTopUp } = calculateTotalTopUp()
    
    return (
        <div className='bg-[#E5E5E5]'>
            <Navbar token={token}/>
            <div className='flex justify-center gap-8'>
                <Dashboard />
                <div className='w-[950px] h-[678px] bg-white relative top-12 rounded-xl'>
                    <div className='bg-[#05BFDB] h-[190px] rounded-xl flex justify-between items-center'>
                        <div className='relative left-8 text-slate-300 text-sm grid gap-5 font-semibold'>
                            <div>Balance</div>
                            <div className='text-white text-3xl'>{user?.balance ? `Rp${Number(user?.balance).toLocaleString('id')}`: 'Rp.0'}</div>
                            <div>{user?.email}</div>
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
                        <div className='grid content-center gap-16 max-lg:hidden'>
                            <div className='flex justify-around'>
                                <div className='grid gap-2'>
                                    <AiOutlineArrowDown size={25} className='text-green-600'/>
                                    <div>Income</div>
                                    <div>Rp.{totalTopUp.toLocaleString('id-ID')}</div>
                                </div>
                                <div className='grid gap-2'>
                                    <AiOutlineArrowUp size={25} className='text-red-600'/>
                                    <div>Expense</div>
                                    <div>Rp.{totalExpense.toLocaleString('id-ID')}</div>
                                </div>
                            </div>
                            <Image src={graphic} width={300} alt='graphic'/>
                        </div>
                        <div className='w-[65%] max-lg:w-full h-[480px] px-12'>
                            <div className='flex justify-between relative top-4'>
                                <div className='font-bold'>Transaction History</div>
                                <Link href='/history' className='text-blue-400'>See all</Link>
                            </div>
                            <div className='grid gap-10 mt-16'>
                                {historyUser.map(historyTransaksi => {
                                    return (
                                <div key={`history-${historyTransaksi.id}`} className='flex justify-between'>
                                    <div className='flex left-4 gap-4'>
                                        {historyTransaksi.type === "TOP-UP" && (
                                            <>
                                                <div>
                                                    {!historyTransaksi.recipient.picture && <Image src={defaultPicture} className='rounded-xl' width={50} height={50} alt='avatar' />}
                                                    {historyTransaksi.recipient.picture && <Image src={historyTransaksi.recipient.picture} className='rounded-xl' width={50} height={50} alt='avatar' />}
                                                </div>
                                                <div className='grid gap-2'>
                                                    <div className='font-bold'>{historyTransaksi.recipient.fullName || historyTransaksi.recipient.email}</div>
                                                    <div className='text-sm'>Topup</div>
                                                </div>
                                            </>
                                        )}
                                        {historyTransaksi.type === "TRANSFER" && (
                                            <>
                                                {historyTransaksi.recipient.id !== user.id &&
                                                <>
                                                <div>
                                                    {!historyTransaksi.recipient.picture && <Image src={defaultPicture} className='rounded-xl' width={50} height={50} alt='avatar' />}
                                                    {historyTransaksi.recipient.picture && <Image src={historyTransaksi.recipient.picture} className='rounded-xl' width={50} height={50} alt='avatar' />}
                                                </div>
                                                <div className='grid gap-2'>
                                                    <div className='font-bold'>{historyTransaksi.recipient.fullName || historyTransaksi.recipient.email}</div>
                                                    <div className='text-sm'>Outcome</div>
                                                </div>
                                                </>}
                                                {historyTransaksi.recipient.id === user.id &&
                                                <>
                                                <div>
                                                    {!historyTransaksi.sender.picture && <Image src={defaultPicture} className='rounded-xl' width={50} height={50} alt='avatar' />}
                                                    {historyTransaksi.sender.picture && <Image src={historyTransaksi.sender.picture} className='rounded-xl' width={50} height={50} alt='avatar' />}
                                                </div>
                                                <div className='grid gap-2'>
                                                    <div className='font-bold'>{historyTransaksi.sender.fullName || historyTransaksi.sender.email}</div>
                                                    <div className='text-sm'>Income</div>
                                                </div>
                                                </>}
                                            </>
                                        )}
                                    </div>
                                    {historyTransaksi.type === "TOP-UP" &&
                                        <div className='text-green-600'>+ Rp{Number(historyTransaksi.amount).toLocaleString('id')}</div>
                                    }
                                    {historyTransaksi.type === "TRANSFER" && (historyTransaksi.recipient.id === user.id ?
                                        (<div className='text-green-600'>+ Rp{Number(historyTransaksi.amount).toLocaleString('id')}</div>) : 
                                        (<div className='text-red-600'>- Rp{Number(historyTransaksi.amount).toLocaleString('id')}</div>) 
                                    )}
                                    {/* {historyTransaksi.type === "TOP-UP" &&
                                        <div className='text-green-600'>+ Rp{Number(historyTransaksi.amount).toLocaleString('id')}</div>
                                    } */}
                                </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home