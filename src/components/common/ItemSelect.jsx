const ItemSelect = ({ label, value, onChange, options }) => {
  return (
    <div className="space-y-2">
      {label && <label className="text-sm">{label}</label>}
      <select
        value={value}
        onChange={onChange}
        className="w-full border px-3 py-2 rounded-md"
      >
        <option value="">항목을 선택하세요</option>
        {Object.entries(options).map(([key, text]) => (
          <option key={key} value={key}>
            {text}
          </option>
        ))}
      </select>
    </div>
  );
};
export default ItemSelect;