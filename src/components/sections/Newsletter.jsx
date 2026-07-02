import { useRef, useState } from "react";
import { motion } from "motion/react";
import {
  AlertCircle,
  Bell,
  CheckCircle2,
  LoaderCircle,
  Mail,
  Send,
  UserRound,
} from "lucide-react";
import { newsletterContent, trackingMessages } from "../../data/landingData";
import { validateNewsletterForm } from "../../utils/validators";
import { submitNewsletterForm } from "../../utils/web3forms";

const initialFormData = {
  name: "",
  email: "",
};

const initialErrors = {
  name: "",
  email: "",
};

function Newsletter({ onTrack }) {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(initialErrors);
  const [submitStatus, setSubmitStatus] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasTrackedFocusRef = useRef(false);

  function handleFormFocus() {
    if (!hasTrackedFocusRef.current) {
      hasTrackedFocusRef.current = true;
      onTrack?.(trackingMessages.newsletterFocus);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));

    setSubmitStatus("");
    setStatusMessage("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validation = validateNewsletterForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      setSubmitStatus("error");
      setStatusMessage("Vui lòng kiểm tra lại thông tin trước khi gửi.");
      return;
    }

    setErrors(initialErrors);
    setIsSubmitting(true);
    setSubmitStatus("");
    setStatusMessage("");

    const result = await submitNewsletterForm(formData);

    setIsSubmitting(false);

    if (!result.success) {
      setSubmitStatus("error");
      setStatusMessage(result.message);
      return;
    }

    setSubmitStatus("success");
    setStatusMessage(result.message);
    setFormData(initialFormData);
  }

  return (
    <section
      id="newsletter"
      className="bg-white px-6 py-20 transition-colors duration-300 dark:bg-gray-950 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-[2rem] border border-gray-200 bg-gray-950 shadow-2xl shadow-gray-950/20 dark:border-white/10 dark:bg-gray-900 dark:shadow-black/30">
          <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
            <div className="relative overflow-hidden p-8 text-white sm:p-10 lg:p-12">
              <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-gray-200">
                  <Bell className="h-4 w-4" />
                  Cập nhật sản phẩm
                </div>

                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                  {newsletterContent.title}
                </h2>

                <p className="mt-5 max-w-xl text-base leading-8 text-gray-300 sm:text-lg">
                  {newsletterContent.description}
                </p>

                <div className="mt-8 space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-white" />
                    <p className="text-sm leading-7 text-gray-300">
                      Form kiểm tra họ tên và email trước khi gửi để giảm dữ
                      liệu sai.
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-white" />
                    <p className="text-sm leading-7 text-gray-300">
                      Dữ liệu hợp lệ sẽ được gửi tới Web3Forms bằng webhook
                      thật.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55 }}
              className="bg-white p-8 transition-colors duration-300 dark:bg-gray-950 sm:p-10 lg:p-12"
            >
              <form
                onSubmit={handleSubmit}
                onFocus={handleFormFocus}
                noValidate
                className="space-y-5"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-gray-950 dark:text-white"
                  >
                    Họ và tên
                  </label>

                  <div className="relative">
                    <UserRound className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 dark:text-gray-500" />

                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={newsletterContent.placeholderName}
                      disabled={isSubmitting}
                      className={`w-full rounded-2xl border bg-white py-4 pl-12 pr-4 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:ring-2 focus:ring-gray-950/10 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-500 dark:focus:ring-white/10 dark:disabled:bg-white/5 ${
                        errors.name
                          ? "border-red-300 focus:border-red-400 dark:border-red-400/60"
                          : "border-gray-200 focus:border-gray-400 dark:border-white/10 dark:focus:border-white/30"
                      }`}
                    />
                  </div>

                  {errors.name && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-gray-950 dark:text-white"
                  >
                    Email
                  </label>

                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 dark:text-gray-500" />

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={newsletterContent.placeholderEmail}
                      disabled={isSubmitting}
                      className={`w-full rounded-2xl border bg-white py-4 pl-12 pr-4 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:ring-2 focus:ring-gray-950/10 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-500 dark:focus:ring-white/10 dark:disabled:bg-white/5 ${
                        errors.email
                          ? "border-red-300 focus:border-red-400 dark:border-red-400/60"
                          : "border-gray-200 focus:border-gray-400 dark:border-white/10 dark:focus:border-white/30"
                      }`}
                    />
                  </div>

                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                      {errors.email}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gray-950 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-gray-950/20 transition duration-300 hover:-translate-y-0.5 hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:shadow-none disabled:hover:translate-y-0 dark:bg-white dark:text-gray-950 dark:shadow-white/10 dark:hover:bg-gray-200 dark:disabled:bg-gray-600 dark:disabled:text-gray-300"
                >
                  {isSubmitting ? (
                    <>
                      Đang gửi...
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                    </>
                  ) : (
                    <>
                      {newsletterContent.buttonText}
                      <Send className="h-4 w-4 transition duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                {submitStatus === "success" && (
                  <div className="flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm leading-6 text-green-700 dark:border-green-400/20 dark:bg-green-400/10 dark:text-green-300">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                    <p>{statusMessage}</p>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700 dark:border-red-400/20 dark:bg-red-400/10 dark:text-red-300">
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                    <p>{statusMessage}</p>
                  </div>
                )}

                <p className="text-xs leading-6 text-gray-500 dark:text-gray-400">
                  {newsletterContent.privacyNote}
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;