import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useMemo } from 'react';
import React from 'react';
import ko from 'date-fns/locale/ko'; // 한국어 로케일

const CalendarSelector = ({ selectedDate, onChange }) => {
  // 제외할 요일들 (예: 일요일만 제외)
  const excludedDays = [0]; // 0: Sunday

  // 요일 필터링 함수
  const isSelectableDay = (date) => {
    const day = date.getDay();
    return !excludedDays.includes(day);
  };

  // 최대 선택 가능 날짜 (오늘부터 2개월 뒤)
  const maxSelectableDate = useMemo(() => {
    const date = new Date();
    date.setMonth(date.getMonth() + 2);
    return date;
  }, []);

  return (
    <div className="w-full mx-auto">
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        locale={ko}
        minDate={new Date()}
        maxDate={maxSelectableDate}
        filterDate={isSelectableDay}
        inline
        calendarClassName="w-full text-sm"
        dayClassName={(date) =>
          `w-10 h-10 flex-center 
   ${date.toDateString() === selectedDate?.toDateString()
            ? 'bg-orange-400 text-white font-bold'
            : 'hover:bg-orange-100'}`
        }
      />
    </div>
  );
};

export default CalendarSelector;
