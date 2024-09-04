/** 파일 생성자 : 임성준
 * 임성준 : 초기 설정
 * - 카메라 설정 및 빛, 중력 설정 (24/08/02)
 */
import { Canvas } from '@react-three/fiber'
import React from 'react'
import { OrbitControls } from '@react-three/drei'
import Light from './helper/Light'
import { Debug, Physics } from '@react-three/cannon'
import RootMap from './maps/RootMap'
import { useLocation } from 'react-router-dom'
import { aspectRatio } from '../../../data/commonData'
import SpotLightHelper from './helper/SpotLightHelper'
import Clouds from './maps/structures/yuhan_map/elements/etc/Clouds'
import { AxesHelper } from 'three'

const MainCanvas = () => {
    const location = useLocation()

    // 빛의 위치 값 설정 변수
    const cameraPosition = [0, 100, 0]

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
                    near: 0.1,
                    far: 100000,
                    position: cameraPosition
                }}
            >
                {/* <Clouds position={[0, 300, 0]} /> */}
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
                    makeDefault // 카메라의 설정이 계속 변경될 예정일 경우에 튕기거나 끊김없게 해주기 위해 설정
                    minPolarAngle={Math.PI / 6}
                    maxPolarAngle={Math.PI - Math.PI / 2}
                    // minDistance={100} // 카메라 확대 최소 범위
                    maxDistance={1700} // 카메라 확대 최대 범위
                />

                {/* Physics 컴포넌트로 중력 적용. 중력은 y축에 적용 */}
                <Physics gravity={[0, -2.6, 0]}>
                    {/* Debug 컴포넌트로 물리엔진의 충돌체 영역 확인 */}
                    {/* <Debug>
                        <RootMap />
                    </Debug> */}
                    <RootMap />
                </Physics>
            </Canvas>
        </>
    )
}

export default MainCanvas