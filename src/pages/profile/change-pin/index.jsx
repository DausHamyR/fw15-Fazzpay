import React from 'react'
import Image from 'next/image';
import logout from '../../../../public/log-out.png';
import grid from '../../../../public/grid.svg';
import {AiOutlineUser} from 'react-icons/ai';
import {AiOutlinePlus} from 'react-icons/ai';
import {AiOutlineArrowUp} from 'react-icons/ai';
import Link from 'next/link'
import cookieConfig from '@/helpers/cookieConfig';
import { withIronSessionSsr } from "iron-session/next";
import checkCredentials from '@/helpers/checkCredentials';
import http from '@/helpers/http.helper';
import PinInput from '@/components/PinInput';
import { useDispatch } from 'react-redux';
import Navbar from '@/components/Navbar';
import Dashboard from '@/components/Dashboard';
import Footer from '@/components/Footer';

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

function ChangePin({user, token}) {
    const [pin, setPin] = React.useState('')
    const dispatch = useDispatch()

    const doChangePin = async(event)=> {
        event.preventDefault()
        const {value: username} = event.target.username
    }
    return (
        <div className='bg-[#E5E5E5]'>
            <Navbar token={token}/>
            <div className='flex justify-center gap-8 my-20'>
              <div className='max-sm:hidden'>
                <Dashboard />
              </div>
              <div className='bg-white max-w-[850px] w-[850px] h-[678px] rounded-xl p-12'>
                <div className='flex flex-col gap-6'>
                  <div className='font-bold text-2xl'>Change Pin</div>
                  <div className='max-w-[350px]'>Enter your current 6 digits Fazzpay PIN below to continue to the next steps.</div>
                </div>
                <div className='mt-32 mb-32 flex justify-center'>
                  <div className='max-w-[500px] w-full flex flex-col gap-12'>
                    <div className='flex items-center'>
                      <PinInput />
                    </div>
                    <button className='bg-primary w-full rounded-xl h-[55px] text-white'>
                      <div>Continue</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
        </div>
    )
}

export default ChangePin