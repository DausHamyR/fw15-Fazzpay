import React from 'react'
import Image from 'next/image';
import defaultPicture from '../../../public/daw.jpg';
import {AiOutlineEdit, AiOutlineArrowRight} from 'react-icons/ai';
import Link from 'next/link'
import cookieConfig from '@/helpers/cookieConfig';
import { withIronSessionSsr } from "iron-session/next";
import checkCredentials from '@/helpers/checkCredentials';
import Navbar from '@/components/Navbar';
import http from '@/helpers/http.helper';
import Dashboard from '@/components/Dashboard';

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

function Profile({user, token}) {
  const [selectedImage, setSelectedImage] = React.useState(null);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Handle the image upload or processing here
    // You can send the image to the server using AJAX or fetch

    // Example: create a FormData object and append the image file
    const formData = new FormData();
    formData.append('image', selectedImage);

    // Make an AJAX request using fetch or any other library
    fetch('/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        // Handle the response
        console.log('Image uploaded successfully');
      })
      .catch((error) => {
        // Handle errors
        console.error('Error uploading image:', error);
      });
  };

    return (
        <div className='bg-[#E5E5E5]'>
            <Navbar token={token}/>
            <div className='flex justify-center gap-8'>
                <Dashboard />
                <div className='w-[950px] h-[678px] bg-white relative top-12 rounded-xl grid justify-items-center gap-16'>
                    <div className='grid justify-items-center content-start gap-2 relative top-24'>
                        {user.picture === null ? 
                            <Image src={defaultPicture} width={60} height={60} className='rounded-xl' alt='avatar'/> :
                            <Image src={user.picture} width={60} height={60} className='rounded-xl' alt='avatar'/>
                        }
                        <form onSubmit={handleSubmit}>
                        <label className='flex gap-2 items-center cursor-pointer'>
                            <AiOutlineEdit />
                            <div className='text-xs'>Edit</div>
                            <input type='file' onChange={handleImageChange} className='hidden' />
                        </label>
                        </form>
                        <div className='font-bold text-xl'>{user.fullName}</div>
                        <div className='font-normal text-sm text-slate-400'>{user.phones}</div>
                    </div>
                    <div className='grid font-semibold'>
                        <Link href='/profile/personal-information' className='flex justify-around items-center w-[433px] h-[64px] bg-slate-200 rounded-lg'>
                            <div>Personal Information</div>
                            <AiOutlineArrowRight size={20}/>
                        </Link>
                        <Link href='/profile/change-password' className='flex justify-around items-center w-[433px] h-[64px] bg-slate-200 rounded-lg'>
                            <div>Change Password</div>
                            <AiOutlineArrowRight size={20}/>
                        </Link>
                        <Link href='/profile/change-pin' className='flex justify-around items-center w-[433px] h-[64px] bg-slate-200 rounded-lg'>
                            <div>Change Pin</div>
                            <AiOutlineArrowRight size={20}/>
                        </Link>
                        <Link href='/auth/logout' className='flex justify-around items-center w-[433px] h-[64px] bg-slate-200 rounded-lg'>
                            <div>Logout</div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='flex justify-around items-center relative top-20 bg-[#6379F4] h-[68px] text-white'>
                <div>2020 FazzPay. All right reserved.</div>
                <div className='flex gap-8'>
                    <div>+62 5637 8882 9901</div>
                    <div>contact@fazzpay.com</div>
                </div>
            </div>
        </div>
    )
}

export default Profile