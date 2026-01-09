import React from 'react'
import Card from './card'

const Blog = () => {
  return (
    <div className='blog'>
        <span className='blog-span'> <span className='blog-title-red'>Explore</span> the Blog</span>
        <h3 className='blog-title'>Latest Posts & Updates</h3>

        <div className="blogs">
            <Card
            img="/images/blog-post-1.jpg"
            day="5"
            month="FEB"
            year="2023"
            publish="NEW ARRIVALS"
            topic="How To Start A Business With Elastic Themes"
            link="https://bella-template.webflow.io/blog/how-to-start-a-business-with-elastic-themes"/>
            <Card
            img="/images/blog-post-02.jpg"
            day="26"
            month="MAR"
            year="2023"
            publish="LIFESTYLE"
            topic="Quick Guide: How To Start With CSS Grid"
            link="https://bella-template.webflow.io/blog/how-to-start-a-business-with-elastic-themes"/>

        </div>
    </div>
  )
}

export default Blog