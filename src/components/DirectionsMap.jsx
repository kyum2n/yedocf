import Map from './Map';

const DirectionsMap = () => {
    return (
        <section className="flex flex-col md:flex-row gap-8 p-8 max-w-6xl mx-auto">
            <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-seoul font-extrabold mb-4">오시는 길</h2>
                <p className="mb-4">연세시 연세구 연세로 123 (연세동) 연세빌딩 99층</p>
                <h3 className="font-semibold">진료 안내</h3>
                <ul className="mb-4">
                    <li>월–금: 10:00 ~ 18:00</li>
                    <li>토요일: 10:00 ~ 13:00</li>
                    <li>일요일/공휴일: 휴무</li>
                </ul>
                <p className="mb-1 font-semibold">TEL</p>
                <p className="mb-4">010-123-1231</p>
                <p className="text-sm text-gray-500">
                    지하철 100호선 연세역 12번 출구 도보 3분<br />
                    버스: 9999, 8888, 7777, 6666 외<br />
                    차량은 건물 내 주차 가능
                </p>
            </div>

            <div className="flex-1 min-w-0 max-w-[600px]">
                <Map />
            </div>
        </section>
    );
}

export default DirectionsMap;