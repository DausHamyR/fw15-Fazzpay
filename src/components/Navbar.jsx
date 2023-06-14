import React from 'react'
import Image from 'next/image';
import defaultPicture from '../../public/daw.jpg';
import {FiBell} from 'react-icons/fi'
import cookieConfig from '@/helpers/cookieConfig';
import { withIronSessionSsr } from "iron-session/next";
import checkCredentials from '@/helpers/checkCredentials';
import http from '@/helpers/http.helper';
import { useDispatch, useSelector } from 'react-redux';
import { setProfile } from '@/redux/reducers/profile';

// export const getServerSideProps = withIronSessionSsr(
//     async function getServerSideProps({ req, res }) {
//         const token = req.session?.token
//         checkCredentials(token, res, '/auth/login')
//         const {data} = await http(token).get('/profile')
//         return {
//             props: {
//                 token,
//                 user: data.results
//             },
//         };
//     },
//     cookieConfig
// );

function Navbar({token}) {
    const dispatch = useDispatch()
    const user = useSelector(state => state.profile.data)
    const getData = React.useCallback(async()=>{
        const {data} = await http(token).get('/profile')
        dispatch(setProfile(data.results))
    },[token, dispatch])

    React.useEffect(()=> {
        getData()
    }, [getData])
    
return (
    <div>
        <div className='w-full bg-[#05BFDB] h-24 flex justify-between items-center px-24 max-sm:px-4'>
            <div className='text-2xl font-semibold text-white'>Pay<span className='text-[#0A4D68]'>Easy</span></div>
            <div className='flex items-center gap-6'>
                {user.picture === null ? 
                    <Image src={defaultPicture} width={60} height={60} className='rounded-xl' alt='avatar'/> :
                    <Image src={user.picture} width={60} height={60} className='rounded-xl' alt='avatar'/>
                }
                <div className='grid'>
                    <div>{user?.fullName}</div> 
                    <div>{user?.email}</div>
                </div>
                <FiBell size={25}/>
            </div>
        </div>
    </div>
)
}

export default Navbar