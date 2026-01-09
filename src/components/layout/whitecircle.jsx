import React from "react";
import { easeIn, easeOut, motion } from "framer-motion";

const Whitecircle = () => {
  const reveal = {
    before: {
      scale: 0.1,
    },
    after: {
      scale: 1,
      transition: {
        delay: 0.75,
        ease: [0.075, 0.82, 0.165, 1],
        duration: 2,
        type: "spring",
      },
    },
  };
  return (
    <motion.div
      className="white-circle"
      variants={reveal}
      initial="before"
      animate="after"
    ></motion.div>
  );
};

export default Whitecircle;
