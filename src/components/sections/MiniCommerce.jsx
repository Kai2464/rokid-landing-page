import { useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  AlertCircle,
  CheckCircle2,
  Eye,
  Heart,
  LoaderCircle,
  Minus,
  PackageCheck,
  Plus,
  Send,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { miniProducts } from "../../data/landingData";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { validateEmail, validateName } from "../../utils/validators";
import { submitCartConsultation } from "../../utils/web3forms";

import productImage1 from "../../assets/images/rokid1.webp";
import productImage2 from "../../assets/images/rokid2.webp";
import productImage3 from "../../assets/images/rokid3.webp";
import productImage4 from "../../assets/images/rokid4.webp";

const productImages = {
  "rokid-glasses": productImage1,
  "rokid-case": productImage4,
  "rokid-lens": productImage3,
};

const initialContactData = {
  name: "",
  email: "",
  phone: "",
  note: "",
};

const initialContactErrors = {
  name: "",
  email: "",
  phone: "",
};

function ProductPreview({ product, compact = false }) {
  return (
    <motion.div
      key={product.id}
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35 }}
      className={`relative overflow-hidden rounded-[1.5rem] bg-gray-50 p-5 dark:bg-white/5 ${
        compact ? "mt-4 border border-gray-200 dark:border-white/10" : ""
      }`}
    >
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-600 dark:border-white/10 dark:bg-gray-950 dark:text-gray-300">
        <PackageCheck className="h-4 w-4" />
        {product.badge}
      </div>

      <div
        className={`flex items-center justify-center ${
          compact ? "min-h-48" : "min-h-64"
        }`}
      >
        <motion.img
          src={productImages[product.id] || productImage4}
          alt={product.name}
          initial={{ opacity: 0, y: 18, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4 }}
          className={`w-full object-contain drop-shadow-2xl ${
            compact ? "max-h-44" : "max-h-56"
          }`}
        />
      </div>

      <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-4 dark:border-white/10 dark:bg-gray-950">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
          Đang xem
        </p>

        <h3 className="mt-2 text-xl font-semibold text-gray-950 dark:text-white">
          {product.name}
        </h3>

        <p className="mt-2 text-sm leading-7 text-gray-600 dark:text-gray-300">
          {product.description}
        </p>

        <p className="mt-3 text-sm font-semibold text-gray-950 dark:text-white">
          {product.priceLabel}
        </p>
      </div>
    </motion.div>
  );
}

function validatePhone(phone) {
  const trimmedPhone = phone.trim();

  if (!trimmedPhone) {
    return "";
  }

  const phoneRegex = /^[0-9+\-\s()]{8,20}$/;

  if (!phoneRegex.test(trimmedPhone)) {
    return "Số điện thoại chưa hợp lệ.";
  }

  return "";
}

function MiniCommerce() {
  const [favoriteIds, setFavoriteIds] = useLocalStorage(
    "rokid-favorites",
    []
  );
  const [cartItems, setCartItems] = useLocalStorage("rokid-cart", {});
  const [recentlyViewedIds, setRecentlyViewedIds] = useLocalStorage(
    "rokid-recently-viewed",
    []
  );

  const [selectedProductId, setSelectedProductId] = useState(
    miniProducts[0]?.id || ""
  );

  const [contactData, setContactData] = useState(initialContactData);
  const [contactErrors, setContactErrors] = useState(initialContactErrors);
  const [consultationStatus, setConsultationStatus] = useState("");
  const [consultationMessage, setConsultationMessage] = useState("");
  const [isSubmittingConsultation, setIsSubmittingConsultation] =
    useState(false);

  const selectedProduct = useMemo(() => {
    return (
      miniProducts.find((product) => product.id === selectedProductId) ||
      miniProducts[0]
    );
  }, [selectedProductId]);

  const cartList = useMemo(() => {
    return Object.entries(cartItems)
      .map(([productId, quantity]) => {
        const product = miniProducts.find((item) => item.id === productId);

        if (!product) {
          return null;
        }

        return {
          ...product,
          quantity,
        };
      })
      .filter(Boolean);
  }, [cartItems]);

  const cartCount = useMemo(() => {
    return Object.values(cartItems).reduce((total, quantity) => {
      return total + quantity;
    }, 0);
  }, [cartItems]);

  const recentlyViewedProducts = recentlyViewedIds
    .map((productId) => miniProducts.find((product) => product.id === productId))
    .filter(Boolean);

  function toggleFavorite(productId) {
    setFavoriteIds((currentIds) => {
      if (currentIds.includes(productId)) {
        return currentIds.filter((id) => id !== productId);
      }

      return [...currentIds, productId];
    });
  }

  function addToCart(productId) {
    setCartItems((currentCart) => ({
      ...currentCart,
      [productId]: (currentCart[productId] || 0) + 1,
    }));
  }

  function decreaseCartItem(productId) {
    setCartItems((currentCart) => {
      const currentQuantity = currentCart[productId] || 0;

      if (currentQuantity <= 1) {
        const newCart = { ...currentCart };
        delete newCart[productId];
        return newCart;
      }

      return {
        ...currentCart,
        [productId]: currentQuantity - 1,
      };
    });
  }

  function removeFromCart(productId) {
    setCartItems((currentCart) => {
      const newCart = { ...currentCart };
      delete newCart[productId];
      return newCart;
    });
  }

  function clearCart() {
    setCartItems({});
    setConsultationStatus("");
    setConsultationMessage("");
  }

  function handleViewProduct(productId) {
    setSelectedProductId(productId);

    setRecentlyViewedIds((currentIds) => {
      const nextIds = [
        productId,
        ...currentIds.filter((currentId) => currentId !== productId),
      ];

      return nextIds.slice(0, 4);
    });
  }

  function handleContactChange(event) {
    const { name, value } = event.target;

    setContactData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    setContactErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));

    setConsultationStatus("");
    setConsultationMessage("");
  }

  async function handleConsultationSubmit(event) {
    event.preventDefault();

    const nextErrors = {
      name: validateName(contactData.name),
      email: validateEmail(contactData.email),
      phone: validatePhone(contactData.phone),
    };

    const hasError = nextErrors.name || nextErrors.email || nextErrors.phone;

    if (hasError) {
      setContactErrors(nextErrors);
      setConsultationStatus("error");
      setConsultationMessage(
        "Vui lòng kiểm tra lại thông tin liên hệ trước khi gửi."
      );
      return;
    }

    if (cartList.length === 0) {
      setConsultationStatus("error");
      setConsultationMessage(
        "Giỏ hàng đang trống. Hãy thêm sản phẩm trước khi gửi yêu cầu tư vấn."
      );
      return;
    }

    setContactErrors(initialContactErrors);
    setIsSubmittingConsultation(true);
    setConsultationStatus("");
    setConsultationMessage("");

    const result = await submitCartConsultation({
      contactData,
      cartList,
    });

    setIsSubmittingConsultation(false);

    if (!result.success) {
      setConsultationStatus("error");
      setConsultationMessage(result.message);
      return;
    }

    setConsultationStatus("success");
    setConsultationMessage(
      `${result.message} Giỏ hàng đã được làm trống vì yêu cầu tư vấn đã được gửi.`
    );
    setContactData(initialContactData);
    setCartItems({});
  }

  return (
    <section
      id="mini-commerce"
      className="bg-gray-50 px-6 py-20 transition-colors duration-300 dark:bg-gray-900 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5 }}
              className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-500 dark:text-gray-400"
            >
              Mini e-commerce
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 text-3xl font-semibold tracking-tight text-gray-950 dark:text-white sm:text-4xl md:text-5xl"
            >
              Tương tác sản phẩm như một cửa hàng mini
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-5 text-base leading-8 text-gray-600 dark:text-gray-300 sm:text-lg"
            >
              Người dùng có thể lưu yêu thích, thêm sản phẩm vào giỏ hàng và gửi
              yêu cầu tư vấn để nhận thêm thông tin chi tiết. Đây là tính năng
              minh họa, chưa có thanh toán thật.
            </motion.p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-gray-950">
                <p className="text-2xl font-semibold text-gray-950 dark:text-white">
                  {favoriteIds.length}
                </p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  Sản phẩm yêu thích
                </p>
              </div>

              <div className="rounded-3xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-gray-950">
                <p className="text-2xl font-semibold text-gray-950 dark:text-white">
                  {cartCount}
                </p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  Số lượng trong giỏ
                </p>
              </div>

              <div className="rounded-3xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-gray-950">
                <p className="text-2xl font-semibold text-gray-950 dark:text-white">
                  {recentlyViewedProducts.length}
                </p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  Đã xem gần đây
                </p>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            className="rounded-[2rem] border border-gray-200 bg-white p-5 shadow-xl shadow-gray-950/5 dark:border-white/10 dark:bg-gray-950 dark:shadow-black/30"
          >
            <div className="grid gap-5 md:grid-cols-[0.85fr_1.15fr]">
              <div className="hidden md:block">
                <ProductPreview product={selectedProduct} />
              </div>

              <div className="space-y-4">
                {miniProducts.map((product) => {
                  const isFavorite = favoriteIds.includes(product.id);
                  const quantity = cartItems[product.id] || 0;
                  const isSelected = selectedProductId === product.id;

                  return (
                    <div key={product.id}>
                      <motion.article
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.25 }}
                        className={`rounded-[1.5rem] border p-4 transition-colors duration-300 ${
                          isSelected
                            ? "border-gray-400 bg-white dark:border-white/30 dark:bg-white/10"
                            : "border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-white/5"
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white p-2 dark:bg-gray-950">
                            <img
                              src={productImages[product.id] || productImage4}
                              alt={product.name}
                              className="h-full w-full object-contain"
                            />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p className="text-xs font-medium uppercase tracking-[0.18em] text-gray-400">
                                  {product.category}
                                </p>
                                <h3 className="mt-1 font-semibold text-gray-950 dark:text-white">
                                  {product.name}
                                </h3>
                              </div>

                              <button
                                type="button"
                                onClick={() => toggleFavorite(product.id)}
                                className={`rounded-full border p-2 transition ${
                                  isFavorite
                                    ? "border-gray-950 bg-gray-950 text-white dark:border-white dark:bg-white dark:text-gray-950"
                                    : "border-gray-200 bg-white text-gray-500 hover:text-gray-950 dark:border-white/10 dark:bg-gray-950 dark:text-gray-400 dark:hover:text-white"
                                }`}
                                aria-label="Lưu sản phẩm yêu thích"
                              >
                                <Heart
                                  className="h-4 w-4"
                                  fill={isFavorite ? "currentColor" : "none"}
                                />
                              </button>
                            </div>

                            <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
                              {product.priceLabel}
                            </p>

                            <div className="mt-4 flex flex-wrap gap-2">
                              <button
                                type="button"
                                onClick={() => handleViewProduct(product.id)}
                                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition hover:-translate-y-0.5 ${
                                  isSelected
                                    ? "bg-gray-950 text-white dark:bg-white dark:text-gray-950"
                                    : "border border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:text-gray-950 dark:border-white/10 dark:bg-gray-950 dark:text-gray-300 dark:hover:border-white/20 dark:hover:text-white"
                                }`}
                              >
                                <Eye className="h-4 w-4" />
                                {isSelected ? "Đang xem" : "Xem"}
                              </button>

                              <button
                                type="button"
                                onClick={() => addToCart(product.id)}
                                className="inline-flex items-center gap-2 rounded-full bg-gray-950 px-4 py-2 text-xs font-semibold text-white transition hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-200"
                              >
                                <ShoppingBag className="h-4 w-4" />
                                Thêm vào giỏ
                              </button>

                              {quantity > 0 && (
                                <span className="inline-flex items-center rounded-full bg-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 dark:bg-white/10 dark:text-gray-200">
                                  x{quantity}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.article>

                      {isSelected && (
                        <div className="md:hidden">
                          <ProductPreview product={product} compact />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-gray-950">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
                  Giỏ hàng mini
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-gray-950 dark:text-white">
                  {cartList.length > 0
                    ? "Sản phẩm đã thêm"
                    : "Giỏ hàng đang trống"}
                </h3>
              </div>

              {cartList.length > 0 && (
                <button
                  type="button"
                  onClick={clearCart}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-white/10 dark:text-gray-300 dark:hover:border-red-400/20 dark:hover:bg-red-400/10 dark:hover:text-red-300"
                >
                  <Trash2 className="h-4 w-4" />
                  Xóa giỏ
                </button>
              )}
            </div>

            <div className="mt-5 space-y-3">
              {cartList.length === 0 ? (
                <p className="text-sm leading-7 text-gray-600 dark:text-gray-300">
                  Hãy bấm “Thêm vào giỏ” ở sản phẩm bất kỳ để gửi yêu cầu tư vấn
                  chi tiết hơn.
                </p>
              ) : (
                cartList.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-4 rounded-2xl bg-gray-50 p-4 dark:bg-white/5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="font-semibold text-gray-950 dark:text-white">
                        {item.name}
                      </p>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Số lượng: {item.quantity}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => decreaseCartItem(item.id)}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition hover:bg-gray-100 dark:border-white/10 dark:bg-gray-950 dark:text-gray-300 dark:hover:bg-white/10"
                        aria-label="Giảm số lượng"
                      >
                        <Minus className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => addToCart(item.id)}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-950 text-white transition hover:bg-gray-800 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-200"
                        aria-label="Tăng số lượng"
                      >
                        <Plus className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-white/10 dark:bg-gray-950 dark:text-gray-400 dark:hover:border-red-400/20 dark:hover:bg-red-400/10 dark:hover:text-red-300"
                        aria-label="Xóa sản phẩm khỏi giỏ"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-[2rem] border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-gray-950">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
              Yêu cầu tư vấn
            </p>

            <h3 className="mt-2 text-2xl font-semibold text-gray-950 dark:text-white">
              Nhận thông tin chi tiết hơn
            </h3>

            <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-300">
              Sau khi thêm sản phẩm vào giỏ, người dùng có thể gửi thông tin
              liên hệ để được tư vấn thêm.
            </p>

            <form onSubmit={handleConsultationSubmit} className="mt-5 space-y-4">
              <div>
                <input
                  name="name"
                  value={contactData.name}
                  onChange={handleContactChange}
                  disabled={isSubmittingConsultation}
                  placeholder="Họ và tên"
                  className={`w-full rounded-2xl border bg-white px-4 py-3 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 disabled:cursor-not-allowed disabled:bg-gray-50 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-500 dark:disabled:bg-white/5 ${
                    contactErrors.name
                      ? "border-red-300 dark:border-red-400/60"
                      : "border-gray-200 focus:border-gray-400 dark:border-white/10 dark:focus:border-white/30"
                  }`}
                />
                {contactErrors.name && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                    {contactErrors.name}
                  </p>
                )}
              </div>

              <div>
                <input
                  name="email"
                  value={contactData.email}
                  onChange={handleContactChange}
                  disabled={isSubmittingConsultation}
                  placeholder="Email"
                  className={`w-full rounded-2xl border bg-white px-4 py-3 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 disabled:cursor-not-allowed disabled:bg-gray-50 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-500 dark:disabled:bg-white/5 ${
                    contactErrors.email
                      ? "border-red-300 dark:border-red-400/60"
                      : "border-gray-200 focus:border-gray-400 dark:border-white/10 dark:focus:border-white/30"
                  }`}
                />
                {contactErrors.email && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                    {contactErrors.email}
                  </p>
                )}
              </div>

              <div>
                <input
                  name="phone"
                  value={contactData.phone}
                  onChange={handleContactChange}
                  disabled={isSubmittingConsultation}
                  placeholder="Số điện thoại, không bắt buộc"
                  className={`w-full rounded-2xl border bg-white px-4 py-3 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 disabled:cursor-not-allowed disabled:bg-gray-50 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-500 dark:disabled:bg-white/5 ${
                    contactErrors.phone
                      ? "border-red-300 dark:border-red-400/60"
                      : "border-gray-200 focus:border-gray-400 dark:border-white/10 dark:focus:border-white/30"
                  }`}
                />
                {contactErrors.phone && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                    {contactErrors.phone}
                  </p>
                )}
              </div>

              <textarea
                name="note"
                value={contactData.note}
                onChange={handleContactChange}
                disabled={isSubmittingConsultation}
                placeholder="Ghi chú thêm, ví dụ: Tôi muốn tư vấn về giá, ngày mở bán hoặc tính năng dịch thuật..."
                rows="4"
                className="w-full resize-none rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-gray-400 disabled:cursor-not-allowed disabled:bg-gray-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-white/30 dark:disabled:bg-white/5"
              />

              <button
                type="submit"
                disabled={isSubmittingConsultation || cartList.length === 0}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gray-950 px-5 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:hover:translate-y-0 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-200 dark:disabled:bg-gray-600 dark:disabled:text-gray-300"
              >
                {isSubmittingConsultation ? (
                  <>
                    Đang gửi...
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                  </>
                ) : (
                  <>
                    Gửi yêu cầu tư vấn
                    <Send className="h-4 w-4" />
                  </>
                )}
              </button>

              {consultationStatus === "success" && (
                <div className="flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm leading-6 text-green-700 dark:border-green-400/20 dark:bg-green-400/10 dark:text-green-300">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                  <p>{consultationMessage}</p>
                </div>
              )}

              {consultationStatus === "error" && (
                <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700 dark:border-red-400/20 dark:bg-red-400/10 dark:text-red-300">
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                  <p>{consultationMessage}</p>
                </div>
              )}
            </form>
          </div>
        </div>

        <div className="mt-8 rounded-[2rem] border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-gray-950">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
            Đã xem gần đây
          </p>

          <h3 className="mt-2 text-2xl font-semibold text-gray-950 dark:text-white">
            Lịch sử xem sản phẩm
          </h3>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {recentlyViewedProducts.length === 0 ? (
              <p className="text-sm leading-7 text-gray-600 dark:text-gray-300">
                Bấm nút “Xem” ở một sản phẩm để lưu vào danh sách đã xem.
              </p>
            ) : (
              recentlyViewedProducts.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => handleViewProduct(product.id)}
                  className="flex w-full items-center gap-3 rounded-2xl bg-gray-50 p-3 text-left transition hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white p-2 dark:bg-gray-950">
                    <img
                      src={productImages[product.id] || productImage4}
                      alt={product.name}
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-950 dark:text-white">
                      {product.name}
                    </p>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {product.category}
                    </p>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MiniCommerce;