import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { withIronSessionSsr } from "iron-session/next";
import { useRouter } from 'next/router'
import cookieConfig from '@/helpers/cookieConfig';

// export const getServerSideProps = withIronSessionSsr(
//     async function getServerSideProps({req, res}){
//         req.session.destroy()
//         // res.setHeader('location', '/auth/login')
//         // res.statusCode = 302
//         // res.end()
//         return {
//             props: {}
//         };
//     },
//     cookieConfig
// )

function Logout() {
    const router = useRouter()
    // useEffect(()=> {
    //     router.replace('/auth/login')
    // }, [router])
    const doLogout = useCallback(async()=> {
        await axios.get('/api/logout')
        router.replace('/auth/login')
    }, [router])
    useEffect(()=> {
        doLogout()
    }, [doLogout])
  return (
    <div>Logout</div>
  )
}

export default Logout