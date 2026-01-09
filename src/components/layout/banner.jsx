import React from "react";
import Slider from "react-slick";
import { easeIn, easeOut, motion } from "framer-motion";
import Button from "@/components/layout/button";
import Whitecircle from "@/components/layout/whitecircle";

export default function Banner() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const text = {
    before: {
      x: 70,
      opacity: 0,
    },
    after: {
      x: 0,
      opacity: 1,
      transition: {
        delay: 0.3,
        duration: 1,
        type: "tween",
      },
    },
  };

  const image = {
    hidden: {
      x: 70,
      opacity: 0,
    },
    show: {
      x: 0,
      opacity: 1,
      transition: {
        delay: 1,
        ease: [0.075, 0.82, 0.165, 1],
        duration: 3,
        type: "tween",
      },
    },
  };
  return (
    <Slider {...settings}>
      <div className="slide">
          <motion.h1 variants={text} initial="before" animate="after">
            <span>
              <span className="accent">Revamp</span> Your Style,
            </span>
            <span>
              <span className="accent">Redefine</span> Your Wardrobe!
            </span>
          </motion.h1>

          <Button />

          <div className="hero-image">
            <Whitecircle />
            <motion.img
              src="/images/fashion-model.png"
              alt="A fashion model"
              className="hero-image--model"
              variants={image}
              initial="hidden"
              animate="show"
            />
          </div>
        </div>
        <div className="slide">
        <motion.h1 variants={text} initial="before" animate="after">
          <span>
            <span className="accent">Revamp</span> Your Style,
          </span>
          <span>
            <span className="accent">Redefine</span> Your Wardrobe!
          </span>
        </motion.h1>

        <Button />

        <div className="hero-image">
          <Whitecircle />
          <motion.img
            src="/images/fashion-model-2.png"
            alt="A fashion model"
            className="hero-image--model"
            variants={image}
            initial="hidden"
            whileInView="animate"
            
          />
        </div>
        
        </div>
    </Slider>
  );
}

