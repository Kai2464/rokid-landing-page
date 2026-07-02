import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { ArrowRight, CheckCircle2, Cpu, Sparkles } from "lucide-react";
import Button from "../ui/Button";
import { heroContent, stats, trackingMessages } from "../../data/landingData";
import productImage from "../../assets/images/rokid1.webp";

function Hero({ onTrack }) {
  const heroRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 35]);

  const safeImageY = shouldReduceMotion ? 0 : imageY;
  const safeGlowY = shouldReduceMotion ? 0 : glowY;
  const safeTextY = shouldReduceMotion ? 0 : textY;

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden bg-white transition-colors duration-300 dark:bg-gray-950"
    >
      <motion.div
        style={{ y: safeGlowY }}
        className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-gray-100 blur-3xl dark:bg-white/5"
      />

      <motion.div
        style={{ y: safeImageY }}
        className="pointer-events-none absolute right-0 top-1/3 h-80 w-80 rounded-full bg-gray-100 blur-3xl dark:bg-white/5"
      />

      <div className="relative mx-auto grid min-h-[calc(100vh-73px)] max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <motion.div style={{ y: safeTextY }} className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:text-gray-300 lg:mx-0"
          >
            <Sparkles className="h-4 w-4 text-gray-950 dark:text-white" />
            {heroContent.eyebrow}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-4xl font-semibold tracking-tight text-gray-950 dark:text-white sm:text-5xl md:text-6xl"
          >
            {heroContent.title}{" "}
            <span className="text-gray-500 dark:text-gray-400">
              {heroContent.highlight}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-600 dark:text-gray-300 sm:text-lg lg:mx-0"
          >
            {heroContent.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start"
          >
            <Button
              href="#features"
              onClick={() => onTrack?.(trackingMessages.heroButton)}
            >
              {heroContent.primaryButton}
              <ArrowRight className="ml-2 h-4 w-4 transition duration-300 group-hover:translate-x-1" />
            </Button>

            <Button
              href="#specs"
              variant="secondary"
              onClick={() => onTrack?.(trackingMessages.specsButton)}
            >
              {heroContent.secondaryButton}
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.45 }}
            className="mx-auto mt-5 max-w-xl text-xs leading-6 text-gray-500 dark:text-gray-400 lg:mx-0"
          >
            {heroContent.note}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.5 }}
            className="mt-10 grid gap-3 sm:grid-cols-3"
          >
            {stats.map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.25 }}
                className="rounded-3xl border border-gray-200 bg-gray-50 p-5 text-left transition-colors duration-300 dark:border-white/10 dark:bg-white/5"
              >
                <p className="text-2xl font-semibold text-gray-950 dark:text-white">
                  {item.value}
                </p>

                <p className="mt-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                  {item.label}
                </p>

                <p className="mt-2 text-xs leading-5 text-gray-500 dark:text-gray-400">
                  {item.note}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: safeImageY }}
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute inset-8 rounded-[2.5rem] bg-gray-200 blur-3xl dark:bg-white/10" />

          <motion.div
            whileHover={{ y: -8, rotateX: 2, rotateY: -2 }}
            transition={{ duration: 0.35 }}
            className="relative overflow-hidden rounded-[2rem] border border-gray-200 bg-white p-5 shadow-2xl shadow-gray-950/10 transition-colors duration-300 dark:border-white/10 dark:bg-gray-900 dark:shadow-black/30"
          >
            <div className="relative overflow-hidden rounded-[1.5rem] bg-gray-50 dark:bg-gray-950">
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white blur-3xl dark:bg-white/10" />

              <div className="relative flex min-h-[360px] items-center justify-center p-8 sm:min-h-[420px]">
                <motion.img
                  src={productImage}
                  alt="Rokid Glasses product"
                  loading="eager"
                  initial={{ opacity: 0, y: 20, scale: 0.96 }}
                  animate={{ opacity: 1, y: [0, -10, 0], scale: 1 }}
                  transition={{
                    opacity: { duration: 0.7, delay: 0.35 },
                    scale: { duration: 0.7, delay: 0.35 },
                    y: {
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                  className="max-h-[300px] w-full max-w-md object-contain drop-shadow-2xl sm:max-h-[360px]"
                />
              </div>

              <div className="absolute left-5 top-5 rounded-full border border-gray-200 bg-white/85 px-4 py-2 text-xs font-semibold text-gray-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-gray-900/80 dark:text-gray-200">
                Product preview
              </div>

              <div className="absolute bottom-5 right-5 rounded-full border border-gray-200 bg-white/85 px-4 py-2 text-xs font-semibold text-gray-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-gray-900/80 dark:text-gray-200">
                Rokid Glasses
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <motion.div
                whileHover={{ y: -4 }}
                className="rounded-2xl bg-gray-50 p-4 transition-colors duration-300 dark:bg-white/5"
              >
                <p className="text-xs text-gray-500 dark:text-gray-400">Mode</p>
                <p className="mt-1 text-sm font-semibold text-gray-950 dark:text-white">
                  AI
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -4 }}
                className="rounded-2xl bg-gray-50 p-4 transition-colors duration-300 dark:bg-white/5"
              >
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Display
                </p>
                <p className="mt-1 text-sm font-semibold text-gray-950 dark:text-white">
                  Dual
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -4 }}
                className="rounded-2xl bg-gray-50 p-4 transition-colors duration-300 dark:bg-white/5"
              >
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Design
                </p>
                <p className="mt-1 text-sm font-semibold text-gray-950 dark:text-white">
                  Light
                </p>
              </motion.div>
            </div>

            <div className="mt-4 space-y-3 rounded-[1.5rem] bg-gray-950 p-4 text-white dark:bg-white/5">
              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-center gap-3 rounded-2xl bg-white/10 p-4"
              >
                <CheckCircle2 className="h-5 w-5 text-white" />
                <p className="text-sm text-gray-100">
                  Dịch nhanh nội dung trong ngữ cảnh thực tế
                </p>
              </motion.div>

              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-center gap-3 rounded-2xl bg-white/10 p-4"
              >
                <Cpu className="h-5 w-5 text-white" />
                <p className="text-sm text-gray-100">
                  Trợ lý AI hỗ trợ thông tin ngay trong tầm mắt
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;