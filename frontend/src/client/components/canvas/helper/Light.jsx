/** 파일생성자 : 임성준
 * Light 설정을 위한 Helper 셋팅 및 Light 설정 (24/08/02)
 * 오자현 : 해, 달, 별 적용
 * - 해와 달과 별배치, 각 시간대별 css 적용, 빛의 위치 및 강도 적용 (24/08/29)
 */
import { Sky, Stars, useHelper } from '@react-three/drei'
import React, { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
// 해
import { Sun } from '../maps/structures/yuhan_map/elements/etc/Sun'
// 달
import { Moon } from '../maps/structures/yuhan_map/elements/etc/Moon'

const Light = () => {
    const lightRef = useRef(null)
    const [lightPos, setLightPos] = useState([0, 0, 0]);
    const [lightIntensity, setLightIntensity] = useState(0); // 초기 강도는 0 (빛 없음)
    const today = new Date();
    const [NowHour, setNowHour] = useState(today.getHours()); // today.getHours() 대신 원하는 시간 입력 가능
    const [objectPosition, setObjectPosition] = useState([0, 0, 0]);

    // 시간대별 위치값확인을 위한 test코드
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setNowHour((prevHours) => (prevHours + 1) % 24); // 1시간씩 증가, 24시(자정) 이후로는 0시로 돌아감
    //     }, 500); // 1초에 1시간씩 증가

    //     return () => clearInterval(interval); // 컴포넌트 언마운트 시 타이머 제거
    // }, []);

    // 디버깅 용도의 콘솔로그
    // useEffect(() => {
    //     console.log("현재시간 ", NowHour);
    //     console.log("현재밝기", lightIntensity);
    // }, [NowHour]); // NowHour가 변경될 때마다 실행


    useEffect(() => {
        let targetPos;
        let targetIntensity = 0;
        let backgroundStyles = `
            linear-gradient(rgb(0, 0, 0), transparent),
            linear-gradient(to top left, rgb(0, 0, 0), transparent),
            linear-gradient(to top right, rgb(0, 0, 0), transparent)
        `; // 기본 배경 (밤)

        if (NowHour >= 7 && NowHour < 12) {
            targetPos = [250, 500, 500];
            setObjectPosition([186.75, 373.50, 373.50]); // 상태 업데이트
            targetIntensity = 1.5;
            backgroundStyles = `
                linear-gradient(rgb(88, 103, 212), transparent),
                linear-gradient(to top left, rgb(102, 141, 233), transparent),
                linear-gradient(to top right, rgb(254, 229, 148), transparent)
            `; // 아침 배경
        } else if (NowHour >= 12 && NowHour <= 17) {
            targetPos = [0, 700, 0];
            setObjectPosition([0, 500, 0]); // 상태 업데이트
            targetIntensity = 5;
            backgroundStyles = `
                linear-gradient(rgb(2, 125, 204), transparent),
                linear-gradient(to top left, rgb(67, 149, 220), transparent),
                linear-gradient(to top right, rgb(190, 225, 254), transparent)
            `; // 정오 배경
        } else if (NowHour > 17 && NowHour < 20) {
            targetPos = [-250, 500, -500];
            setObjectPosition([-186.75, 373.50, -373.50]); // 상태 업데이트
            targetIntensity = 2.5;
            backgroundStyles = `
                linear-gradient(rgb(85, 70, 200), transparent),
                linear-gradient(to top left, rgb(220, 105, 100), transparent),
                linear-gradient(to top right, rgb(240, 55, 25), transparent)
            `; // 저녁 배경
        } else {
            targetPos = [-250, 500, -500];
            setObjectPosition([-186.75, 373.50, -373.50]); // 상태 업데이트
            targetIntensity = 1;
            backgroundStyles = `
                linear-gradient(rgb(0, 0, 50), transparent),
                linear-gradient(to top left, rgb(0, 0, 0), transparent),
                linear-gradient(to top right, rgb(0, 0, 0), transparent)
            `; // 밤 배경
        }

        setLightPos(targetPos);
        setLightIntensity(targetIntensity);

        // background와 background-blend-mode 적용
        document.body.style.setProperty('background', backgroundStyles);
        document.body.style.setProperty('background-blend-mode', 'screen');

    }, [NowHour]); // NowHour가 변경될 때마다 실행


    // console.log("objectPosition", objectPosition)

    // useHelper(lightRef, THREE.DirectionalLightHelper, 300, 0xff0000)

    return (
        <>
            <directionalLight
                ref={lightRef}
                args={[0xffffff, 1]}
                castShadow
                intensity={lightIntensity}
                position={lightPos}//{[-lightPos[0], -lightPos[1], -lightPos[2]]}
                shadow-camera-left={-25}
                shadow-camera-right={25}
                shadow-camera-top={25}
                shadow-camera-bottom={-25}
                shadow-camera-near={0.1}
                shadow-camera-far={200}
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
            />
            {(NowHour >= 7 && NowHour < 20) &&
                <Sun position={objectPosition} />}
            {(NowHour >= 20 || NowHour < 7) && (<>
                <Moon position={objectPosition} />
                <Stars
                    radius={1000}           // 별들이 나타날 반경
                    depth={50}             // 별들의 깊이 (z축)
                    count={5000}           // 별의 개수
                    factor={2}             // 별의 크기 조절 (값이 클수록 별이 커져서 밝아짐)
                    saturation={0}         // 별의 색상 채도 (0에 가까울수록 하얗고 밝게 보임)
                    fade                   // 별이 멀어질수록 페이드 아웃
                /></>)}

            {/* 이부분 나중에 자현이가 수정바람 - 성준 */}
            {/* <Sky
                distance={450000}  // 하늘이 펼쳐지는 거리
                sunPosition={[0, 100, 0]}  // 태양의 위치
                inclination={0}  // 태양의 기울기
                azimuth={0.25}   // 태양의 방위각
            /> */}
        </>
    )
}

export default Light
