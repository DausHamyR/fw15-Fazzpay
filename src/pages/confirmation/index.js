import React from 'react'
import Image from 'next/image';
import logout from '../../../public/log-out.png';
import avatar from '../../../public/Rectangle 25.png';
import defaultPicture from '../../../public/daw.jpg';
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
import Dashboard from '@/components/Dashboard';
import Footer from '@/components/Footer';
import moment from 'moment';
import PinInput from '@/components/PinInput';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { clearTransferState } from '@/redux/reducers/transfer';

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req, res }) {
        const token = req.session?.token
        checkCredentials(token, res, '/auth/login')
        // const {data} = await http(token).get('/profile')
        return {
            props: {
                token,
                // user: data.results,
            },
        };
    },
    cookieConfig
);

function Confirmation({token}) {
    const router = useRouter()
    const dispatch = useDispatch()
    const recipient = useSelector(state => state.transfer.user)
    const profile = useSelector(state => state.profile.data)
    const amount = useSelector(state => state.transfer.amount)
    const notes = useSelector(state => state.transfer.notes)
    const [pin, setPin] = React.useState('')

    const processTransfer = async(token)=>{
        const form = new URLSearchParams({
            recipientId: recipient.id,
            notes,
            amount,
            pin
        }).toString()
        const {data} = await http(token).post('/transactions/transfer', form)
        dispatch(clearTransferState())
        router.replace('/history/status/'+data.results.id)
    }

    return (
        <div className='bg-[#E5E5E5]'>
            <Navbar token={token}/>
            <div className='flex justify-center gap-8'>
                <Dashboard />
                <div className='w-[950px] h-[678px] bg-white relative top-12 rounded-xl'>
                    <div className='w-[850px]'>
                        <div className='grid relative top-12 left-12 gap-4 h-20'>
                            <div className='font-bold'>Transfer To</div>
                            <div className='drop-shadow-lg rounded-lg bg-white w-full flex gap-4'>
                                {!recipient.picture ?
                                <Image src={defaultPicture} alt='user'/> :
                                <Image src={recipient.picture} width={50} height={50} alt='user'/>
                                }
                                <div className='grid gap-1'>
                                    <div className='font-bold'>{recipient.fullName}</div>
                                    <div className='font-normal text-sm'>{recipient.email}</div>
                                </div>
                            </div>
                        </div>
                        <div className='relative top-28 left-12 grid gap-8'>
                            <div className='font-bold'>Details</div>
                            <div className='grid gap-8'>
                                <div className='drop-shadow-lg rounded-lg bg-white w-full grid gap-2 pl-6'>
                                    <div className='font-light'>Amount</div>
                                    <div className='font-bold'>Rp{Number(amount).toLocaleString('id-ID')}</div>
                                </div>
                                <div className='drop-shadow-lg rounded-lg bg-white w-full grid gap-2 pl-6'>
                                    <div className='font-light'>Balance Left</div>
                                    <div className='font-bold'>Rp{Number(profile.balance - amount).toLocaleString('id-ID')}</div>
                                </div>
                                <div className='drop-shadow-lg rounded-lg bg-white w-full grid gap-2 pl-6'>
                                    <div className='font-light'>Date & Time</div>
                                    <div className='font-bold'>{moment(new Date()).format('MMMM DD, YYYY - HH.mm')}</div>
                                </div>
                                <div className='drop-shadow-lg rounded-lg bg-white w-full grid gap-2 pl-6'>
                                    <div className='font-light'>Notes</div>
                                    <div className='font-bold'>{notes || '-'}</div>
                                </div>
                                <label htmlFor='pin-input' className='btn btn-primary text-white'>Continue</label>
                            </div>
                            <input type="checkbox" id="pin-input" className="modal-toggle" />
                            <div className="modal">
                            <div className="modal-box flex flex-col gap-4">
                                <h3 className="font-bold text-lg">Enter PIN to Transfer</h3>
                                <p className="py-4">Enter your 6 digits PIN for confirmation to continue transferring money. </p>
                                <div>
                                    <PinInput onChangePin={setPin}/>
                                </div>
                                <div className="modal-action">
                                    <button onClick={processTransfer} disabled={!(pin.length >= 6)} className="btn btn-primary">Continue</button>
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

export default Confirmation