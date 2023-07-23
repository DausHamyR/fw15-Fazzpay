import React from 'react'
import Image from 'next/image';
import {FiBell} from 'react-icons/fi'
import logout from '../../../../public/log-out.png';
import grid from '../../../../public/grid.svg';
import {AiOutlineUser} from 'react-icons/ai';
import {AiOutlinePlus} from 'react-icons/ai';
import {AiOutlineArrowUp} from 'react-icons/ai';
import Link from 'next/link'
import { withIronSessionSsr } from "iron-session/next";
import cookieConfig from '@/helpers/cookieConfig';
import checkCredentials from '@/helpers/checkCredentials';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import http from '@/helpers/http.helper';
import Dashboard from '@/components/Dashboard';
import Footer from '@/components/Footer';

// export const getServerSideProps = withIronSessionSsr(
//     async function getServerSideProps({ req, res }) {
//         const token = req.session?.token
//         checkCredentials(token, res, '/auth/login')

//       const {data} = await axios.get('https://outstanding-train-fawn.cyclic.app', {
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//       })
  
//       return {
//         props: {
//           token,
//           user: data.results
//         },
//       };
//     },
//     cookieConfig
//   );

function PersonalInformation({user, token}) {
    // const editProfile = async (values) => {
    //     setOpenModal(true)
    //     const form = new FormData()
    //     Object.keys(values).forEach((key)=> {
    //         if(values[key]) {
    //             if(key === 'birthDate') {
    //                 form.append(key, moment(values[key], 'DD-MM-YYYY').format('YYYY/MM/DD'))
    //             }else {
    //                 form.append(key, values[key])
    //             }
    //         }
    //     })
    //     if(selectedPicture) {
    //         form.append('picture', selectedPicture)
    //     }
    //     const {data} = await http(token).patch('/profile', form, {
    //         headers: {
    //             'Content-Type': 'multipart/form-data'
    //         }
    //     })
    //     setProfile(data.results)
    //     setEditBirthday(false)
    //     setEditUsername(false)
    //     setEditEmail(false)
    //     setEditPhoneNumber(false)
    //     setOpenModal(false)
    // }

    return (
        <div className='bg-[#E5E5E5]'>
            <Navbar token={token}/>
            <div className='flex justify-center gap-8 my-20'>
                <div className='max-sm:hidden'>
                  <Dashboard />
                </div>
                <div className='bg-white max-w-[850px] w-[850px] h-[678px] rounded-xl p-12'>
                  <div className='flex flex-col gap-6'>
                    <div className='font-bold text-2xl'>Personal Information</div>
                    <div className='max-w-[350px]'>We got your personal information from the sign up proccess. If you want to make changes on your information, contact our support.</div>
                  </div>
                  <div className='mt-12 mb-12 w-full flex flex-col gap-6'>
                    <div className='flex flex-col gap-1'>
                      <div>First Name</div>
                      <input name='fullName' type="text" placeholder='First Name' className={`input input-bordered w-full`} />
                    </div>
                    <div className='flex flex-col gap-1'>
                      <div>Last Name</div>
                      <input name='fullName' type="text" placeholder='Last Name' className={`input input-bordered w-full`} />
                    </div>
                    <div className='flex flex-col gap-1'>
                      <div>Verified E-mail</div>
                      <input name='fullName' type="text" placeholder='Verified E-mail' className={`input input-bordered w-full`} />
                    </div>
                    <div className='flex flex-col gap-1'>
                      <div>Phone Number</div>
                      <div className='flex items-center relative'>
                        <input name='fullName' type="text" placeholder='Phone Number' className={`input input-bordered w-full`} />
                        <button className='absolute right-6 text-blue-600 font-semibold'>Manage</button>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default PersonalInformation