import React from 'react'
import Image from 'next/image';
import defaultPicture from '../../public/daw.jpg';
import {FiBell} from 'react-icons/fi'
import cookieConfig from '@/helpers/cookieConfig';
import { withIronSessionSsr } from "iron-session/next";
import checkCredentials from '@/helpers/checkCredentials';
import http from '@/helpers/http.helper';

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req, res }) {
        const token = req.session?.token
        checkCredentials(token, res, '/auth/login')
        const {data} = await http(token).get('/profile')
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
                    {user.picture === null ? 
                        <Image src={defaultPicture} width={60} height={60} className='rounded-xl' alt='avatar'/> :
                        <Image src={user.picture} width={60} height={60} className='rounded-xl' alt='avatar'/>
                    }
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