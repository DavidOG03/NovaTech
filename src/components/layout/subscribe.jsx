import React from 'react'

const Subscribe = () => {
  return (
    <section className='subscribe'>

        <div className="subscribe-box">
            <div className="title">
                Get your 
            <span> 10% off!</span>
            </div>
            <h2>Join Our Mailing List</h2>
            <form action="get" className="subscribe-form">
                <div className="input-group">
                    <img src="/images/at.svg" alt="at symbol" />
                    <input type="email" name="subscription-email" id="subscription-email" placeholder='Email Address'/>
                </div>
                <button className="subscribe-button">subscribe</button>
                <div className="subscribe-text-small">We never share your info. View our <a href="https://bella-template.webflow.io/faq">Privacy Policy</a></div>
            </form>
        </div>

    </section>
  )
}

export default Subscribe