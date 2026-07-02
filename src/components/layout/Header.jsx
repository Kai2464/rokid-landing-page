import { useState } from "react";
import { Glasses, Menu, Moon, Sun, X } from "lucide-react";
import Button from "../ui/Button";
import { footerLinks } from "../../data/landingData";

const navTrackingMessages = {
  "#features": "Bạn vừa mở phần tính năng nổi bật.",
  "#use-cases": "Bạn vừa mở phần ứng dụng thực tế.",
  "#specs": "Bạn vừa mở phần thông số kỹ thuật.",
  "#newsletter": "Bạn vừa mở form đăng ký nhận tin.",
};

function Header({ onTrack, isDarkMode, onToggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleNavClick(href) {
    setIsOpen(false);

    if (onTrack && navTrackingMessages[href]) {
      onTrack(navTrackingMessages[href]);
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/80 bg-white/85 backdrop-blur-xl transition-colors duration-300 dark:border-white/10 dark:bg-gray-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#"
          className="flex items-center gap-2 font-semibold text-gray-950 dark:text-white"
          onClick={() => onTrack?.("Bạn vừa quay lại đầu trang.")}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-950 text-white dark:bg-white dark:text-gray-950">
            <Glasses className="h-5 w-5" />
          </span>
          <span>Rokid Glasses</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {footerLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-sm font-medium text-gray-600 transition hover:text-gray-950 dark:text-gray-300 dark:hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={onToggleTheme}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition hover:-translate-y-0.5 hover:bg-gray-50 dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:hover:bg-white/10"
            aria-label="Chuyển giao diện sáng tối"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          <Button
            href="#newsletter"
            onClick={() => handleNavClick("#newsletter")}
          >
            Nhận thông tin
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={onToggleTheme}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition dark:border-white/10 dark:text-gray-200"
            aria-label="Chuyển giao diện sáng tối"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-700 dark:border-white/10 dark:text-gray-200"
            onClick={() => setIsOpen((current) => !current)}
            aria-label="Mở menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-gray-200 bg-white px-6 py-4 dark:border-white/10 dark:bg-gray-950 md:hidden">
          <nav className="flex flex-col gap-3">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-gray-950 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white"
              >
                {link.label}
              </a>
            ))}

            <Button
              href="#newsletter"
              className="mt-2 w-full"
              onClick={() => handleNavClick("#newsletter")}
            >
              Nhận thông tin
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;