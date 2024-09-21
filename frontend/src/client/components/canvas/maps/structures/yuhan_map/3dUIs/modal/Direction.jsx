import { Html } from '@react-three/drei';
import React, { useEffect, useState } from 'react';
import { kakaoApiKey } from './appkey';

const Direction = ({ position }) => {
    const [openSection, setOpenSection] = useState(null); // 열려 있는 섹션을 관리하는 상태
    const [mapSize, setMapSize] = useState({ width: "450px", height: "450px" }); // 동적으로 변경될 지도 크기

    // 카카오 API 호출
    useEffect(() => {
        const script = document.createElement("script");
        script.async = true;
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoApiKey}&autoload=false`;
        document.head.appendChild(script);

        script.addEventListener("load", () => {
            window.kakao.maps.load(() => {
                const container = document.getElementById("map");
                const options = {
                    center: new window.kakao.maps.LatLng(37.4873905592000, 126.82153701782227), // 초기 중심 좌표 (위도, 경도)
                    level: 3, // 지도 확대 레벨
                };
                new window.kakao.maps.Map(container, options);
            });
        });

        // 윈도우 크기에 따라 지도의 크기 변경
        const handleResize = () => {
            const width = window.innerWidth * 0.3 + "px"; // 창 너비의 30%
            const height = window.innerHeight * 0.3 + "px"; // 창 높이의 30%
            setMapSize({ width, height });
        };

        // 리스너 등록
        window.addEventListener("resize", handleResize);

        // 초기 크기 설정
        handleResize();

        // 컴포넌트 언마운트 시 리스너 제거
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // 클릭 시 열리거나 닫히도록 상태를 관리하는 함수
    const toggleDropdown = (section) => {
        if (openSection === section) {
            setOpenSection(null); // 이미 열려 있는 섹션을 다시 클릭하면 닫음
        } else {
            setOpenSection(section); // 다른 섹션을 클릭하면 해당 섹션을 열고 나머지는 닫음
        }
    };

    return (
        <Html position={position} center >
            <div style={{ borderRadius: '20px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)', overflow: 'hidden' }}>
                <div id="map" style={{ width: mapSize.width, height: mapSize.height }}
                    onPointerUp={(e) => {
                        // 마우스가 지도 내에서 올라오면 이벤트를 막음
                        if (e.currentTarget.id === 'map') {
                            console.log("마우스가 지도내부에서 떨어짐");
                            e.stopPropagation();  // 이벤트 전파 중단
                        }
                    }}
                ></div>
                <div style={{ backgroundColor: 'white', padding: '10px' }}>
                    <h3>찾아오시는 길</h3>
                    <p>주소: 경기도 부천시 경인로 590</p>

                    {/* 지하철 타고 오실 때 (드롭다운) */}
                    <p
                        style={{ cursor: 'pointer', color: 'blue' }}
                        onClick={() => toggleDropdown('subway')}
                    >
                        <strong>지하철 타고 오실 때</strong>
                    </p>
                    {openSection === 'subway' && (
                        <ul>
                            <li>1호선, 7호선 (온수역 하차 ①,②번 출구- 도보로 10분거리)</li>
                            <li>1호선 (역곡역 하차 ①번 출구- 도보로 10분거리)</li>
                            <li>서해선(소사역 하차 ⑤번 출구 - 83번, 88번 버스환승, 정문하차)</li>
                        </ul>
                    )}

                    {/* 버스 타고 오실 때 (드롭다운) */}
                    <p
                        style={{ cursor: 'pointer', color: 'blue' }}
                        onClick={() => toggleDropdown('bus')}
                    >
                        <strong>버스 타고 오실 때 (유한대학교 하차)</strong>
                    </p>
                    {openSection === 'bus' && (
                        <ul>
                            <li>부천시내버스 : 10번, 12번, 52번, 57번, 57-1번, 75번, 83번, 88번</li>
                            <li>서울시내버스 : 6614번</li>
                        </ul>
                    )}

                    {/* 승용차 타고 오실 때 (드롭다운) */}
                    <p
                        style={{ cursor: 'pointer', color: 'blue' }}
                        onClick={() => toggleDropdown('car')}
                    >
                        <strong>승용차 타고 오실 때</strong>
                    </p>
                    {openSection === 'car' && (
                        <ul>
                            <li>남부순환도로 이용 시 : 오류IC에서 부천방향으로 나와서 약 3KM(경인국도변 좌측)</li>
                            <li>경인국도 이용 시 : 서울방향 - 인천, 부천방향으로 동부제강 지나서 약1.5KM (경인국도변 좌측)</li>
                            <li>서울외곽고속도로 이용 시 : 시흥IC에서 부천방향으로 빠져 고개넘어 범박동방향으로 우회전 후 직진 온수 사거리우회전 100M</li>
                        </ul>
                    )}

                    {/* 주차 안내 (드롭다운) */}
                    <p
                        style={{ cursor: 'pointer', color: 'blue' }}
                        onClick={() => toggleDropdown('parking')}
                    >
                        <strong>주차안내</strong>
                    </p>
                    {openSection === 'parking' && (
                        <p>
                            본 대학의 주차장은 교직원 및 학생, 방문객의 입출입 시 불편함을 없애고 편안한 방문을 위해 무료로 이용할 수 있는 공간입니다.
                        </p>
                    )}
                </div>
            </div>
        </Html>
    );
};

export default Direction;
