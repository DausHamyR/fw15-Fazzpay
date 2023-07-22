import React from 'react'
import Image from 'next/image';
import phone from '../../public/png-phone.png';
import phone1 from '../../public/Group10.png';
import partners from '../../public/Group 16.png';
import partners2 from '../../public/Group 17.png';
import partners3 from '../../public/Group 18.png';
import partners4 from '../../public/Group 21.png';
import partners5 from '../../public/Group 22.png';
import partners6 from '../../public/Group 23.png';
import phone2 from '../../public/png-phone2.png';
import avatar from '../../public/Rectangle 25.png';
import Link from 'next/link'

function LandingPage() {
    return (
        <div>
          <div className='px-16 bg-[#FBFFDC] max-sm:px-12 pb-12'>
            <div className='flex justify-between items-center pt-8'>
              <div className='text-2xl font-semibold text-[#A4907C]'>Pay<span className='text-[#0A4D68]'>Easy</span></div>
              <div className='flex items-center gap-6'>
                  <Link href='/auth/login' className='btn btn-primary text-white border-white'>Login</Link>
                  <Link href='/auth/register' className='btn'>Sign Up</Link>
              </div>
            </div>
            <div className='flex justify-around items-center'>
              <div className='flex flex-col gap-12 max-w-[400px] max-md:max-w-full'>
                <div className='text-5xl font-bold leading-normal'>Awesome App For Saving <span className='text-blue-500'>Time.</span></div>
                <div className='font-semibold'>We bring you a mobile app for banking problems that oftenly wasting much of your times.</div>
                <Link href='/auth/register' className='btn btn-primary text-white'>Try It Free</Link>
              </div>
              <div className='max-md:hidden'>
                <Image src={phone} alt='phone' className=''/>
              </div>
            </div>
          </div>
          <div className='w-full bg-red-200 px-16 py-12 max-sm:px-8'>
            <div className='flex flex-col items-center gap-10'>
              <div className='text-5xl font-bold tracking-wider max-md:text-3xl text-center'><span className='text-blue-500'>About</span> the Application.</div>
              <div className='font-semibold max-w-[520px] text-center'>We have some great features from the application and it’s totally free to use by all users around the world.</div>
            </div>
            <div className='mt-12 flex justify-around flex-wrap gap-4'>
              <div className='bg-white max-w-[367px] h-[344px] rounded-xl '>
                <div className='py-4 px-4 flex flex-col items-center gap-6'>
                  <Image src={phone1} alt="phone" />
                  <div className='font-bold text-xl'>24/7 Support</div>
                  <div className='text-center font-semibold'>We have 24/7 contact support so you can contact us whenever you want and we will respond it.</div>
                </div>
              </div>
              <div className='bg-white max-w-[367px] h-[344px] rounded-xl '>
                <div className='py-4 px-4 flex flex-col items-center gap-6'>
                  <Image src={phone1} alt="phone" />
                  <div className='font-bold text-xl'>24/7 Support</div>
                  <div className='text-center font-semibold'>We have 24/7 contact support so you can contact us whenever you want and we will respond it.</div>
                </div>
              </div>
              <div className='bg-white max-w-[367px] h-[344px] rounded-xl '>
                <div className='py-4 px-4 flex flex-col items-center gap-6'>
                  <Image src={phone1} alt="phone" />
                  <div className='font-bold text-xl'>24/7 Support</div>
                  <div className='text-center font-semibold'>We have 24/7 contact support so you can contact us whenever you want and we will respond it.</div>
                </div>
              </div>
            </div>
          </div>
          <div className='bg-[#FBFFDC] py-16 flex justify-around items-center gap-12 max-sm:flex-wrap'>
            <div className='max-w-[350px] flex flex-col gap-6'>
              <div className='text-5xl font-bold leading-normal'>100+ <span className='text-blue-500'>Trusted</span> Partners.</div>
              <div className='font-semibold'>We have reached global level and have 100+ brand partners around the globe.</div>
            </div>
            <div className='flex flex-wrap max-w-[580px] justify-center gap-6 max-lg:max-w-full max-lg:gap-2'>
              <Image src={partners} alt='partner' />
              <Image src={partners2} alt='partner' />
              <Image src={partners3} alt='partner' />
              <Image src={partners4} alt='partner' />
              <Image src={partners5} alt='partner' />
              <Image src={partners6} alt='partner' />
            </div>
          </div>
          <div className='w-full bg-red-200 px-16 max-lg:px-4 py-12 max-sm:px-8 flex justify-around items-center max-md:flex-wrap-reverse'>
            <Image src={phone2} alt='phone' className='max-w-[450px]'/>
            <div className='flex flex-col gap-6'>
              <div className='text-5xl font-bold leading-normal tracking-wide max-w-[500px] max-lg:text-4xl'>All The <span className='text-blue-500'>Great</span> PayEasy Features.</div>
              <div className='flex flex-col gap-6'>
                <div className='bg-white rounded-xl w-full px-4 py-2 flex flex-col gap-6'>
                  <div className='font-bold tracking-wider'><span className='text-blue-500'>1.</span> Small Fee</div>
                  <div>We only charge 5% of every success transaction done in FazzPay app.</div>
                </div>
                <div className='bg-white rounded-xl w-full px-4 py-2 flex flex-col gap-6'>
                  <div className='font-bold tracking-wider'><span className='text-blue-500'>2.</span> Data Secured</div>
                  <div>All your data is secured properly in our system and it’s encrypted.</div>
                </div>
                <div className='bg-white rounded-xl w-full px-4 py-2 flex flex-col gap-6'>
                  <div className='font-bold tracking-wider'><span className='text-blue-500'>3.</span> User Friendly</div>
                  <div>FazzPay come up with modern and sleek design and not complicated.</div>
                </div>
              </div>
            </div>
          </div>
          <div className='p-16 bg-[#FBFFDC] w-full'>
            <div className='flex flex-col items-center gap-8'>
              <div className='text-5xl font-bold tracking-wide'>What Users are <span className='text-blue-500'>Saying.</span></div>
              <div className='text-center max-w-[490px]'>We have some great features from the application and it’s totally free to use by all users around the world.</div>
            </div>
            <div className='flex justify-around my-12 flex-wrap gap-6'>
              <div className='max-w-[367px] bg-slate-200 rounded-xl py-8 px-4 flex flex-col gap-8 items-center'>
                <Image src={avatar} alt='user' />
                <div className='font-bold text-xl'>Sherina Chaw</div>
                <div className='font-semibold text-center'>“I use this app since 2 years ago and this is the best app that I’ve ever use in my entire life”</div>
              </div>
              <div className='max-w-[367px] bg-slate-200 rounded-xl py-8 px-4 flex flex-col gap-8 items-center'>
                <Image src={avatar} alt='user' />
                <div className='font-bold text-xl'>Sherina Chaw</div>
                <div className='font-semibold text-center'>“I use this app since 2 years ago and this is the best app that I’ve ever use in my entire life”</div>
              </div>
              <div className='max-w-[367px] bg-slate-200 rounded-xl py-8 px-4 flex flex-col gap-8 items-center'>
                <Image src={avatar} alt='user' />
                <div className='font-bold text-xl'>Sherina Chaw</div>
                <div className='font-semibold text-center'>“I use this app since 2 years ago and this is the best app that I’ve ever use in my entire life”</div>
              </div>
            </div>
          </div>
          <div className='w-full bg-[#FAF3F0] p-20 flex flex-col gap-12'>
            <div className='text-4xl font-semibold text-[#A4907C]'>Pay<span className='text-[#0A4D68]'>Easy</span></div>
            <div className='max-w-[270px] font-semibold leading-loose'>Simplify financial needs and saving much time in banking needs with one single app.</div>
            <div className='font-semibold flex justify-between flex-wrap gap-16'>
              <div>2023 PayEasy. All right reserved.</div>
              <div className='flex gap-12 max-sm:flex-col max-sm:gap-4'>
                <div>+62 5637 8882 9901</div>  
                <div>contact@PayEasy.com</div>
              </div>
            </div>
          </div>
        </div>
    )
}

export default LandingPage