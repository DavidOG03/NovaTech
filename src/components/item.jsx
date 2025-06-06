import React from 'react'

const Item = ({image,price,name,count}) => {
  return (
    <div className="cart flex justify-between items-center w-full">
            <div className="left flex justify-start items-center gap-[1.25rem]">
              <div className="image grid place-items-center w-[100px] h-[100px] bg-(--grey) rounded-[0.75rem]">
                <img src={image} alt={name}/>
              </div>
              <div className="info flex flex-col justify-center items-start gap-6">
                <span className="text-(--light-black) text-[18px]">
                  {name}
                </span>
                <span className="text-[1.25rem]">{price}</span>
              </div>
            </div>
            <div className="right flex flex-col justify-center items-end gap-5">
              <div className="count flex justify-between items-center gap-[3rem] py-3 px-4 rounded-[0.75rem] bg-(--grey)">
                <button className="text-[1.5rem]">-</button>
                <span className="text-[1.5rem]">({count})</span>
                <button className="text-[1.5rem]">+</button>
              </div>
              <div className="remove-item flex justify-end items-center gap-[6px]">
                <img src="/images/delete_disabled.svg" alt="Delete Icon" />
                <p className="text-(--light-black) text-base">Remove</p>
              </div>
            </div>
          </div>
  )
}

export default Item