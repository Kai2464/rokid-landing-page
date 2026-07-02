export function validateName(name) {
  const trimmedName = name.trim();

  if (!trimmedName) {
    return "Vui lòng nhập họ và tên.";
  }

  if (trimmedName.length < 2) {
    return "Họ và tên phải có ít nhất 2 ký tự.";
  }

  return "";
}

export function validateEmail(email) {
  const trimmedEmail = email.trim();

  if (!trimmedEmail) {
    return "Vui lòng nhập email.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(trimmedEmail)) {
    return "Email chưa đúng định dạng. Ví dụ: name@example.com";
  }

  return "";
}

export function validateNewsletterForm(formData) {
  const errors = {
    name: validateName(formData.name),
    email: validateEmail(formData.email),
  };

  const isValid = !errors.name && !errors.email;

  return {
    isValid,
    errors,
  };
}