function Button({
  children,
  href,
  variant = "primary",
  className = "",
  ...props
}) {
  const baseClass =
    "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 dark:focus:ring-white dark:focus:ring-offset-gray-950";

  const variants = {
    primary:
      "bg-gray-950 text-white shadow-lg shadow-gray-950/20 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-gray-950 dark:shadow-white/10 dark:hover:bg-gray-200",
    secondary:
      "border border-gray-200 bg-white text-gray-950 hover:-translate-y-0.5 hover:border-gray-300 hover:bg-gray-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-white/20 dark:hover:bg-white/10",
    ghost:
      "text-gray-700 hover:bg-gray-100 hover:text-gray-950 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white",
  };

  const classes = `${baseClass} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

export default Button;