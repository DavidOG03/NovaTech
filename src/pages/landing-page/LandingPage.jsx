import React from 'react'
import Blog from "@/components/layout/blog";
import InstagramPage from "@/components/layout/instagramPage";
import Promo from "@/components/layout/promo";
import Services from "@/components/layout/services";
import Subscribe from "@/components/layout/subscribe";
import Faq from "@/components/layout/faq";
import Banner from "@/components/layout/banner";

const LandingPage = () => {
  return (
    <div className="">
      <Banner/>
      <Services />
      
      <Promo />
      <Subscribe />
      <Blog />
      <section className="sponsors">
        <div className="sponsors-logo">
          <img src="/images/aven-logo.svg" alt="sponsor logo" />
        </div>
        <div className="sponsors-logo">
          <img src="/images/earth-2.0-dark.svg" alt="sponsor logo" />
        </div>
        <div className="sponsors-logo">
          <img src="/images/ideaa-dark.svg" alt="sponsor logo" />
        </div>
        <div className="sponsors-logo">
          <img src="/images/zoo-tv-dark.svg" alt="sponsor logo" />
        </div>
        <div className="sponsors-logo">
          <img src="/images/code-lab-dark.svg" alt="sponsor logo" />
        </div>
        <div className="sponsors-logo">
          <img src="/images/circle-dark.svg" alt="sponsor logo" />
        </div>
      </section>
      <Faq/>
      <InstagramPage/>
    </div>
  )
}

export default LandingPage