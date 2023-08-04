import React from 'react'
import http from '@/helpers/http.helper';
import { useDispatch, useSelector } from 'react-redux';
import { setProfile } from '@/redux/reducers/profile';

function TopUp({token, style}) {
    const [valueTopUp, setValueTopUp] = React.useState('')
    const [openModal, setOpenModal] = React.useState(false)
    const dispatch = useDispatch()
    const amount = useSelector(state => state.transfer.amount)
    const [loading, setLoading] = React.useState(false)

    // const handleInputChange = (event) => {
    //   const {value} = event.target
    //     setValueTopUp(value)
    // };

    // const handleChange = (event) => {
    //   const { value } = event.target;
    //   // Menghapus titik sebelum menyimpan nilai ke state
    //   const newValue = value.replace(/\./g, '');
    //   setAmount(newValue);
    // };

    // const valueTopup = (value) => {
    //   console.log(value)
    //     return value
    // };

    const getProfile = React.useCallback(async()=>{
      const {data} = await http(token).get('/profile')
        dispatch(setProfile(data.results))
    },[token, dispatch])

    React.useEffect(()=> {
      getProfile()
    }, [getProfile])

    const doTopUp = async (e) => {
        e.preventDefault()
        const {value: amount} = e.target.amount
        const form = new URLSearchParams({amount}).toString()
        const {data} = await http(token).post('/transactions/topup', form)
        dispatch(setProfile(data.results))
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
                <input name='amount' type="number" placeholder='Input Amount' className='input input-bordered w-full' />
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