/** 파일 생성자 : 임성준
 * 임성준 : 초기 설정
 * - 카메라 설정 및 빛, 중력 설정 (24/08/02)
 */
import { Canvas } from '@react-three/fiber'
import React from 'react'
import { OrbitControls, StatsGl } from '@react-three/drei'
import Light from './helper/Light'
import { Debug, Physics } from '@react-three/cannon'
import RootMap from './maps/RootMap'
import { aspectRatio } from '../../../data/commonData'
import * as THREE from 'three'
import { useSelector } from 'react-redux'

const MainCanvas = () => {
    const kiosk = useSelector((state) => state.kiosk)
    const bus = useSelector((state) => state.bus)
    const statue = useSelector((state) => state.statue)
    const aerialViewState = useSelector((state) => state.btnMenu)
    const kioskValue = kiosk.value
    const busOneValue = bus.inBusStationOne
    const busTwoValue = bus.inBusStationTwo
    const statueValue = statue.inStatue
    const aerialViewValue = aerialViewState.value
    const aerialViewName = aerialViewState.btnMenuName

    // 빛의 위치 값 설정 변수
    const cameraPosition = [0, 1000, 0]

    return (
        <>
            <Canvas
                id='canvas'
                gl={{antialias: true}}
                shadows
                camera={{
                    // 카메라 설정
                    fov: 50,
                    aspect: aspectRatio,
                    near: 1.5,
                    far: 5000,
                    position: cameraPosition
                }}
            >
                <ambientLight name="ambientLight" intensity={0.5} />
                {/* <directionalLight
                    castShadow
                    intensity={5}
                    position={lightPosition}
                    shadow-normalBias={0.1}
                    shadow-camera-left={-25}
                    shadow-camera-right={25}
                    shadow-camera-top={25}
                    shadow-camera-bottom={-25}
                    shadow-camera-near={0.1}
                    shadow-camera-far={200}
                /> */}

                {/* 빛설정을 돕기 위한 LightHelper */}
                <Light/>

                <OrbitControls
                    makeDefault                     // 카메라의 설정이 계속 변경될 예정일 경우에 튕기거나 끊김없게 해주기 위해 설정
                    minPolarAngle={Math.PI / 6}
                    maxPolarAngle={Math.PI - Math.PI / 2}
                    enableZoom={false}
                    minDistance={150}               // 카메라 확대 최소 범위
                    maxDistance={1000}              // 카메라 확대 최대 범위
                    autoRotate={aerialViewName === 'campusGuideView' && aerialViewValue}
                    mouseButtons={{
                        LEFT: (
                            kioskValue ||
                            busOneValue ||
                            busTwoValue ||
                            statueValue ||
                            aerialViewName === 'campusGuideView'
                        ) ? false : THREE.MOUSE.ROTATE,   // 왼쪽 클릭은 회전
                        MIDDLE: null,               // 중간 클릭은 줌
                        RIGHT: null                 // 오른쪽 클릭은 비활성화
                    }}
                    onContextMenu={(event) => event.preventDefault()}  // 우클릭 기본 동작(컨텍스트 메뉴) 비활성화
                />

                {/* Physics 컴포넌트로 중력 적용. 중력은 y축에 적용 */}
                <Physics gravity={[0, -2.6, 0]}>
                    {/* Debug 컴포넌트로 물리엔진의 충돌체 영역 확인 */}
                    {/* <Debug>
                        <RootMap />
                    </Debug> */}
                    <RootMap />
                </Physics>

                {/* 최적화 */}
                {/* <StatsGl /> */}
            </Canvas>
        </>
    )
}

export default MainCanvas