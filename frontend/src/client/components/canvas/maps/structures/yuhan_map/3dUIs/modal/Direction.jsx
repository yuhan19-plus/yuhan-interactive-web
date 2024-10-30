import { Html } from '@react-three/drei';
import React, { useEffect, useState } from 'react';
import { Subway, DirectionsBus, DirectionsCar, LocalParking } from '@mui/icons-material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { kakaoApiKey } from '../../../../../../../../appkey';
import styled from 'styled-components';

const Direction = ({ position }) => {
    const [openSection, setOpenSection] = useState(null); // 열려 있는 섹션을 관리하는 상태
    const [mapSize, setMapSize] = useState({ width: "450px", height: "450px" });

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
        <Html position={position} center
            // 모든 마우스 이벤트에서 전파 차단
            onPointerDown={(e) => e.stopPropagation()}
            onPointerMove={(e) => e.stopPropagation()}
            onPointerUp={(e) => e.stopPropagation()}
        >
            <DirectionWrapper>
                <div
                    id="map"
                    style={{ width: mapSize.width, height: mapSize.height }}
                    onPointerUp={(e) => {
                        // 마우스가 지도 내에서 올라오면 이벤트를 막음
                        if (e.currentTarget.id === 'map') {
                            console.log("마우스가 지도내부에서 떨어짐");
                            e.stopPropagation();  // 이벤트 전파 중단
                        }
                    }}
                    onPointerDown={(e) => e.stopPropagation()} // 클릭 이벤트 전파 차단
                    onPointerMove={(e) => e.stopPropagation()}  // 드래그 이벤트 전파 차단
                ></div>
                <DirectionContainer>
                    <DirectionTitle>
                        <p>찾아오시는 길</p>
                    </DirectionTitle>
                    <DirectionContent>
                        <p>주소: 경기도 부천시 경인로 590</p>
                        
                        <DirectionContentTitle onClick={() => toggleDropdown('subway')}>
                            <Subway />
                            <p>지하철 타고 오실 때</p>
                        </DirectionContentTitle>
                        {openSection === 'subway' && (
                            <DirectionContentList>
                                <DirectionContentItem>
                                    <ArrowRightIcon />
                                    1호선, 7호선 (온수역 하차 ①,②번 출구- 도보로 10분거리)
                                </DirectionContentItem>
                                <DirectionContentItem>
                                    <ArrowRightIcon />
                                    1호선 (역곡역 하차 ①번 출구- 도보로 10분거리)
                                </DirectionContentItem>
                                <DirectionContentItem>
                                    <ArrowRightIcon />
                                    서해선(소사역 하차 ⑤번 출구 - 83번, 88번 버스환승, 정문하차)
                                </DirectionContentItem>
                            </DirectionContentList>
                        )}

                        {/* 버스 타고 오실 때 (드롭다운) */}
                        <DirectionContentTitle onClick={() => toggleDropdown('bus')}>
                            <DirectionsBus />
                            <p>버스 타고 오실 때 (유한대학교 하차)</p>
                        </DirectionContentTitle>
                        {openSection === 'bus' && (
                            <DirectionContentList>
                                <DirectionContentItem>
                                    <ArrowRightIcon />
                                    부천시내버스 : 10번, 12번, 52번, 57번, 57-1번, 75번, 83번, 88번
                                </DirectionContentItem>
                                <DirectionContentItem>
                                    <ArrowRightIcon />
                                    서울시내버스 : 6614번
                                </DirectionContentItem>
                            </DirectionContentList>
                        )}

                        {/* 승용차 타고 오실 때 (드롭다운) */}
                        <DirectionContentTitle onClick={() => toggleDropdown('car')}>
                            <DirectionsCar />
                            <p>승용차 타고 오실 때</p>
                        </DirectionContentTitle>
                        {openSection === 'car' && (
                            <DirectionContentList>
                                <DirectionContentItem>
                                    <ArrowRightIcon />
                                    남부순환도로 이용 시 : 오류IC에서 부천방향으로 나와서 약 3KM(경인국도변 좌측)
                                </DirectionContentItem>
                                <DirectionContentItem>
                                    <ArrowRightIcon />
                                    경인국도 이용 시 : 서울방향 - 인천, 부천방향으로 동부제강 지나서 약1.5KM (경인국도변 좌측)
                                </DirectionContentItem>
                                <DirectionContentItem>
                                    <ArrowRightIcon />
                                    서울외곽고속도로 이용 시 : 시흥IC에서 부천방향으로 빠져 고개넘어 범박동방향으로 우회전 후 직진 온수 사거리우회전 100M
                                </DirectionContentItem>
                            </DirectionContentList>
                        )}

                        {/* 주차 안내 (드롭다운) */}
                        <DirectionContentTitle onClick={() => toggleDropdown('parking')}>
                            <LocalParking  />
                            <p>주차안내</p>
                        </DirectionContentTitle>
                        {openSection === 'parking' && (
                            <DirectionContentItem>
                                본 대학의 주차장은 교직원 및 학생, 방문객의 입출입 시 불편함을 없애고 편안한 방문을 위해 무료로 이용할 수 있는 공간입니다.
                            </DirectionContentItem>
                        )}
                    </DirectionContent>
                </DirectionContainer>
            </DirectionWrapper>
        </Html>
    );
};

const DirectionWrapper = styled.div`
    border-radius: 1.3rem;
    box-shadow: 0px 0px 10px rgba(177, 138, 138, 0.5);
    overflow: hidden;
`

const DirectionContainer = styled.div`
    width: 100%;
    height: 100%;
    background-color: var(--sub-color);
    padding: 1rem;
`

const DirectionTitle = styled.div`
    font-size: 1.3rem;
    font-weight: 900;
`

const DirectionContent = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`

const DirectionContentTitle = styled.div`
    display: flex;
    align-items: center;
    font-weight: 900;

    p {
        font-size: 1rem;
        color: var(--main-color);
        cursor: pointer;
    }

    svg {
        color: var(--main-color);
        margin-right: 0.5rem;
    }
`

const DirectionContentList = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    color: var(--main-color);
`

const DirectionContentItem = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 0.3rem;
`

export default Direction;
