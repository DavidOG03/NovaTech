import React from 'react'
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Services = () => {
  return (
    <div className="services">
        <div className="service">
          <span className="service-icon">
            {/* <FontAwesomeIcon icon="fa-solid fa-thumbs-up" /> */}
          </span>
          <div className="service-text">
            <span>100% Quality</span>
            <p>
              Writing result-oriented ad copy is difficult, as it must convince
              consumers.
            </p>
          </div>
        </div>
        <div className="service">
        <span className="service-icon">
        {/* <FontAwesomeIcon icon="fa-solid fa-truck-fast" /> */}
          </span>
          <div className="service-text">
            <span>FREE SHIPPING</span>
            <p>
              Writing result-oriented ad copy is difficult, as it must convince
              consumers.
            </p>
          </div>
        </div>
        <div className="service">
        <span className="service-icon">
        {/* <FontAwesomeIcon icon="fa-solid fa-lock" /> */}
          </span>
          <div className="service-text">
            <span>SECURE PAYMENT</span>
            <p>
              Writing result-oriented ad copy is difficult, as it must convince
              consumers.
            </p>
          </div>
        </div>
        <div className="service">
        <span className="service-icon">
        {/* <FontAwesomeIcon icon="fa-solid fa-rotate-left" /> */}
          </span>
          <div className="service-text">
            <span>FREE RETURN</span>
            <p>
              Writing result-oriented ad copy is difficult, as it must convince
              consumers.
            </p>
          </div>
        </div>
      </div>
  )
}

export default Services