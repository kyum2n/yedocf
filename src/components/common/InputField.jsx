import classNames from "classnames";

const InputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  variant = "user",
  labelHidden = true,   // 라벨 숨김
  className = "",
}) => {
  const baseClass =
    "w-full focus:outline-none placeholder-gray-400 h-auto";
  const styleByVariant = {
    user: "border-0 border-b-2 border-gray-400 focus:border-black bg-transparent",
    admin: "border border-gray-300 rounded-md focus:border-blue-500 bg-white",
  };
  const inputClass = classNames(baseClass, styleByVariant[variant], className);

  return (
  <div className={classNames("relative", className)}>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={inputClass}
    />
    {label && !labelHidden && (
      <label
        className={classNames(
          "text-sm text-gray-500",
          {
            "absolute left-0 -top-5": variant === "user",
            "block mb-1": variant === "admin",
          }
        )}
      >
        {label}
      </label>
    )}
  </div>
  );
};


export default InputField;
