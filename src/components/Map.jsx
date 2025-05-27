import { useEffect } from "react";

export default function Map() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=d4df265c234a6cb0e0f1fd95b9a82f6a&autoload=false`;
    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(37.500613, 127.036431), // 병원 위치 좌표
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);

        const marker = new window.kakao.maps.Marker({
          position: options.center,
        });
        marker.setMap(map);
      });
    };
    document.head.appendChild(script);
  }, []);

  return <div id="map" className="w-full h-[400px] rounded-lg shadow-md" />;
}
