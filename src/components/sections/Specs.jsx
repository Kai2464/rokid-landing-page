import { motion } from "motion/react";
import { AlertCircle, CheckCircle2, Cpu, ShieldCheck } from "lucide-react";
import { specs } from "../../data/landingData";

function Specs() {
  return (
    <section
      id="specs"
      className="bg-gray-50 px-6 py-20 transition-colors duration-300 dark:bg-gray-900 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5 }}
              className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-500 dark:text-gray-400"
            >
              Thông số kỹ thuật
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 text-3xl font-semibold tracking-tight text-gray-950 dark:text-white sm:text-4xl md:text-5xl"
            >
              Trình bày thông số rõ ràng, dễ kiểm tra
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-5 text-base leading-8 text-gray-600 dark:text-gray-300 sm:text-lg"
            >
              Phần này dùng để giới thiệu thông tin kỹ thuật chính của Rokid
              Glasses. Trước khi nộp bài, bạn nên kiểm tra lại các thông số từ
              website chính thức hoặc tài liệu sản phẩm của Rokid.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-gray-950 dark:shadow-black/20"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gray-950 text-white dark:bg-white dark:text-gray-950">
                  <AlertCircle className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="text-base font-semibold text-gray-950 dark:text-white">
                    Lưu ý quan trọng
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-gray-600 dark:text-gray-300">
                    Không nên tự bịa thông số sản phẩm. Nếu giáo viên yêu cầu
                    độ chính xác cao, hãy chụp hoặc lưu nguồn tham khảo từ trang
                    chính thức Rokid để làm minh chứng.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            className="overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-xl shadow-gray-950/5 dark:border-white/10 dark:bg-gray-950 dark:shadow-black/30"
          >
            <div className="border-b border-gray-200 bg-gray-950 p-6 text-white dark:border-white/10 dark:bg-white/5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 dark:bg-white dark:text-gray-950">
                  <Cpu className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm text-gray-400">Product specs</p>
                  <h3 className="text-xl font-semibold text-white">
                    Rokid Glasses
                  </h3>
                </div>
              </div>
            </div>

            <div className="divide-y divide-gray-100 dark:divide-white/10">
              {specs.map((spec, index) => {
                const isVerified = spec.status === "Đã xác định";

                return (
                  <motion.div
                    key={spec.label}
                    initial={{ opacity: 0, x: 18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.45, delay: index * 0.04 }}
                    className="grid gap-3 p-5 transition duration-300 hover:bg-gray-50 dark:hover:bg-white/5 sm:grid-cols-[0.85fr_1.15fr]"
                  >
                    <div>
                      <p className="text-sm font-semibold text-gray-950 dark:text-white">
                        {spec.label}
                      </p>

                      <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-500 dark:border-white/10 dark:bg-white/5 dark:text-gray-300">
                        {isVerified ? (
                          <CheckCircle2 className="h-3.5 w-3.5 text-gray-700 dark:text-gray-300" />
                        ) : (
                          <ShieldCheck className="h-3.5 w-3.5 text-gray-700 dark:text-gray-300" />
                        )}
                        {spec.status}
                      </div>
                    </div>

                    <p className="text-sm leading-7 text-gray-600 dark:text-gray-300">
                      {spec.value}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Specs;