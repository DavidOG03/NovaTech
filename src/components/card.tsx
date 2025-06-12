import React from 'react'
interface CardProps {
  image?: string;
  name?:string;
  price?:string;
  lastPrice?:string;
}

const Card: React.FC<CardProps> = ({image, name, price, lastPrice}) => {
  return (
    <div className='card h-auto md:min-h-[297px] transition-shadow duration-300 hover:cursor-pointer hover:shadow-[0_0_100px_2px_rgba(0,0,0,0.1)]'>
      <img src={image} alt="hot deal image" className='w-[100px] h-[100px] md:w-[200px] md:h-[200px] block m-auto object-contain' />
      <div className="info flex flex-col justify-center items-center">
        <p className='text-(--light-black) text-base md:text-[1.125rem]'>{name}</p>
        <div className="price mx-[41px] flex flex-col justify-center items-center">
            {price !== undefined && <p className="text-base md:text-[20px]">{price}</p>}
            <p className="last-price line-through text-(--light-black) text-[0.7rem] md:text-[0.75rem]">{lastPrice}</p>
        </div>
      </div>
    </div>
  )
}

export default Card
