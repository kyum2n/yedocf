import { useState, useRef, useEffect } from "react";
import classNames from "classnames";

const Dropdown = ({
  options = [],
  onSelect,
  placeholder = "항목을 선택하세요",
  forcePlaceholder = false,               // ✅ 새 prop
  className = "",
  maxHeight = "max-h-60",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const dropdownRef = useRef(null);

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 배열 아니면 경고
  useEffect(() => {
    if (!Array.isArray(options)) {
      console.warn("[Dropdown 경고] options prop이 배열이 아닙니다. 현재 값:", options);
    }
  }, [options]);

  const handleSelect = (option) => {
    setSelected(option);
    onSelect?.({ target: { value: option.value } }); // HTML select 유사
    setIsOpen(false);
  };

  return (
    <div className={classNames("relative w-full", className)} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full border border-gray-300 rounded-md bg-white px-4 py-2 text-left shadow-sm hover:border-black flex justify-between items-center"
      >
        <span>
          {forcePlaceholder
            ? placeholder
            : selected?.label || placeholder}
        </span>
        <svg
          className={`w-4 h-4 ml-2 text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && Array.isArray(options) && (
        <ul
          className={classNames(
            "absolute z-10 mt-1 w-full border border-gray-300 rounded-md bg-white shadow-lg overflow-y-auto",
            maxHeight,
            "scrollbar-thin scrollbar-thumb-gray-300 scrollbar-thumb-rounded"
          )}
        >
          {options.map((option, idx) => (
            <li
              key={idx}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
