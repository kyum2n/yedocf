// components/common/Button.jsx
const VARIANT_STYLES = {
  primary: 'bg-black text-white border border-black hover:bg-gray-800',
  secondary: 'bg-white text-black border border-black hover:bg-gray-100',
  danger: 'bg-red-500 text-white border border-red-500 hover:bg-red-600',
  ghost: 'bg-transparent text-black border border-transparent hover:bg-gray-100',
};

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
  ...rest
}) => {
  const variantClass = VARIANT_STYLES[variant] || VARIANT_STYLES.primary;

  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded transition ${variantClass} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
