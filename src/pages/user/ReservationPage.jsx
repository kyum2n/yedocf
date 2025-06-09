import { useState, useEffect } from "react";
import CalendarSelector from "@/components/features/reservation/CalendarSelector";
import TimeSelector from "@/components/features/reservation/TimeSelector";
import axios from "axios";
import Dropdown from "@/components/common/Dropdown";
import Button from "@/components/common/Button";
import BannerSection from "@/components/common/BannerSection";
import Spacer from "@/components/common/Spacer";
import { banner4 } from '@/assets/images';
import { useNavigate } from 'react-router-dom';

const ReservationPage = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState("");
    const [selectedItem, setSelectedItem] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [disabledTimes, setDisabledTimes] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const uId = localStorage.getItem('uId');

        if (!token || !uId || token === "null") {
            alert("로그인이 필요합니다. 다시 로그인해주세요.");
            console.error("토큰 또는 uId 없음");
            navigate('/login');
            return;
        }

        if (selectedDate) {
            const dateStr = selectedDate.toISOString().split("T")[0];

            console.log("보내는 토큰:", token);
            axios
                .get(`/api/reserve/disabled-times`, {
                    params: { consultDate: dateStr },
                    // headers: {
                    //     Authorization: `Bearer ${token}`,
                    // },
                })
                .then((res) => {
                    const trimmed = res.data.map(time => time.slice(0, 5));
                    setDisabledTimes(trimmed);
                })
                .catch((err) => {
                    console.error("예약된 시간 조회 실패:", err);
                });
        } else {
            setDisabledTimes([]);
        }
    }, [selectedDate, navigate]);

    const handleSubmit = async () => {
        console.log("예약 버튼 클릭됨");

        if (!selectedDate || !selectedTime || !selectedItem) {
            alert("모든 항목을 선택해주세요.");
            console.warn("⚠️ 선택되지 않은 항목 있음:", {
                selectedDate,
                selectedTime,
                selectedItem,
            });
            return;
        }

        const token = localStorage.getItem('accessToken');
        const uId = localStorage.getItem('uId');

        console.log("accessToken:\n" + token);

        console.log("로컬스토리지 값:", { token, uId });

        const itemMap = {
            eye: "눈 성형",
            nose: "코 성형",
            chin: "윤곽"
        };

        const data = {
            uId,
            tName: itemMap[selectedItem],
            consultDate: selectedDate.toLocaleDateString("sv-SE"),
            consultTime: selectedTime,
            status: "대기",
        };

        console.log("서버로 전송할 예약 데이터:", data);

        try {
            setIsLoading(true);
            const response = await axios.post(
                "http://localhost:8080/api/reserve",
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert("예약이 완료되었습니다!");
            console.log("예약 성공:", response.data);
            setSelectedDate(null);
            setSelectedTime("");
            setSelectedItem("");
        } catch (error) {
            console.error("예약 실패:", error);
            console.log("error.response:", error.response);
            alert("예약에 실패했습니다.");
        } finally {
            setIsLoading(false);
        }
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
                            onChange={(date) => {
                                console.log("날짜 선택됨:", date);
                                setSelectedDate(date);
                            }}
                        />
                        <TimeSelector
                            selectedDate={selectedDate}
                            selectedTime={selectedTime}
                            onSelect={(time) => {
                                console.log("시간 선택됨:", time);
                                setSelectedTime(time);
                            }}
                            disabledTimes={disabledTimes}
                        />
                    </div>

                    {/* 예약 항목 선택 */}
                    <div className="flex-1 flex flex-col gap-4">
                        <Dropdown
                            value={selectedItem}
                            onSelect={(e) => {
                                console.log("항목 선택됨:", e.target.value);
                                setSelectedItem(e.target.value);
                            }}
                            options={[
                                { value: "", label: "항목을 선택해주세요" },
                                { value: "eye", label: "눈 성형" },
                                { value: "nose", label: "코 성형" },
                                { value: "chin", label: "윤곽" },
                            ]}
                        />

                        <Button
                            variant="primary"
                            onClick={handleSubmit}
                            size="lg"
                            className="mt-4"
                            disabled={isLoading || !selectedDate || !selectedTime || !selectedItem}
                        >
                            {isLoading ? "예약 중..." : "예약하기"}
                        </Button>
                    </div>
                </div>
                <Spacer size="lg" />
            </div>
        </div>
    );
};

export default ReservationPage;
