import { motion } from "motion/react";
import { ArrowDown, Eye, MessageCircle, Sparkles, Video } from "lucide-react";
import { scrollytelling } from "../../data/landingData";

const visualIcons = [Eye, MessageCircle, Video, Sparkles];

function UseCases() {
  return (
    <section
      id="use-cases"
      className="bg-white px-6 py-20 transition-colors duration-300 dark:bg-gray-950 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5 }}
              className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-500 dark:text-gray-400"
            >
              Ứng dụng thực tế
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 text-3xl font-semibold tracking-tight text-gray-950 dark:text-white sm:text-4xl md:text-5xl"
            >
              Một ngày với kính thông minh Rokid Glasses
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-5 text-base leading-8 text-gray-600 dark:text-gray-300 sm:text-lg"
            >
              Section này mô phỏng cách người dùng trải nghiệm sản phẩm theo
              từng tình huống. Đây là kiểu trình bày scrollytelling: người xem
              cuộn xuống và nội dung được dẫn dắt như một câu chuyện.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 hidden items-center gap-3 rounded-full border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-600 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 lg:inline-flex"
            >
              <ArrowDown className="h-4 w-4" />
              Cuộn xuống để xem từng tình huống
            </motion.div>
          </div>

          <div className="space-y-6">
            {scrollytelling.map((item, index) => {
              const Icon = visualIcons[index] || Sparkles;

              return (
                <motion.article
                  key={item.step}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                  className="group relative overflow-hidden rounded-[2rem] border border-gray-200 bg-gray-50 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-gray-300 hover:bg-white hover:shadow-xl hover:shadow-gray-950/10 dark:border-white/10 dark:bg-gray-900 dark:hover:border-white/20 dark:hover:bg-gray-900/80 dark:hover:shadow-black/30 sm:p-8"
                >
                  <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white blur-2xl transition duration-300 group-hover:bg-gray-100 dark:bg-white/5 dark:group-hover:bg-white/10" />

                  <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-gray-950 text-white shadow-lg shadow-gray-950/20 dark:bg-white dark:text-gray-950 dark:shadow-white/10">
                      <Icon className="h-7 w-7" />
                    </div>

                    <div>
                      <div className="flex items-center gap-3">
                        <span className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-500 dark:border-white/10 dark:bg-white/5 dark:text-gray-300">
                          Bước {item.step}
                        </span>

                        <span className="h-px w-12 bg-gray-200 dark:bg-white/10" />
                      </div>

                      <h3 className="mt-5 text-2xl font-semibold tracking-tight text-gray-950 dark:text-white">
                        {item.title}
                      </h3>

                      <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-gray-300 sm:text-base">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default UseCases;