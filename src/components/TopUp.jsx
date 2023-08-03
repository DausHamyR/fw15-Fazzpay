import React from 'react'
import http from '@/helpers/http.helper';
import PinInput from './PinInput';
import { useDispatch, useSelector } from 'react-redux';
import { clearTransferState } from '@/redux/reducers/transfer';

function TopUp({token, style}) {
    const [valueTopUp, setValueTopUp] = React.useState('')
    const [openModal, setOpenModal] = React.useState(false)
    const dispatch = useDispatch()
    const amount = useSelector(state => state.transfer.amount)
    const [loading, setLoading] = React.useState(false)

    const handleInputChange = (event) => {
        const rawValue = Number(event.target.value).toLocaleString('id')
        setValueTopUp(rawValue)
    };

    const valueTopup = (value) => {
        return value
    };

    const doTopUp = async (e) => {
        e.preventDefault()
        const {value: amount} = Number(e.target.amount).toLocaleString('id')
        console.log(value)
        const form = new URLSearchParams({amount}).toString()
        await http(token).post('/transactions/topup', form)
        dispatch(clearTransferState())
        setOpenModal(false)
    }

    return (
    <>
        <label htmlFor='pin-topup' className={`${style} cursor-pointer`} onClick={()=> setOpenModal(true)}>TopUp</label>
        <input type="checkbox" id="pin-topup" className="modal-toggle" checked={openModal}/>
        <div className="modal">
          <div className="modal-box flex flex-col gap-4">
              <h3 className="font-bold text-lg">TopUp</h3>
              <p className="py-4">Enter the amount of money, and click submit</p>
              <form onSubmit={doTopUp}>
                <input name='amount' type="number" placeholder='Input Amount' className='input input-bordered w-full' onChange={handleInputChange} value={valueTopup} />
                <div className="modal-action">
                  <button className="btn btn-primary" onClick={()=> setOpenModal(false)}>Submit</button>
                </div>
              </form>
          </div>
          <label className="modal-backdrop" htmlFor="pin-topup" onClick={()=> setOpenModal(false)}>Close</label>
        </div>
    </>
    )
}

export default TopUp