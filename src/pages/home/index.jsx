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
import { useDispatch, useSelector } from 'react-redux';
import { setProfile } from '@/redux/reducers/profile';
import TopUp from '@/components/TopUp';

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req, res }) {
        const token = req.session?.token
        checkCredentials(token, res, '/auth/login')
        // const {data} = await http(token).get('/profile')
        const {data: historyTransactions} = await http(token).get('/transactions', {params: {limit:5}})
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

function Home({token, history}) {
    // const user = useSelector(state => state.profile.data)
    // const [historyUser, setHistoryUser] = useState([])
    const [user, setUser] = useState([])
    const dispatch = useDispatch()
    

    // const getTransaction = React.useCallback(async()=>{
    //     const {data} = await http(token).get('/transactions', {params: {limit:4}})
    //     setHistoryUser(data.results)
    // },[token])
    const getProfile = React.useCallback(async()=>{
      const {data} = await http(token).get('/profile')
        setUser(data.results)
        dispatch(setProfile(user))
    },[token, dispatch, user])

    useEffect(()=> {
      getProfile()
    }, [getProfile])

    // const calculateTotalTopUp = () => {
    //     let totalTopUp = 0;
    //     let totalExpense = 0;
    //     historyUser.forEach((item) => {
    //         if (item.type === 'TOP-UP' || item.type === 'accept') {
    //             totalTopUp += item.amount;
    //         }else if (item.type === 'transfer') {
    //             totalExpense += item.amount;
    //         }
    //     });
    //     return {totalTopUp, totalExpense};
    // };
    // const { totalExpense, totalTopUp } = calculateTotalTopUp()

    return (
        <div className='bg-[#E5E5E5]'>
            <Navbar token={token}/>
            <div className='flex justify-center gap-8 my-20'>
                <div className='max-md:hidden'>
                  <Dashboard token={token}/>
                </div>
                <div className='bg-white max-w-[850px] w-[850px] rounded-xl'>
                  <div className='h-[190px] bg-[#05BFDB] rounded-xl p-6 '>
                    <div className='h-full flex justify-between'>
                      <div className='flex flex-col justify-around text-white h-full'>
                        <div className='text-lg font-semibold'>Balance</div>
                        <div className='text-3xl font-bold'>{user?.balance ? `Rp ${Number(user?.balance).toLocaleString('id')}`: 'Rp.0'}</div>
                        <div className='text-sm font-semibold'>{user.phones}</div>
                      </div>
                      <div className='flex flex-col gap-4'>
                        <Link href='/transfer' className='w-[160px] h-[60px] bg-[#FBFFDC] rounded-xl flex items-center justify-center gap-4'>
                          <AiOutlineArrowUp size={25} />
                          <div className='text-xl font-semibold'>Transfer</div>
                        </Link>
                        <div className='w-[160px] h-[60px] bg-[#FBFFDC] rounded-xl flex items-center justify-center gap-4'>
                          <AiOutlinePlus size={25} />
                          <TopUp token={token} style={'text-xl font-semibold'} />
                        </div>
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
                        {history.map(history => 
                        <div key={history.id} className='flex justify-between items-center'>
                          <div className='flex items-center gap-2'>
                            <Image src={history.recipient.picture === null ? defaultPicture : history.recipient.picture} alt='user' width={50} height={50} className='rounded-full'/>
                            <div className='flex flex-col gap-2'>
                              <div className='font-semibold'>{history.recipient.email}</div>
                              <div className={history.type === "TOP-UP" ? 'text-green-500' : 'text-red-500'}>{history.type}</div>
                            </div>
                          </div>
                          <div className='font-semibold'>
                            <div className={history.type === "TOP-UP" ? 'text-green-500' : 'text-red-500'}>Rp{Number(history.amount).toLocaleString('id')}</div>
                          </div>
                        </div>
                          )}
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