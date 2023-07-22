import React from 'react'
import Image from 'next/image';
import logout from '../../../public/log-out.png';
import grid from '../../../public/grid.svg';
import {AiOutlineUser} from 'react-icons/ai';
import {AiOutlinePlus} from 'react-icons/ai';
import {AiOutlineArrowUp} from 'react-icons/ai';
import {BsTelephone} from 'react-icons/bs';
import Link from 'next/link'
import Navbar from '@/components/Navbar';
import cookieConfig from '@/helpers/cookieConfig';
import { withIronSessionSsr } from "iron-session/next";
import checkCredentials from '@/helpers/checkCredentials';
import http from '@/helpers/http.helper';
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

function ManagePhoneNumber({user, token}) {
    return (
        <div className='bg-[#E5E5E5]'>
            <Navbar token={token}/>
            <div className='flex justify-center gap-8 my-20'>
                <Dashboard />
                <div className='bg-white max-w-[850px] w-[850px] h-[678px] rounded-xl p-12'>
                  <div className='flex flex-col gap-6'>
                    <div className='font-bold text-2xl'>Edit Phone Number</div>
                    <div className='max-w-[350px]'>Add at least one phone number for the transfer ID so you can start transfering your money to another user.</div>
                  </div>
                  <div className='mt-32 mb-32 flex justify-center'>
                    <div className='max-w-[500px] flex flex-col gap-12'>
                      <div className='flex items-center'>
                        <div className='flex gap-2 absolute px-4 items-center'>
                          <BsTelephone size={30}/>
                          <div className='font-bold'>+62</div>
                        </div>
                        <input name='fullName' type="text" placeholder='Enter your phone number' className={`input input-bordered w-full pl-24`} />
                      </div>
                      <button className='bg-primary w-full rounded-xl h-[55px] text-white'>
                        <div>Edit Phone Number</div>
                      </button>
                    </div>
                  </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ManagePhoneNumber