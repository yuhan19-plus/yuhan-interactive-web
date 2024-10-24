/** 파일생성자 : 임성준
 * 임성준 : 프론트엔드 개발
 * 
 */
import React from 'react'
import { Canvas } from '@react-three/fiber'
import DeptMap from './DeptMap'
import { aspectRatio } from '../../../../../../data/commonData'
import { Debug, Physics } from '@react-three/cannon'
import Light from '../../../helper/Light'
import { OrbitControls } from '@react-three/drei'

const DepartmentCanvas = () => {
    // 빛의 위치 값 설정 변수
    const lightPosition = [-500, 500, -350]
    const cameraPosition = [30, 300, 50]
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
                <Light lightPosition={lightPosition} />

                <OrbitControls
                    makeDefault // 카메라의 설정이 계속 변경될 예정일 경우에 튕기거나 끊김없게 해주기 위해 설정
                    minPolarAngle={Math.PI / 6}
                    maxPolarAngle={Math.PI - Math.PI / 2}
                    // minDistance={100} // 카메라 확대 최소 범위
                    maxDistance={700} // 카메라 확대 최대 범위
                />
                {/* Physics 컴포넌트로 중력 적용. 중력은 y축에 적용 */}
                <Physics gravity={[0, -2.6, 0]}>
                    {/* Debug 컴포넌트로 물리엔진의 충돌체 영역 확인 */}
                    {/* <Debug>
                        <DeptMap />
                    </Debug> */}
                    <DeptMap />
                </Physics>
            </Canvas>
        </>
    )
}

export default DepartmentCanvas