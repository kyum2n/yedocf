import { useState } from "react";
import CalendarSelector from "@/components/features/reservation/CalendarSelector";
import TimeSelector from "@/components/features/reservation/TimeSelector";
import ItemSelect from "@/components/common/ItemSelect";
import Button from "@/components/common/Button";
import BannerSection from "@/components/common/BannerSection";
import Spacer from "@/components/common/Spacer";
import { banner4 } from '@/assets/images';

const ReservationPage = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState("");
    const [selectedItem, setSelectedItem] = useState("");

    const handleSubmit = () => {
        if (!selectedDate || !selectedTime || !selectedItem) {
            alert("모든 항목을 선택해주세요.");
            return;
        }
        // TODO: 백엔드 연동 로직
        console.log("예약 정보:", { selectedDate, selectedTime, selectedItem });
    };

    return (
        <div className="space-y-8">
            <BannerSection image={banner4} title="상담 예약" subtitle="" objectPosition="object-[50%_30%]" />
            <div className="relative z-20 bg-white">

                <Spacer />
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-6 p-6">
                    {/* 날짜/시간 선택 */}
                    <div className="border rounded-lg p-4 flex-1 space-y-4">
                        <CalendarSelector
                            selectedDate={selectedDate}
                            onChange={setSelectedDate}
                        />
                        <TimeSelector
                            selectedDate={selectedDate}
                            selectedTime={selectedTime}
                            onSelect={setSelectedTime}
                        />
                    </div>

                    {/* 예약 항목 선택 */}
                    <div className="flex-1 flex flex-col gap-4">
                        <ItemSelect
                            label="예약 항목"
                            value={selectedItem}
                            onChange={(e) => setSelectedItem(e.target.value)}
                            options={{
                                eye: "눈 성형",
                                nose: "코 성형",
                                chin: "윤곽",
                            }}
                        />

                        <Button variant="primary" onClick={handleSubmit}>
                            예약하기
                        </Button>
                    </div>
                </div>
                <Spacer size="lg" />
            </div>
        </div>
    );
};

export default ReservationPage;
