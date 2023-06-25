import React from 'react'
import cookieConfig from '@/helpers/cookieConfig';
import { withIronSessionSsr } from "iron-session/next";
import http from '@/helpers/http.helper';
import PinInput from './PinInput';
import { useDispatch, useSelector } from 'react-redux';

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
    const [pin, setPin] = React.useState('')
    const dispatch = useDispatch()
    const amount = useSelector(state => state.transfer.amount)
    // const [formattedInput, setFormattedInput] = React.useState('');
    // const [inputValue, setInputValue] = React.useState('');
    const [loading, setLoading] = React.useState(false)

    // const handleInputChange = (event) => {
    //     const rawValue = event.target.value;
    //     const numericValue = rawValue.replace(/[^0-9]/g, ''); // Menghapus semua karakter non-angka
    //     const formattedValue = new Intl.NumberFormat('id-ID').format(
    //         Number(numericValue)
    //     ); // Memformat angka dengan format "100.000"
    //     setFormattedInput(formattedValue);
    //     setInputValue(numericValue); // Menggunakan nilai angka tanpa pemformatan
    // };

    const doTopUp = async (token) => {
        const form = new URLSearchParams({amount}).toString()
        const {data} = await http(token).post('/transactions/topup', form)
        dispatch(clearTransferState())
    }

    return (
    <>
        <label htmlFor='pin-topup' className='btn btn-primary text-white'>TopUp</label>
        <input type="checkbox" id="pin-topup" className="modal-toggle" />
        <div className="modal">
        <div className="modal-box flex flex-col gap-4">
            <h3 className="font-bold text-lg">TopUp</h3>
            <p className="py-4">Enter the amount of money, and click submit</p>
            <div>
                <PinInput onChangePin={setPin}/>
            </div>
            <div className="modal-action">
            <button onClick={doTopUp} disabled={!(pin.length >= 6)} className="btn btn-primary">Continue</button>
            </div>
        </div>
        </div>
    </>
    )
}

export default TopUp