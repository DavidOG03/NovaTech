import React from 'react'

export default function InstagramPage() {
  return (
    <>
    <section className="gallery">
        <div className="first-gallery">
          <div>
            <img src="/images/instagram-01.jpg" alt="woman" />
          </div>
          <div>
            <img src="/images/instagram-02.jpg" alt="woman" />
          </div>
          <div>
            <img
              src="/images/instagram-03.jpg"
              alt="man wearing a black jacket and shades"
            />
          </div>
          <div>
            <img src="/images/instagram-04.jpg" alt="ripped jeans" />
          </div>
        </div>
        <div className="middle">
          <img src="/images/instagram-logo.png" alt="instagram logo" />
          <h6>
            <span id="follow">follow</span> us on
          </h6>
          <p>Instagram</p>
        </div>
        <div className="second-gallery">
          <div>
            <img src="/images/instagram-05.jpg" alt="lady" />
          </div>
          <div>
            <img src="/images/instagram-06.jpg" alt="lady" />
          </div>
          <div>
            <img src="/images/instagram-07.jpg" alt="clothes" />
          </div>
          <div>
            <img
              src="/images/instagram-08.jpg"
              alt="a guy looking out in the sun"
            />
          </div>
        </div>
      </section>
    </>
  )
}
