import { useState, useRef, useEffect } from "react";
import classNames from "classnames";

const Dropdown = ({
  options = [],
  onSelect,
  placeholder = "선택하세요",
  className = "",
  maxHeight = "max-h-60", // Tailwind 기준
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const dropdownRef = useRef(null);

  const handleSelect = (option) => {
    setSelected(option);
    onSelect?.(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={classNames("relative w-full", className)} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full border border-gray-300 rounded-md bg-white px-4 py-2 text-left shadow-sm hover:border-black"
      >
        {selected || placeholder}
      </button>

      {isOpen && (
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
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
