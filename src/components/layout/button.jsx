import React from 'react'
import { easeIn, easeOut, motion } from "framer-motion";

const Button = () => {
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
      
  return (
    <motion.button
        className="shop-now"
        variants={text}
        initial="before"
        animate="after"
      >
        Shop Now
      </motion.button>
  )
}

export default Button