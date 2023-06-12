import React from 'react'
import Image from 'next/image';
import {FiBell} from 'react-icons/fi'
import logout from '../../../../public/log-out.png';
import grid from '../../../../public/grid.svg';
import {AiOutlineUser, AiOutlinePlus, AiOutlineArrowUp, AiOutlineEyeInvisible, AiOutlineEye} from 'react-icons/ai';
import {HiOutlineLockClosed} from 'react-icons/hi';
import Link from 'next/link'
import http from '@/helpers/http.helper';
import cookieConfig from '@/helpers/cookieConfig';
import { withIronSessionSsr } from "iron-session/next";
import checkCredentials from '@/helpers/checkCredentials';

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

function ChangePassword({token, user}) {
    const [loading, setLoading] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState('')
    const [successMessage, setSuccessMessage] = React.useState('')
    const doChangePassword = async (event) => {
        setErrorMessage('')
        try{
            setLoading(true)
            event.preventDefault()
            const {value: oldPassword} = event.target.oldPassword
            const {value: newPassword} = event.target.newPassword
            const {value: confirmPassword} = event.target.confirmPassword
            if(newPassword !== confirmPassword){
                setErrorMessage('Password and Confirm Password do not match')
                setLoading(false)
                return
            }
            const body = new URLSearchParams({oldPassword, newPassword, confirmPassword}).toString()
            const {data} = await http(token).patch('/profile/change-password', body)
            if(data){
                setSuccessMessage("Successfully changed password")
                setLoading(false)
            }
        }catch(err){
            console.log(err)
            const message = err?.response?.data?.message
            const results = err?.response?.data?.results
            console.log(message)
            console.log(results)
            if(message === "profile_change_password_wrong_old"){
                setErrorMessage('Old password is incorrect.')
                setLoading(false)
            }
            setSuccessMessage('')
        }
    }

    const [showPassword, setShowPassword] = React.useState(false)
    const handleTogglePassword = () => {
        setShowPassword(!showPassword)
    }
    const [showPassword2, setShowPassword2] = React.useState(false)
    const handleTogglePassword2 = () => {
        setShowPassword2(!showPassword2)
    }
    const [showPassword3, setShowPassword3] = React.useState(false)
    const handleTogglePassword3 = () => {
        setShowPassword3(!showPassword3)
    }

    return (
        <div className='bg-[#E5E5E5]'>
            <div className='w-full bg-white h-24 flex justify-around items-center'>
                <div className='text-blue-500 text-2xl font-bold'>FazzPay</div>
                <div className='flex items-center gap-6'>
                    <Image src={user.picture} className='rounded-xl' width={50} height={50} alt='avatar'/>
                    <div className='grid'>
                        <div>{user.fullName}</div>
                        <div>{user.phones}</div>
                    </div>
                    <FiBell size={25}/>
                </div>
            </div>
            <div className='flex justify-center gap-8'>
                <div className='w-[270px] h-[678px] grid content-around justify-items-center bg-white relative top-12 rounded-xl'>
                    <div className='relative grid gap-12 top-12 font-semibold'>
                        <div className='flex gap-2 items-center'>
                            <Image src={grid} alt='grid' />
                            <Link href='/home' className='text-blue-500'>Dashboard</Link>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <AiOutlineArrowUp />
                            <Link href='/transfer'>Transfer</Link>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <AiOutlinePlus />
                            <Link href='/'>Top uP</Link>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <AiOutlineUser />
                            <Link href='/profile'>Profile</Link>
                        </div>
                    </div>
                    <Link href='/auth/logout' className='flex gap-2 items-center font-semibold'>
                        <Image src={logout} alt='logout'/>Logout
                    </Link>
                </div>
                <div className='w-[950px] h-[678px] bg-white relative top-12 rounded-xl'>
                    <div className='relative left-12 top-8 grid gap-6'>
                        <div className='font-bold text-xl'>Change Password</div>
                        <div className='w-[370px] text-slate-400'>You must enter your current password and then type your new password twice.</div>
                    </div>
                    {errorMessage &&
                        (<div className='flex justify-center mt-12'>
                            <h1 className="alert alert-error w-[380px] relative">{errorMessage}</h1>
                        </div>)}
                    {successMessage && 
                        (<div className='flex justify-center mt-12'>
                            <h1 className="alert alert-success w-[380px] relative">{successMessage}</h1>
                        </div>)}
                    <form onSubmit={doChangePassword} className='grid justify-center content-center gap-12 mt-16 w-full'>
                        <div className='grid gap-1'>
                            <div className='flex gap-4 items-center'>
                                <HiOutlineLockClosed />
                                <input name='oldPassword' type={showPassword ? 'text' : 'password'} placeholder='Current password' className='border-none pl-4 tracking-wider w-full border-slate-400'/>
                                <div onClick={handleTogglePassword}>
                                    {showPassword ? 
                                        <AiOutlineEye size={25}/> :
                                        <AiOutlineEyeInvisible size={25}/> 
                                    }
                                </div>
                            </div>
                            <hr className='h-0.5 bg-slate-300 w-[500px]' />
                        </div>
                        <div className='grid gap-1'>
                            <div className='flex gap-4 items-center'>
                                <HiOutlineLockClosed />
                                <input name='newPassword' type={showPassword2 ? 'text' : 'password'} placeholder='New password' className='border-none pl-4 tracking-wider w-full border-slate-400'/>
                                <div onClick={handleTogglePassword2}>
                                    {showPassword2 ? 
                                        <AiOutlineEye size={25}/> :
                                        <AiOutlineEyeInvisible size={25}/> 
                                    }
                                </div>
                            </div>
                            <hr className='h-0.5 bg-slate-300 w-[500px]' />
                        </div>
                        <div className='grid gap-1'>
                            <div className='flex gap-4 items-center'>
                                <HiOutlineLockClosed />
                                <input name='confirmPassword' type={showPassword3 ? 'text' : 'password'} placeholder='Repeat new password' className='border-none pl-4 tracking-wider w-full border-slate-400'/>
                                <div onClick={handleTogglePassword3}>
                                    {showPassword3 ? 
                                        <AiOutlineEye size={25}/> :
                                        <AiOutlineEyeInvisible size={25}/> 
                                    }
                                </div>
                            </div>
                            <hr className='h-0.5 bg-slate-300 w-[500px]' />
                        </div>
                        <button disabled={loading} className='btn btn-primary text-white'>Change Password</button>
                    </form>
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

export default ChangePassword