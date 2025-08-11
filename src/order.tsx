import React from 'react'

const Order = () => {
  return (
    <div className="order-container flex flex-col items-center justify-center h-full w-full pt-[90px] pb-8">
      <div className="order-delivery mb-6">

      </div>
      <div className="order-details bg-white rounded-2xl p-4 md:px-[1.5rem] md:py-[1.825rem] w-full max-w-[700px]">
        <div className="flex justify-between items-center pb-4 border border-[transparent] border-b-[#EFEFEF]">
          <h2 className="text-lg font-semibold">Order Details</h2>
          <button className="text-blue-500 hover:underline">Edit Order</button>
        </div>
        <div className="flex flex-col gap-4">
          <p>Order ID: #123456789</p>
          <p>Date: 2023-10-01</p>
          <p>Status: Processing</p>
        </div>
      </div>
    </div>
  )
}

export default Order
