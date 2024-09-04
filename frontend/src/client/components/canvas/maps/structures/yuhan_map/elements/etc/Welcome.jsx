/**
 * 임성준 구현
 */
import { Text3D, useHelper } from '@react-three/drei'
import React, { useEffect, useRef } from 'react'
import { YuhanLogo } from './YuhanLogo'
import { useBox } from '@react-three/cannon'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'

const Welcome = () => {
    const fontUrl = 'assets/fonts/HakgyoansimWoojuR.json'
    const targetRef = useRef()
    const lightRef = useRef(null)
    useHelper(lightRef, THREE.SpotLightHelper, 5)
    const fontStyle = {
        font: fontUrl,
        letterSpacing: 0.01,
        height: 2,
        lineHeight: 1,
        fontSize: 1,
    }

    const [welcomeFloorRef] = useBox(() => ({
        args: [200, 16, 230],
        mass: 1,
        type: 'Static',
        position: [-428, 6, -447],
        rotation:[0, 0, 0]
    }))

    const { scene } = useThree()

    useEffect(() => {
        if (!targetRef.current) return

        const targetObject = new THREE.Object3D()
        targetObject.position.set(0, 0, -5) // 타겟의 위치를 설정
        scene.add(targetObject)

        // SpotLight의 타겟을 설정하고, 업데이트
        targetRef.current.target = targetObject
        targetRef.current.target.updateMatrixWorld(true)
    }, [scene])

    return (
        <>
            {/* <SpotLightHelper position={[-428, 10, -350]} firstTargetRef={firstTargetRef} /> */}
            
            <mesh
                ref={welcomeFloorRef}
                position={[-428, 6, -447]}
                castShadow
                receiveShadow
            >
                <boxGeometry args={[200, 16, 230]} />
                <meshStandardMaterial color='#050504' />
            </mesh>
            <mesh
                ref={targetRef}
                position={[-425, 65, -554]}
                castShadow
                receiveShadow
            >
                <boxGeometry args={[193, 140, 15]} />
                <meshStandardMaterial color='#DEB2B3' />
            </mesh>
            <mesh
                // ref={firstTargetRef}
                position={[-520, 70, -447]}
                castShadow
                receiveShadow
            >
                <boxGeometry args={[15, 130, 229]} />
                <meshStandardMaterial color='#DEB2B3' />
            </mesh>
            <group position={[-430, 36, -350]} rotation={[0, Math.PI/2.5, 0]}>
                <Text3D size={12} {...fontStyle}>
                    Welcome to YUHAN University
                    <meshStandardMaterial color={'#F4CE3D'} />
                </Text3D>
                <group position={[68, -16, 0]}>
                    <Text3D size={8} {...fontStyle}>
                        유한대학교에 오신걸 환영합니다
                        <meshStandardMaterial color={'#F6AC7A'} />
                    </Text3D>
                </group>
            </group>
            <YuhanLogo position={[-490, 13, -290]} />

            {/* 나중에 작업 예정 - 성준 */}
            {/* <spotLight
                // ref={lightRef}
                target={targetRef.current}
                position={[-428, 16, -347]}
                color={"#ffffff"}
                intensity={50000}
                distance={1000}
                // penumbra={0.7}
                decay={2}
                angle={Math.PI / 6}
            />
            <spotLight
                // ref={lightRef}
                target={targetRef.current}
                position={[-400, 16, -347]}
                color={"#ffffff"}
                intensity={50000}
                distance={1000}
                // penumbra={0.7}
                decay={2}
                angle={Math.PI / 6}
            />
            <spotLight
                // ref={lightRef}
                target={targetRef.current}
                position={[-372, 16, -347]}
                color={"#ffffff"}
                intensity={50000}
                distance={1000}
                // penumbra={0.7}
                decay={2}
                angle={Math.PI / 6}
            />

            <spotLight
                // ref={lightRef}
                target={targetRef.current}
                position={[-456, 16, -347]}
                color={"#ffffff"}
                intensity={50000}
                distance={1000}
                // penumbra={0.7}
                decay={2}
                angle={Math.PI / 6}
            />
            <spotLight
                // ref={lightRef}
                target={targetRef.current}
                position={[-484, 16, -347]}
                color={"#ffffff"}
                intensity={50000}
                distance={1000}
                // penumbra={0.7}
                decay={2}
                angle={Math.PI / 6}
            /> */}
        </>
    )
}

export default Welcome