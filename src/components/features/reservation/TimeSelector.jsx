import React from "react";

const weekdayHours = [
  "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30"
];

const saturdayHours = [
  "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30"
];

const getTimeSlotsByDay = (date) => {
  const day = new Date(date).getDay(); // 0 = 일, 6 = 토
  return day === 6 ? saturdayHours : weekdayHours;
};

const TimeSelector = ({ selectedDate, selectedTime, onSelect, disabledTimes = [] }) => {
  if (!selectedDate) {
    return (
      <p className="text-center text-gray-500 text-sm">
        먼저 날짜를 선택해주세요.
      </p>
    );
  }

  const timeSlots = getTimeSlotsByDay(selectedDate);

  return (
    <div className="grid grid-cols-3 gap-2">
      {timeSlots.map((time) => {
        const isDisabled = disabledTimes.includes(time);
        const isSelected = selectedTime === time;

        return (
          <button
            key={time}
            onClick={() => !isDisabled && onSelect(time)}
            className={`px-3 py-2 border rounded transition-all
              ${isDisabled ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "hover:bg-gray-400"}
              ${isSelected ? "bg-black text-white" : ""}`}
            disabled={isDisabled}
          >
            {time}
          </button>
        );
      })}
    </div>
  );
};

export default TimeSelector;
