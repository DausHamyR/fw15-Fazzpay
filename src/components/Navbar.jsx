import React from 'react'
import Image from 'next/image';
import {FiBell} from 'react-icons/fi'
import cookieConfig from '@/helpers/cookieConfig';
import { withIronSessionSsr } from "iron-session/next";
import axios from 'axios';

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req }) {
        const token = req.session?.token
        const {data} = await axios.get('https://cute-lime-goldfish-toga.cyclic.app/profile', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return {
            props: {
                token,
                user: data.results
            },
        };
    },
    cookieConfig
);

function Navbar({user}) {
  return (
    <div>
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
    </div>
  )
}

export default Navbar