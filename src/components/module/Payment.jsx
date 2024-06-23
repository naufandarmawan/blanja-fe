import React, { useEffect, useState } from 'react'
import Button from '../base/Button'
import Input from '../base/Input'
import { Link, useNavigate } from 'react-router-dom'
import Mastercard from '../../assets/mastercard.svg'
import Gopay from '../../assets/gopay.svg'
import POSIndonesia from '../../assets/pos.svg'
import api from '../../configs/api'


const Payment = () => {
  const navigate = useNavigate()
  const [order, setOrder] = useState([])
  const [totalPrice, setTotalPrice] = useState(0);
  const [shoppingSummary, setShoppingSummary] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState("");
  const deliveryFee = 5.00;

  const getOrder = () => {
    api.get(`/order/checkout`)
      .then((res) => {
        alert("Get Order Successful")
        const result = res.data.data.products
        setOrder(result)
        setTotalPrice(res.data.data.total_price)

      })
      .catch((err) => {
        console.log(err.response);
        alert(err.response.data.message);
      })
  }

  const handlePayment = (e) => {
    e.preventDefault()
    // console.log(form);
    api.post('/order/move-orders-to-history')
      .then((res) => {
        console.log(res);
        alert(`Checkout Success`)
        navigate('/home');
      })
      .catch((err) => {
        console.log(err.response);
        alert(err.response.data.message)
      })
  }

  const handlePaymentMethodChange = (e) => {
    setSelectedPayment(e.target.value);
  };

  useEffect(() => {
    getOrder()
  }, [totalPrice])

  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = totalPrice + deliveryFee
      setShoppingSummary(total);
    };
    calculateTotalPrice();
  }, []);

  return (
    <div className='flex flex-col gap-8 items-center'>

      <h2 className='font-semibold text-3xl text-[#222222]'>Payment</h2>

      <div className='w-full flex flex-col gap-4'>

        <p className='font-semibold text-base text-[#222222]'>Payment method</p>

        <div className='flex flex-col gap-8'>

          <div className='flex justify-between'>
            <div className='flex gap-5 items-center'>
              <img className='size-10 object-fil' src={Gopay} alt="" />
              <p className='font-semibold text-base text-[#222222]'>Gopay</p>
            </div>

            <label className="w-fit flex items-center cursor-pointer gap-2">
              <input
                type="radio"
                value="gopay"
                name="paymentMethod"
                checked={selectedPayment === "gopay"}
                onChange={handlePaymentMethodChange}
                className="hidden"
              />
              <div className={`w-4 h-4 border border-gray-300 rounded-full flex items-center justify-center ${selectedPayment === "gopay" ? 'bg-red-500 border-red-500' : 'bg-white'}`}>
                {selectedPayment === "gopay" && (<div className="w-2 h-2 rounded-full bg-white"></div>)}
              </div>
            </label>

          </div>

          <div className='flex justify-between'>
            <div className='flex gap-5 items-center'>
              <img className='size-10 object-fill' src={POSIndonesia} alt="" />
              <p className='font-semibold text-base text-[#222222]'>POS Indonesia</p>
            </div>
            <label className="w-fit flex items-center cursor-pointer gap-2">
              <input
                type="radio"
                value="pos"
                name="paymentMethod"
                checked={selectedPayment === "pos"}
                onChange={handlePaymentMethodChange}
                className="hidden"
              />
              <div className={`w-4 h-4 border border-gray-300 rounded-full flex items-center justify-center ${selectedPayment === "pos" ? 'bg-red-500 border-red-500' : 'bg-white'}`}>
                {selectedPayment === "pos" && (<div className="w-2 h-2 rounded-full bg-white"></div>)}
              </div>
            </label>
          </div>

          <div className='flex justify-between'>
            <div className='flex gap-5 items-center'>
              <img className='size-10 object-fill' src={Mastercard} alt="" />
              <p className='font-semibold text-base text-[#222222]'>Mastercard</p>
            </div>
            <label className="w-fit flex items-center cursor-pointer gap-2">
              <input
                type="radio"
                value="mastercard"
                name="paymentMethod"
                checked={selectedPayment === "mastercard"}
                onChange={handlePaymentMethodChange}
                className="hidden"
              />
              <div className={`w-4 h-4 border border-gray-300 rounded-full flex items-center justify-center ${selectedPayment === "mastercard" ? 'bg-red-500 border-red-500' : 'bg-white'}`}>
                {selectedPayment === "mastercard" && (<div className="w-2 h-2 rounded-full bg-white"></div>)}
              </div>
            </label>
          </div>

        </div>

      </div>

      <div className='h-1 bg-[#f4f4f4] w-full'></div>

      <div className='w-full flex flex-col gap-4'>

        <p className='font-semibold text-base text-[#222222]'>Payment method</p>

        <div className='flex flex-col gap-3'>

          <div className='flex justify-between items-center'>
            <p className='font-medium text-base text-[#9b9b9b]'>Order</p>
            <p className='font-semibold text-lg text-[#222222]'>$ {totalPrice.toFixed(2)}</p>
          </div>

          <div className='flex justify-between items-center'>
            <p className='font-medium text-base text-[#9b9b9b]'>Delivery</p>
            <p className='font-semibold text-lg text-[#222222]'>$ {deliveryFee.toFixed(2)}</p>
          </div>

        </div>

      </div>

      <div className='w-full flex justify-between items-center'>
        <div className='flex flex-col'>
          <p className='font-semibold text-base text-[#222222]'>Shopping summary</p>
          <p className='font-semibold text-lg text-[#DB3022]'>$ {shoppingSummary.toFixed(2)}</p>
        </div>
        <Button className={"w-32"} text="Buy" onClick={handlePayment} />
      </div>

    </div>
  )
}

export default Payment