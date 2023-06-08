import React from 'react'
import Image from 'next/image';
import mask from '../../public/Mask Group.png';
import phone from '../../public/png-phone.png';
import phone1 from '../../public/Group 10.png';
import lock from '../../public/Group 11.png';
import download from '../../public/Group 12.png';
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
            <div className='w-full bg-white h-24 flex justify-around items-center'>
                <div className='text-blue-500 text-2xl font-bold'>FazzPay</div>
                <div className='flex items-center gap-6 z-10'>
                    <Link href='/login' className='btn btn-primary text-white border-white'>Login</Link>
                    <Link href='/register' className='btn'>Sign Up</Link>
                </div>
            </div>
            <div className='flex justify-around'>
                <div className='relative top-[100px] w-[400px] grid content-start gap-12'>
                    <div className='text-5xl font-bold leading-normal'>Awesome App For Saving <span className='text-blue-500'>Time.</span></div>
                    <div className=''>We bring you a mobile app for banking problems that oftenly wasting much of your times.</div>
                    <button className='btn btn-primary text-white'>Try It Free</button>
                </div>
                <div>
                    <Image src={phone} alt='phone' className='relative z-10'/>
                </div>
            </div>
            <div className='grid relative top-[-950px]'>
                <Image src={mask} alt='mask' className='place-self-end'/>
            </div>
            <div className='w-full h-screen bg-slate-200 relative top-[-600px]'>
                <div className='grid justify-items-center relative top-16 gap-8'>
                    <div className='text-5xl font-bold tracking-wider'><span className='text-blue-500'>About</span> the Application.</div>
                    <div className='w-[530px] text-center'>We have some great features from the application and it’s totally free to use by all users around the world.</div>
                </div>
                <div className='relative top-[200px] flex justify-center gap-8'>
                    <div className='w-[367px] h-[344px] bg-white rounded-lg grid content-center justify-items-center gap-4'>
                        <Image src={phone1} alt='phone' />
                        <div>24/7 Support</div>
                        <div className='text-center w-[290px]'>We have 24/7 contact support so you can contact us whenever you want and we will respond it.</div>
                    </div>
                    <div className='w-[367px] h-[344px] bg-white rounded-lg grid content-center justify-items-center gap-4'>
                        <Image src={lock} alt='lock' />
                        <div>Data Privacy</div>
                        <div className='text-center w-[290px]'>We make sure your data is safe in our database and we will encrypt any data you submitted to us.</div>
                    </div>
                    <div className='w-[367px] h-[344px] bg-white rounded-lg grid content-center justify-items-center gap-4'>
                        <Image src={download} alt='download' />
                        <div>Easy Download</div>
                        <div className='text-center w-[290px]'>Zwallet is 100% totally free to use it’s now available on Google Play Store and App Store.</div>
                    </div>
                </div>
            </div>
            <div className='flex justify-around relative top-[-450px]'>
                <div className='w-[380px] grid content-start gap-12'>
                    <div className='text-5xl font-bold leading-normal'>100+ <span className='text-blue-500'>Trusted</span> Partners.</div>
                    <div>We have reached global level and have 100+ brand partners around the globe.</div>
                </div>
                <div className='flex flex-wrap w-[580px] gap-6'>
                    <Image src={partners} alt='partner' />
                    <Image src={partners2} alt='partner' />
                    <Image src={partners3} alt='partner' />
                    <Image src={partners4} alt='partner' />
                    <Image src={partners5} alt='partner' />
                    <Image src={partners6} alt='partner' />
                </div>
            </div>
            <div className='w-full h-[900px] bg-slate-200 flex justify-center gap-24 relative top-[-350px]'>
                <div>
                    <Image src={phone2} alt='phone' />
                </div>
                <div className='relative top-24 w-[500px] grid content-start'>
                    <div className='text-5xl font-bold leading-normal tracking-wide h-[200px]'>All The <span className='text-blue-500'>Great</span> FazzPay Features.</div>
                    <div className='grid content-center gap-6'>
                        <div className='w-[620px] h-[127px] bg-white rounded-lg grid content-center pl-6 gap-3'>
                            <div className='font-bold tracking-wider'><span className='text-blue-500 mr-2'>1.</span> Small Fee</div>
                            <div>We only charge 5% of every success transaction done in FazzPay app.</div>
                        </div>
                        <div className='w-[620px] h-[127px] bg-white rounded-lg grid content-center pl-6 gap-3'>
                            <div className='font-bold tracking-wider'><span className='text-blue-500 mr-2'>2.</span> Data Secured</div>
                            <div>All your data is secured properly in our system and it’s encrypted.</div>
                        </div>
                        <div className='w-[620px] h-[127px] bg-white rounded-lg grid content-center pl-6 gap-3'>
                            <div className='font-bold tracking-wider'><span className='text-blue-500 mr-2'>3.</span> User Friendly</div>
                            <div>FazzPay come up with modern and sleek design and not complicated.</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='relative top-[-300px] grid justify-items-center gap-32'>
                <div className='grid gap-8'>
                    <div className='text-5xl font-bold tracking-wide'>What Users are <span className='text-blue-500'>Saying.</span></div>
                    <div className='text-center w-[530px]'>We have some great features from the application and it’s totally free to use by all users around the world.</div>
                </div>
                <div className='flex justify-center gap-8'>
                    <div className='w-[367px] h-[344px] bg-white drop-shadow-xl grid content-center justify-items-center gap-8'>
                        <Image src={avatar} alt='user' />
                        <div>Sherina Chaw</div>
                        <div className='text-center w-[280px]'>“I use this app since 2 years ago and this is the best app that I’ve ever use in my entire life”</div>
                    </div>
                    <div className='w-[367px] h-[344px] bg-white drop-shadow-xl grid content-center justify-items-center gap-8'>
                        <Image src={avatar} alt='user' />
                        <div>Sherina Chaw</div>
                        <div className='text-center w-[280px]'>“I use this app since 2 years ago and this is the best app that I’ve ever use in my entire life”</div>
                    </div>
                    <div className='w-[367px] h-[344px] bg-white drop-shadow-xl grid content-center justify-items-center gap-8'>
                        <Image src={avatar} alt='user' />
                        <div>Sherina Chaw</div>
                        <div className='text-center w-[280px]'>“I use this app since 2 years ago and this is the best app that I’ve ever use in my entire life”</div>
                    </div>
                </div>
            </div>
            <div className='bg-[#6379F4] h-[438px] relative top-[-150px] flex justify-around text-white'>
                <div className='grid content-center gap-12'>
                    <div className='text-4xl font-semibold'>FazzPay</div>
                    <div className='text-md text-slate-300 w-[350px] leading-loose'>Simplify financial needs and saving much time in banking needs with one single app.</div>
                    <div className='font-extralight'>2020 FazzPay. All right reserved.</div>
                </div>
                <div className='flex gap-8 items-end h-[330px]'>
                    <div>+62 5637 8882 9901</div>
                    <div>contact@fazzpay.com</div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage