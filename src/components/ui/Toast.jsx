import { AnimatePresence, motion } from "motion/react";
import { Bell, X } from "lucide-react";

function Toast({ message, onClose }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.96 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-5 right-5 z-[100] max-w-sm rounded-3xl border border-gray-200 bg-white p-4 shadow-2xl shadow-gray-950/15 dark:border-white/10 dark:bg-gray-900 dark:shadow-black/30"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gray-950 text-white dark:bg-white dark:text-gray-950">
              <Bell className="h-5 w-5" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-gray-950 dark:text-white">
                Thông báo hành vi
              </p>
              <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">
                {message}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/10 dark:hover:text-white"
              aria-label="Đóng thông báo"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Toast;