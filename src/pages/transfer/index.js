import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image';
import defaultPicture from '../../../public/daw.jpg';
import {AiOutlineSearch} from 'react-icons/ai';
import { withIronSessionSsr } from "iron-session/next";
import checkCredentials from '@/helpers/checkCredentials';
import cookieConfig from '@/helpers/cookieConfig';
import Navbar from '@/components/Navbar';
import http from '@/helpers/http.helper';
import Footer from '@/components/Footer';
import Dashboard from '@/components/Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { setRecipient as setRecipientAction } from '@/redux/reducers/transfer';
import { useRouter } from 'next/router';

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req, res }) {
        const token = req.session?.token
        checkCredentials(token, res, '/auth/login')
        // const {data} = await http(token).get('/profile')
        // const {data: dataUser} = await http(token).get('/users', {params: {limit:4}})
        return {
            props: {
                token,
                // user: data.results,
                // userTransfer: dataUser.results,
            },
        };
    },
    cookieConfig
);

function Transfer({token}) {
    const dispatch = useDispatch()
    // const [historyUser, setHistoryUser] = useState([])
    const [recipient, setRecipient] = useState({})
    const [search, setSearch] = React.useState('')
    const router = useRouter()

    const getUsers = React.useCallback(async(page=1, search='')=>{
        const {data} = await http(token).get('/users', {params: {page, search, limit: 4}})
        setRecipient(data)
        // setHistoryUser(data.results)
    }, [token])
    
    useEffect(()=> {
        // setHistoryUser(userTransfer)
        getUsers()
    }, [ getUsers])

    useEffect(()=> {
        // setHistoryUser(userTransfer)
        getUsers(1, search)
    }, [ search, getUsers])

    const recipientRedux = useSelector(state => state.transfer.user)

    React.useEffect(()=>{
        if(recipientRedux){
            router.push('transfer/transfer-user')
        }
    }, [recipientRedux, router])

    return (
        <div className='bg-[#E5E5E5]'>
            <Navbar token={token}/>
            <div className='flex justify-center gap-8'>
                <Dashboard />
                <div className='w-[65%] max-md:w-full max-lg:w-[60%] max-lg:mx-6 h-[678px] bg-white relative top-12 rounded-xl'>
                    <div className='w-[90%] ml-12 max-lg:pr-6'>
                        <div className='grid relative top-12 gap-4 h-20'>
                            <div className='font-bold'>Search Receiver</div>
                            <input onChange={(e)=> setSearch(e.target.value)} type="text" placeholder="Search receiver here" class="input input-bordered w-full bg-slate-200 pl-16" />
                            <AiOutlineSearch size={30} className='relative top-[-55px] left-4 text-slate-400'/>
                        </div>
                        <div className='grid gap-12 relative top-[100px]'>
                            {recipient.results?.map(historyTransaksi => {
                                return (
                            // <div onClick={()=>dispatch(setRecipientAction(historyUser))} key={`transaksi-${historyUser.id}`} className='cursor-pointer grid grid-col justify-items-start content-between'>
                            //     <div className='flex gap-4 drop-shadow-lg rounded-lg bg-white w-full'>
                            //         {historyUser.picture === null ?
                            //             <Image src={defaultPicture} className='rounded-xl' width={50} height={50} alt='avatar' /> :
                            //             <Image src={historyUser.picture} className='rounded-xl' width={50} height={50} alt='avatar' />
                            //         }
                            //         <div className='grid gap-2'>
                            //             {historyUser.fullName === null ?
                            //                 <div className='font-bold'>{historyUser.email}</div> :
                            //                 <div className='font-bold'>{historyUser.fullName}</div>
                            //             }
                            //             <div className='text-sm'>{historyUser.username}</div>
                            //         </div>
                            //     </div>
                            // </div>
                            <div key={`history-${historyTransaksi.id}`} className='flex justify-between'>
                                    <div onClick={()=>dispatch(setRecipientAction(historyTransaksi))} className='cursor-pointer flex left-4 gap-4'>
                                            <>
                                                <div>
                                                    {!historyTransaksi.picture && <Image src={defaultPicture} className='rounded-xl' width={50} height={50} alt='avatar' />}
                                                    {historyTransaksi.picture && <Image src={historyTransaksi.picture} className='rounded-xl' width={50} height={50} alt='avatar' />}
                                                </div>
                                                <div className='grid gap-2'>
                                                    <div className='font-bold'>{historyTransaksi.fullName}</div>
                                                    <div className='text-sm'>{historyTransaksi.email}</div>
                                                </div>
                                            </>
                                    </div>
                                </div>
                                )
                            })}
                            <div className='flex gap-5 justify-center items-center'>
                                <button disabled={recipient.pageInfo?.page <= 1} onClick={()=>getUsers(recipient.pageInfo?.page -1, search)} className='btn btn-primary text-white'>Prev</button>
                                <div className='font-bold'>{recipient.pageInfo?.page} of {recipient.pageInfo?.totalPage}</div>
                                <button disabled={recipient.pageInfo?.page === recipient.pageInfo?.totalPage} onClick={()=>getUsers(recipient.pageInfo?.page +1, search)} className='btn btn-primary text-white'>Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Transfer