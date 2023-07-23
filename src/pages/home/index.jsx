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
            <div className='flex justify-center gap-8 my-20'>
                <div className='max-md:hidden'>
                  <Dashboard />
                </div>
                <div className='bg-white max-w-[850px] w-[850px] rounded-xl'>
                  <div className='h-[190px] bg-[#05BFDB] rounded-xl p-6 '>
                    <div className='h-full flex justify-between'>
                      <div className='flex flex-col justify-around text-white h-full'>
                        <div className='text-lg font-semibold'>Balance</div>
                        <div className='text-3xl font-bold'>Rp120.000</div>
                        <div className='text-sm font-semibold'>+62 813-9387-7946</div>
                      </div>
                      <div className='flex flex-col gap-4'>
                        <Link href='/transfer' className='w-[160px] h-[60px] bg-[#FBFFDC] rounded-xl flex items-center justify-center gap-4'>
                          <AiOutlineArrowUp size={25} />
                          <div className='text-xl font-semibold'>Transfer</div>
                        </Link>
                        <Link href='/transferr' className='w-[160px] h-[60px] bg-[#FBFFDC] rounded-xl flex items-center justify-center gap-4'>
                          <AiOutlinePlus size={25} />
                          <div className='text-xl font-semibold'>Top up</div>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className='p-12 flex gap-6 flex-wrap justify-center'>
                    <div className='flex flex-col gap-8'>
                      <div className='flex justify-between'>
                        <div>
                          <AiOutlineArrowDown color='green' size={25}/>
                          <div>Income</div>
                          <div className='font-semibold text-xl'>Rp50.000</div>
                        </div>
                        <div>
                          <AiOutlineArrowUp color='red' size={25}/>
                          <div>Expense</div>
                          <div className='font-semibold text-xl'>Rp50.000</div>
                        </div>
                      </div>
                      <div>
                        <Image src={graphic} alt='graphic'/>
                      </div>
                    </div>
                    <div className='w-1/2 max-lg:w-full'>
                      <div className='flex justify-between items-center'>
                        <div className='font-bold text-2xl'>Transaction History</div>
                        <Link href='/history' className='text-blue-500 font-semibold'>See all</Link>
                      </div>
                      <div className='my-4 flex flex-col gap-4'>
                        <div className='flex justify-between items-center'>
                          <div className='flex items-center'>
                            <Image src={defaultPicture} alt='user' className='w-20 h-20 rounded-xl'/>
                            <div className='flex flex-col gap-2'>
                              <div className='font-semibold'>Amat Amin Daus</div>
                              <div>Accept</div>
                            </div>
                          </div>
                          <div>
                            <div>Rp300.000</div>
                          </div>
                        </div>
                        <div className='flex justify-between items-center'>
                          <div className='flex items-center'>
                            <Image src={defaultPicture} alt='user' className='w-20 h-20 rounded-xl'/>
                            <div className='flex flex-col gap-2'>
                              <div className='font-semibold'>Amat Amin Daus</div>
                              <div>Accept</div>
                            </div>
                          </div>
                          <div>
                            <div>Rp300.000</div>
                          </div>
                        </div>
                        <div className='flex justify-between items-center'>
                          <div className='flex items-center'>
                            <Image src={defaultPicture} alt='user' className='w-20 h-20 rounded-xl'/>
                            <div className='flex flex-col gap-2'>
                              <div className='font-semibold'>Amat Amin Daus</div>
                              <div>Accept</div>
                            </div>
                          </div>
                          <div>
                            <div>Rp300.000</div>
                          </div>
                        </div>
                        <div className='flex justify-between items-center'>
                          <div className='flex items-center'>
                            <Image src={defaultPicture} alt='user' className='w-20 h-20 rounded-xl'/>
                            <div className='flex flex-col gap-2'>
                              <div className='font-semibold'>Amat Amin Daus</div>
                              <div>Accept</div>
                            </div>
                          </div>
                          <div>
                            <div>Rp300.000</div>
                          </div>
                        </div>
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