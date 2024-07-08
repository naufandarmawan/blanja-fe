import React from 'react'
import ProductThumbnail from '../../assets/product-thumbnail.png'
import Remove from '../../assets/remove.svg'
import Add from '../../assets/add.svg'

const CartCard = ({ photo = ProductThumbnail, name = "Product Name", store = "Store", color = "Color", size = "Size", quantity = "1", price = "0.00", onDelete, onIncrement, onDecrement, editor=true }) => {


    return (
        <div className='flex p-6 bg-white rounded-md justify-between items-center drop-shadow-[0_0_8px_rgba(115,115,115,0.25)] max-lg:flex-col max-lg:gap-6'>


            <div className='flex gap-5'>
                {/* <input type="checkbox" name="" id="" /> */}
                <img className='size-16 rounded-md object-cover' src={photo} alt="" />
                <div className='flex flex-col gap-1 justify-center'>
                    <div className='flex flex-col gap-1'>
                        <p className='font-medium text-base'>{name}</p>
                        <p className='font-medium text-base'>( {color} / {size} )</p>
                    </div>

                    <p className=' font-normal text-xs text-[#9b9b9b]'>{store}</p>
                </div>
            </div>

            <div className='flex gap-12 items-center max-lg:flex-col max-lg:items-start max-lg:w-full max-lg:gap-6'>
                <div className='flex gap-4 items-center'>
                    <img className={editor === true ? 'size-9' : "invisible"} src={Remove} onClick={onDecrement}/>
                    <p className='font-medium text-base text-[#222222]'>{quantity}</p>
                    <img className={editor === true ? 'size-9' : "invisible"} src={Add} onClick={onIncrement} />
                </div>

                <p className='font-semibold text-base text-[#222222]'>$ {price}</p>

                <p onClick={onDelete} className={editor === true ? 'font-medium text-base text-[#DB3022] cursor-pointer' : 'invisible'}>Delete</p>
            </div>
        </div>
    )
}

export default CartCard