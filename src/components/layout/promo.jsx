import React from 'react'
import Button from "../components/button";
import Whitecircle from "../components/whitecircle";

const Promo = () => {
  return (
    <div className='promo'>
        <div className="promo-text">
        <span className="promo-tag">
            spring sale!
        </span>
        <h3>Up to <span>50% OFF</span> The Most Popular Items!</h3>
        <Button/>
        </div>
        <div className="promo-image__wrapper">
        <Whitecircle/>
        <img src="/images/promo-image.png" alt="promo image" className='promo-image'/>
        </div>
    </div>
  )
}

export default Promo