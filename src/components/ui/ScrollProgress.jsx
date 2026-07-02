import { motion, useScroll } from "motion/react";

function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed left-0 top-0 z-[120] h-1 w-full origin-left bg-gray-950 dark:bg-white"
    />
  );
}

export default ScrollProgress;