import React, {useState, useEffect} from 'react'
import Image from 'next/image';
import defaultPicture from '../../../public/daw.jpg';
import Link from 'next/link'
import { withIronSessionSsr } from "iron-session/next";
import checkCredentials from '@/helpers/checkCredentials';
import cookieConfig from '@/helpers/cookieConfig';
import Navbar from '@/components/Navbar';
import http from '@/helpers/http.helper';
import Footer from '@/components/Footer';
import Dashboard from '@/components/Dashboard';

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req, res }) {
        const token = req.session?.token
        checkCredentials(token, res, '/auth/login')
        const {data} = await http(token).get('/profile')
        const {data: dataHistoryTransactions} = await http(token).get('/transactions')
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

function History({user, history}) {
    const [historyUser, setHistoryUser] = useState([])
    
    useEffect(()=> {
        setHistoryUser(history)
    }, [history])

    return (
        <div className='bg-[#E5E5E5]'>
            <Navbar user={user}/>
            <div className='flex justify-center gap-8 my-20'>
                <Dashboard />
                <div className='w-[950px] h-[678px] bg-white relative top-12 rounded-xl'>
                    <div className='flex justify-around items-center h-20'>
                        <div className='font-bold'>Transaction History</div>
                        <div className='w-[155px] h-[40px] bg-slate-200 flex justify-center items-center rounded-xl'>-- Select Filter --</div>
                    </div>
                    <div className='grid gap-8 mt-6'>
                        {historyUser.map(historyUser => {
                            return (
                        <div key={`history-${historyUser.id}`} className='flex justify-around items-start'>
                            <Link href={`/history/status/${historyUser.id}`} className='flex gap-4'>
                                {historyUser.recipient.picture === null ?
                                    <Image src={defaultPicture} className='rounded-xl' width={50} height={50} alt='avatar' /> :
                                    <Image src={historyUser.recipient.picture} className='rounded-xl' width={50} height={50} alt='avatar' /> 
                                }
                                <div className='grid gap-2'>
                                    {historyUser.recipient.fullName === null ?
                                        <div className='font-bold'>{historyUser.recipient.username}</div> :
                                        <div className='font-bold'>{historyUser.recipient.fullName}</div> 
                                    }
                                    <div className='text-sm'>{historyUser.type}</div>
                                </div>
                            </Link>
                            <Link href={`/history/status/${historyUser.id}`}>
                                <div className={`font-bold ${historyUser.type === 'TOP-UP' ? 'text-green-500' : 'text-red-500'}`}>Rp.{historyUser.amount.toLocaleString('id-ID')}</div>
                            </Link>
                        </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default History