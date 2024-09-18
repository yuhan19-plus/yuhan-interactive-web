import { Html } from '@react-three/drei';
import React, { useEffect } from 'react';

const Direction = ({ position }) => {
    const apiKey = "";

    // 카카오 API 호출
    useEffect(() => {
        const script = document.createElement("script");
        script.async = true;
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
        document.head.appendChild(script);

        script.addEventListener("load", () => {
            window.kakao.maps.load(() => {
                const container = document.getElementById("map");
                const options = {
                    center: new window.kakao.maps.LatLng(37.48739055919013, 126.82153701782227), // 초기 중심 좌표 (위도, 경도)
                    level: 3, // 지도 확대 레벨
                };
                new window.kakao.maps.Map(container, options);
            });
        });
    }, []);

    return (
        // Html 컴포넌트를 3D 공간의 특정 좌표에 고정
        <Html position={position} center>
            <div id="map" style={{ width: "500px", height: "400px" }}></div>
            <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)' }}>
                <h3>찾아오는 길</h3>
                <p>주소: 서울특별시...</p>
                <p>버스 노선: 101번, 102번...</p>
                <p>지하철: 1호선...</p>
            </div>
        </Html>
    );
};

export default Direction;
