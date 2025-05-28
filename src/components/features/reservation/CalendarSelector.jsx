import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CalendarSelector = ({ selectedDate, onChange }) => {
  // 일요일 제외
  const isWeekday = date => {
    const day = date.getDay();
    return day !== 0; // 0 = Sunday
  };

  // 다음달까지만 가능
  const maxSelectableDate = new Date();
  maxSelectableDate.setMonth(maxSelectableDate.getMonth() + 2);

  return (
    <div className="w-full max-w-sm mx-auto">
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        minDate={new Date()}
        maxDate={maxSelectableDate}
        filterDate={isWeekday}
        dateFormat="yyyy-MM-dd"
        inline
        className="w-full"
      />
    </div>
  );
};

export default CalendarSelector;
