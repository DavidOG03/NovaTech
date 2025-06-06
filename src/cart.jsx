import React from 'react'

const Cart = ({numberOfItems,count}) => {
  return (
    <div className="cart-container flex justify-between items-start gap-5">
        <div className='bg-white rounded-2xl px-[1.5rem] py-[1.825rem] flex-auto max-w-[700px]'>
      <div className="flex justify-between items-center pb-4 border border-[transparent] border-b-[#EFEFEF] ">
        <div className="flex justify-start items-center gap-1">Cart <span>({numberOfItems})</span></div>
        <button className="flex justify-end items-center gap-1"><img src="/images/delete.svg" alt="delete icon" /> Delete</button>
      </div>
      <div className="flex justify-center items-center flex-col gap-12 py-[1.9rem]">
        <div className="cart flex justify-between items-center w-full">
            <div className="left flex justify-start items-center gap-[1.25rem]">
                <div className="image grid place-items-center w-[100px] h-[100px] bg-(--grey) rounded-[0.75rem]">
                    <img src="/images/iphone.png" alt="Iphones" />
                </div>
                <div className="info flex flex-col justify-center items-start gap-6">
                    <span className="text-(--light-black) text-[18px]">Iphone 16 pro</span>
                    <span className="text-[1.25rem]">N1,400,500</span>
                </div>
            </div>
            <div className="right flex flex-col justify-center items-end">
                <div className="count flex justify-between items-center gap-[3rem] py-3 px-4 rounded-[0.75rem] bg-(--grey)">
                    <button className="text-[1.5rem]">-</button>
                    <span className="text-[1.5rem]">({count})</span>
                    <button className="text-[1.5rem]">+</button>
                </div>
                <div className="remove-item flex justify-end items-center gap-[6px]">
                    <img src="/images/delete_disabled.svg" alt="Delete Icon"/>
                    <p className="text-(--light-black) text-base">Remove</p>
                </div>
            </div>
        </div>
      </div>
    </div>
    <div className="order-summary bg-white rounded-2xl px-[1.5rem] py-[1.825rem]">
        <div className="border border-[transparent] border-b-[#EFEFEF] pb-4 ">Order Summary</div>
    </div>

    </div>
    
  )
}

export default Cart
