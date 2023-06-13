import React from 'react'
import cookieConfig from '@/helpers/cookieConfig';
import { withIronSessionSsr } from "iron-session/next";
import http from '@/helpers/http.helper';

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req }) {
        const token = req.session?.token
        return {
            props: {
                token,
            },
        };
    },
    cookieConfig
);

function TopUp({token}) {
    const [formattedInput, setFormattedInput] = React.useState('');
    const [inputValue, setInputValue] = React.useState('');
    const [loading, setLoading] = React.useState(false)

    const handleInputChange = (event) => {
        const rawValue = event.target.value;
        const numericValue = rawValue.replace(/[^0-9]/g, ''); // Menghapus semua karakter non-angka
        const formattedValue = new Intl.NumberFormat('id-ID').format(
            Number(numericValue)
        ); // Memformat angka dengan format "100.000"
        setFormattedInput(formattedValue);
        setInputValue(numericValue); // Menggunakan nilai angka tanpa pemformatan
    };

    const doTopUp = async (event) => {
        try{
            setLoading(true)
            event.preventDefault()
            const {value: amount} = event.target.amount
            console.log(value)
            const body = new URLSearchParams({amount}).toString()
            console.log(body)
            const {data} = await http(token).post('/transactions/topup', body)
            console.log(data)
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
    }

    return (
        <div>
            <button className="btn" onClick={()=>window.my_modal_3.showModal()}>Top Up</button>
            <dialog id="my_modal_3" className="modal">
                <form method="dialog" className="modal-box">
                    <button htmlFor="my-modal-3" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">Press ESC key or click on ✕ button to close</p>
                    <input name='amount' type='number'/>
                    <button className='btn btn-primary'>Button</button>
                </form>
            </dialog>
        </div>
    )
}

export default TopUp