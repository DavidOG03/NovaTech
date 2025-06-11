import React from 'react'

const Card = ({image, name, price, lastPrice}) => {
  return (
    <div className='card min-h-[297px] transition-shadow duration-300 hover:cursor-pointer hover:shadow-[0_0_15px_8px_rgba(0,0,0,0.025)]'>
      <img src={image} alt="hot deal image" className='w-[200px] h-[200px] block m-auto object-cover' />
      <div className="info flex flex-col justify-center items-center">
        <p className='text-(--light-black) text-[1.125rem]'>{name}</p>
        <div className="price mx-[41px] flex flex-col justify-center items-center">
            <p className="text-[20px]">{price}</p>
            <p className="last-price line-through text-(--light-black) text-[0.75rem]">{lastPrice}</p>
        </div>
      </div>
    </div>
  )
}

export default Card
