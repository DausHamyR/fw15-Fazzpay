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
import Footer from '@/components/Footer';

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
            <div className='flex justify-center gap-8 my-20'>
                <div className='max-sm:hidden'>
                  <Dashboard />
                </div>
                <div className='bg-white max-w-[850px] w-[850px] h-[678px] rounded-xl p-12'>
                  <div className='flex flex-col gap-6 items-center'>
                    <div className='flex flex-col items-center gap-2'>
                      <Image src={defaultPicture} alt='picture' className='w-24 h-24 rounded-full' />
                      <div className='flex items-center gap-2'>
                        <AiOutlineEdit />
                        <div className='max-w-[350px]'>Edit</div>
                      </div>
                    </div>
                    <div className='text-center'>
                      <div className='font-bold text-xl'>Amat Amin Daus</div>
                      <div>+62 813-9387-7946</div>
                    </div>
                  </div>
                  <div className='mt-12 mb-12 flex flex-col gap-6 items-center'>
                    <Link href='/profile/personal-information' className='max-w-[430px] w-full h-[60px] bg-[#E5E8ED] rounded-xl flex items-center justify-between px-6'>
                      <div className='font-semibold'>Personal Information</div>
                      <AiOutlineArrowRight size={25} />
                    </Link>
                    <Link href='/profile/change-password' className='max-w-[430px] w-full h-[60px] bg-[#E5E8ED] rounded-xl flex items-center justify-between px-6'>
                      <div className='font-semibold'>Change Password</div>
                      <AiOutlineArrowRight size={25} />
                    </Link>
                    <Link href='/profile/change-pin' className='max-w-[430px] w-full h-[60px] bg-[#E5E8ED] rounded-xl flex items-center justify-between px-6'>
                      <div className='font-semibold'>Change Pin</div>
                      <AiOutlineArrowRight size={25} />
                    </Link>
                    <Link href='/auth/logout' className='max-w-[430px] w-full h-[60px] bg-[#E5E8ED] rounded-xl flex items-center justify-between px-6'>
                      <div className='font-semibold'>Logout</div>
                    </Link>
                  </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Profile