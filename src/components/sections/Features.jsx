import { motion } from "motion/react";
import {
  Bot,
  Camera,
  Feather,
  Glasses,
  Languages,
  MonitorSmartphone,
} from "lucide-react";
import { features } from "../../data/landingData";

const iconMap = {
  MonitorSmartphone,
  Languages,
  Camera,
  Bot,
  Feather,
  Glasses,
};

function Features() {
  return (
    <section
      id="features"
      className="bg-gray-50 px-6 py-20 transition-colors duration-300 dark:bg-gray-900 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-500 dark:text-gray-400"
          >
            Tính năng nổi bật
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-3xl font-semibold tracking-tight text-gray-950 dark:text-white sm:text-4xl md:text-5xl"
          >
            Một thiết bị đeo, nhiều trải nghiệm thông minh
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-5 text-base leading-8 text-gray-600 dark:text-gray-300 sm:text-lg"
          >
            Rokid Glasses được giới thiệu như một kính thông minh hỗ trợ AI,
            hiển thị thông tin nhanh, dịch thuật và ghi lại khoảnh khắc từ góc
            nhìn người dùng.
          </motion.p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon] || Glasses;

            return (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                whileHover={{ y: -6 }}
                className="group rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:border-gray-300 hover:shadow-xl hover:shadow-gray-950/10 dark:border-white/10 dark:bg-gray-950 dark:hover:border-white/20 dark:hover:shadow-black/30"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-950 text-white transition duration-300 group-hover:scale-110 dark:bg-white dark:text-gray-950">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="mt-6 text-xl font-semibold tracking-tight text-gray-950 dark:text-white">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>

                <div className="mt-6 h-px w-full bg-gray-100 dark:bg-white/10" />

                <p className="mt-4 text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
                  Rokid feature
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Features;