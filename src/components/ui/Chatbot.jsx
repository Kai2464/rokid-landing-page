import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Bot,
  ChevronDown,
  LoaderCircle,
  MessageCircle,
  Send,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import { chatbotFaqs } from "../../data/landingData";

function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/g, " ")
    .trim();
}

function hasAnyKeyword(text, keywords) {
  return keywords.some((keyword) => text.includes(keyword));
}

function getAutoReply(userInput) {
  const input = normalizeText(userInput);

  if (!input) {
    return "Bạn hãy nhập câu hỏi hoặc chọn một câu hỏi gợi ý bên dưới nhé.";
  }

  const matchedFaq = chatbotFaqs.find((faq) => {
    const question = normalizeText(faq.question);
    const importantWords = question
      .split(" ")
      .filter((word) => word.length >= 4);

    return importantWords.some((word) => input.includes(word));
  });

  if (matchedFaq) {
    return matchedFaq.answer;
  }

  if (
    hasAnyKeyword(input, [
      "rokid",
      "glasses",
      "kinh",
      "san pham",
      "dung de lam gi",
      "la gi",
    ])
  ) {
    return "Rokid Glasses là kính thông minh được giới thiệu với các trải nghiệm như xem thông tin nhanh, dịch thời gian thực, camera góc nhìn thứ nhất và hỗ trợ trợ lý AI. Trên website này, thông tin được dùng để demo landing page nên bạn vẫn nên kiểm tra lại nguồn chính thức trước khi nộp bài.";
  }

  if (
    hasAnyKeyword(input, [
      "tinh nang",
      "feature",
      "ai",
      "camera",
      "dich",
      "hien thi",
      "tro ly",
    ])
  ) {
    return "Các tính năng chính đang được trình bày gồm: hiển thị thông tin trực quan, dịch thời gian thực, camera POV, trợ lý AI, thiết kế nhẹ và hỗ trợ nhu cầu cá nhân như kính thuốc. Đây là nội dung demo nên thông số cần được xác minh lại.";
  }

  if (
    hasAnyKeyword(input, [
      "thong so",
      "spec",
      "specs",
      "49g",
      "12mp",
      "pin",
      "man hinh",
      "display",
    ])
  ) {
    return "Phần thông số kỹ thuật trên website dùng để trình bày các điểm như trọng lượng, camera, màn hình, AI, dịch thuật và pin. Trước khi nộp bài, bạn nên kiểm tra lại thông tin từ website chính thức Rokid để tránh sai số liệu.";
  }

  if (
    hasAnyKeyword(input, [
      "form",
      "email",
      "dang ky",
      "newsletter",
      "web3forms",
      "gui",
    ])
  ) {
    return "Form đăng ký nhận tin dùng Web3Forms để gửi họ tên và email về email nhận form. Website cũng có kiểm tra dữ liệu trước khi gửi để tránh nhập sai định dạng email hoặc bỏ trống thông tin.";
  }

  if (
    hasAnyKeyword(input, [
      "gio hang",
      "cart",
      "yeu thich",
      "favorite",
      "san pham da xem",
      "ecommerce",
      "mua",
      "ban hang",
    ])
  ) {
    return "Phần mini e-commerce chỉ là tính năng minh họa. Người dùng có thể bấm yêu thích, thêm vào giỏ hàng và xem sản phẩm đã xem gần đây. Website chưa có thanh toán thật và không phải cửa hàng bán hàng thật.";
  }

  if (
    hasAnyKeyword(input, [
      "dark mode",
      "giao dien toi",
      "sang toi",
      "theme",
      "mau",
    ])
  ) {
    return "Website có Dark Mode. Người dùng có thể bấm nút mặt trăng hoặc mặt trời trên Header để chuyển giao diện sáng/tối. Lựa chọn theme được lưu lại bằng localStorage.";
  }

  if (
    hasAnyKeyword(input, [
      "animation",
      "scroll",
      "parallax",
      "skeleton",
      "hieu ung",
      "loading",
    ])
  ) {
    return "Website có các hiệu ứng nâng cao như scroll progress bar, animation khi cuộn, parallax nhẹ ở Hero, micro-interactions khi hover và skeleton loading khi mới mở trang.";
  }

  if (
    hasAnyKeyword(input, [
      "deploy",
      "vercel",
      "seo",
      "metadata",
      "favicon",
      "github",
    ])
  ) {
    return "Website có thể deploy lên Vercel sau khi tối ưu SEO, metadata và favicon. Khi deploy, nhớ không đưa các file chứa key thật như .env.local lên GitHub.";
  }

  if (
    hasAnyKeyword(input, [
      "api",
      "gemini",
      "backend",
      "server",
      "key",
      "khoa",
    ])
  ) {
    return "Phiên bản hiện tại chỉ có thể trả lời trên dữ liệu local.";
  }

  return "Mình là chatbot demo của landing page Rokid Glasses. Mình có thể trả lời về sản phẩm, tính năng, thông số, form đăng ký, Dark Mode, animation, mini e-commerce và cách website hoạt động. Bạn có thể hỏi ngắn gọn hơn hoặc chọn câu hỏi gợi ý bên dưới.";
}

function Chatbot({ onTrack }) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "bot",
      content:
        "Xin chào! Mình là Rokid Assistant. Mình có thể trả lời tự động về Rokid Glasses, form, thông số, Dark Mode, mini e-commerce và các tính năng của website.",
    },
  ]);

  const messageListRef = useRef(null);

  const suggestedQuestions = useMemo(() => {
    return chatbotFaqs.slice(0, 4);
  }, []);

  function scrollToBottom() {
    window.setTimeout(() => {
      if (messageListRef.current) {
        messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
      }
    }, 50);
  }

  function toggleChatbot() {
    setIsOpen((current) => !current);

    if (!isOpen) {
      onTrack?.("Bạn vừa mở chatbot hỗ trợ tự động.");
    }
  }

  function sendMessage(messageText) {
    const trimmedMessage = messageText.trim();

    if (!trimmedMessage || isSending) {
      return;
    }

    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmedMessage,
    };

    const loadingMessage = {
      id: `loading-${Date.now()}`,
      role: "bot",
      content: "Đang tạo câu trả lời...",
      isLoading: true,
    };

    setMessages((currentMessages) => [
      ...currentMessages,
      userMessage,
      loadingMessage,
    ]);

    setInputValue("");
    setIsSending(true);
    scrollToBottom();

    window.setTimeout(() => {
      const botMessage = {
        id: `bot-${Date.now()}`,
        role: "bot",
        content: getAutoReply(trimmedMessage),
      };

      setMessages((currentMessages) => [
        ...currentMessages.filter((message) => !message.isLoading),
        botMessage,
      ]);

      setIsSending(false);
      scrollToBottom();
    }, 550);
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendMessage(inputValue);
  }

  function handleSuggestedQuestion(question) {
    sendMessage(question);
  }

  function clearChat() {
    setMessages([
      {
        id: "welcome-reset",
        role: "bot",
        content:
          "Đoạn chat đã được làm mới. Bạn có thể hỏi về Rokid Glasses, form đăng ký, thông số, Dark Mode hoặc các tính năng demo của website.",
      },
    ]);
  }

  return (
    <div className="fixed bottom-5 left-5 z-[110]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="mb-4 flex h-[620px] max-h-[calc(100vh-7rem)] w-[calc(100vw-2.5rem)] max-w-md flex-col overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-2xl shadow-gray-950/20 dark:border-white/10 dark:bg-gray-950 dark:shadow-black/40"
          >
            <div className="border-b border-gray-200 bg-gray-950 p-5 text-white dark:border-white/10 dark:bg-gray-900">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-gray-950">
                    <Bot className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="font-semibold">Rokid Assistant</h3>
                    <p className="mt-1 text-sm text-gray-300">
                      Chatbot tự động trả lời về Rokid Glasses và các tính năng của website.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-2 text-gray-300 transition hover:bg-white/10 hover:text-white"
                  aria-label="Đóng chatbot"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div
              ref={messageListRef}
              className="flex-1 space-y-4 overflow-y-auto bg-gray-50 p-5 dark:bg-gray-900"
            >
              {messages.map((message) => {
                const isUser = message.role === "user";

                return (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${isUser ? "justify-end" : ""}`}
                  >
                    {!isUser && (
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-gray-950 text-white dark:bg-white dark:text-gray-950">
                        {message.isLoading ? (
                          <LoaderCircle className="h-4 w-4 animate-spin" />
                        ) : (
                          <Bot className="h-4 w-4" />
                        )}
                      </div>
                    )}

                    <div
                      className={`max-w-[82%] rounded-3xl px-4 py-3 text-sm leading-6 ${
                        isUser
                          ? "bg-gray-950 text-white dark:bg-white dark:text-gray-950"
                          : "border border-gray-200 bg-white text-gray-700 dark:border-white/10 dark:bg-gray-950 dark:text-gray-200"
                      }`}
                    >
                      {message.content}
                    </div>

                    {isUser && (
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-600 dark:border-white/10 dark:bg-gray-950 dark:text-gray-300">
                        <UserRound className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="border-t border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-gray-950">
              <div className="mb-4">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                    Câu hỏi gợi ý
                  </p>

                  <button
                    type="button"
                    onClick={clearChat}
                    className="text-xs font-semibold text-gray-500 transition hover:text-gray-950 dark:text-gray-400 dark:hover:text-white"
                  >
                    Làm mới
                  </button>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-1">
                  {suggestedQuestions.map((faq) => (
                    <button
                      key={faq.question}
                      type="button"
                      onClick={() => handleSuggestedQuestion(faq.question)}
                      disabled={isSending}
                      className="shrink-0 rounded-full border border-gray-200 bg-gray-50 px-3 py-2 text-xs font-medium text-gray-600 transition hover:-translate-y-0.5 hover:border-gray-300 hover:text-gray-950 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:border-white/20 dark:hover:text-white"
                    >
                      {faq.question}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  placeholder="Nhập câu hỏi..."
                  disabled={isSending}
                  className="min-w-0 flex-1 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-950/10 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-white/30 dark:focus:ring-white/10 dark:disabled:bg-white/5"
                />

                <button
                  type="submit"
                  disabled={isSending}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gray-950 text-white transition hover:-translate-y-0.5 hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:hover:translate-y-0 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-200 dark:disabled:bg-gray-600 dark:disabled:text-gray-300"
                  aria-label="Gửi câu hỏi"
                >
                  {isSending ? (
                    <LoaderCircle className="h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={toggleChatbot}
        whileHover={{ y: -4, scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="group flex items-center gap-3 rounded-full bg-gray-950 px-5 py-4 text-sm font-semibold text-white shadow-2xl shadow-gray-950/20 transition dark:bg-white dark:text-gray-950 dark:shadow-black/30"
        aria-label="Mở chatbot"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition group-hover:rotate-6 dark:bg-gray-950/10">
          {isOpen ? (
            <ChevronDown className="h-5 w-5" />
          ) : (
            <MessageCircle className="h-5 w-5" />
          )}
        </span>

        <span className="hidden sm:inline">
          {isOpen ? "Thu gọn chatbot" : "Hỏi Rokid Assistant"}
        </span>

        {!isOpen && <Sparkles className="hidden h-4 w-4 sm:block" />}
      </motion.button>
    </div>
  );
}

export default Chatbot;