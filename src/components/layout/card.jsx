import React from 'react'

const Card = ({img,day,month,year,publish,topic, link}) => {
  return (
    <div className='blog-card'>
        <a href={link}>
        <div className="blog-card-image">
          <img src={img} alt="blog image" />
        </div>
        </a>
        
        <div className="blog-card-text">
            <div className="blog-card-text-date">
                <h3>{day}</h3>
                <h4>{month} {year}</h4>
            </div>
            <div className="blog-card-text-info">
                <span className='publish'>Published in <span className="publish-red">{publish}</span></span>
                <a href={link}>{topic}</a>
            </div>
        </div>
    </div>
  )
}

export default Card