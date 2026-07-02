const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

function getWeb3FormsAccessKey() {
  return import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
}

function isMissingAccessKey(accessKey) {
  return (
    !accessKey ||
    accessKey === "PASTE_YOUR_WEB3FORMS_ACCESS_KEY_HERE" ||
    accessKey === "your_web3forms_access_key_here" ||
    accessKey === "KEY_WEB3FORMS_THAT_CUA_BAN"
  );
}

export async function submitNewsletterForm(formData) {
  const accessKey = getWeb3FormsAccessKey();

  if (isMissingAccessKey(accessKey)) {
    return {
      success: false,
      message:
        "Thiếu Web3Forms access key. Hãy kiểm tra file .env.local ở thư mục gốc project, lưu file và khởi động lại dev server.",
    };
  }

  const payload = {
    access_key: accessKey,
    subject: "Đăng ký nhận tin Rokid Glasses",
    from_name: "Rokid Glasses Landing Page",
    name: formData.name.trim(),
    email: formData.email.trim(),
    message: `Người dùng ${formData.name.trim()} muốn nhận tin về Rokid Glasses.`,
  };

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      return {
        success: false,
        message:
          result.message ||
          "Gửi form thất bại. Vui lòng kiểm tra lại Web3Forms access key.",
      };
    }

    return {
      success: true,
      message:
        "Đăng ký thành công. Thông tin của bạn đã được gửi tới email nhận form.",
    };
  } catch {
    return {
      success: false,
      message:
        "Không thể kết nối tới Web3Forms. Hãy kiểm tra internet hoặc thử lại sau.",
    };
  }
}

export async function submitCartConsultation({ contactData, cartList }) {
  const accessKey = getWeb3FormsAccessKey();

  if (isMissingAccessKey(accessKey)) {
    return {
      success: false,
      message:
        "Thiếu Web3Forms access key. Hãy kiểm tra file .env.local ở thư mục gốc project, lưu file và khởi động lại dev server.",
    };
  }

  if (!cartList.length) {
    return {
      success: false,
      message: "Giỏ hàng đang trống. Hãy thêm sản phẩm trước khi gửi tư vấn.",
    };
  }

  const cartSummary = cartList
    .map((item, index) => {
      return `${index + 1}. ${item.name} - Số lượng: ${item.quantity} - Loại: ${
        item.category
      } - Giá/ghi chú: ${item.priceLabel}`;
    })
    .join("\n");

  const payload = {
    access_key: accessKey,
    subject: "Yêu cầu tư vấn sản phẩm Rokid Glasses",
    from_name: "Rokid Glasses Landing Page",
    name: contactData.name.trim(),
    email: contactData.email.trim(),
    phone: contactData.phone.trim() || "Không cung cấp",
    message: `
Người dùng muốn được tư vấn chi tiết hơn về các sản phẩm trong giỏ hàng.

Thông tin liên hệ:
- Họ và tên: ${contactData.name.trim()}
- Email: ${contactData.email.trim()}
- Số điện thoại: ${contactData.phone.trim() || "Không cung cấp"}

Sản phẩm đã chọn:
${cartSummary}

Ghi chú của người dùng:
${contactData.note.trim() || "Không có ghi chú."}
    `.trim(),
  };

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      return {
        success: false,
        message:
          result.message ||
          "Gửi yêu cầu tư vấn thất bại. Vui lòng kiểm tra Web3Forms access key.",
      };
    }

    return {
      success: true,
      message:
        "Gửi yêu cầu tư vấn thành công. Danh sách sản phẩm đã được gửi tới email nhận form.",
    };
  } catch {
    return {
      success: false,
      message:
        "Không thể kết nối tới Web3Forms. Hãy kiểm tra internet hoặc thử lại sau.",
    };
  }
}