import React from 'react'
import Image from 'next/image';
import defaultPicture from '../../public/daw.jpg';
import {FiBell} from 'react-icons/fi'
import { useSelector } from 'react-redux';

function Navbar({token}) {
  const user = useSelector(state => state.profile.data)

    // React.useEffect(()=> {
    //     console.log(user)
    //     console.log(token)
    // }, [user, token])

return (
    <div>
        <div className='w-full bg-[#05BFDB] h-24 flex justify-between items-center px-24 max-sm:px-4'>
            <div className='text-2xl font-semibold text-white'>Pay<span className='text-[#0A4D68]'>Easy</span></div>
            <div className='flex items-center gap-6'>
                {user?.picture === null ? 
                    <Image src={defaultPicture} className='rounded-full w-12 h-12' alt='avatar'/> :
                    <Image src={user?.picture} width={60} height={60} className='rounded-full w-12 h-12' alt='avatar'/>
                }
                <div className='grid'>
                    <div>{user?.username}</div> 
                    <div>{user?.email}</div>
                </div>
                <FiBell size={25}/>
            </div>
        </div>
    </div>
)
}

export default Navbar