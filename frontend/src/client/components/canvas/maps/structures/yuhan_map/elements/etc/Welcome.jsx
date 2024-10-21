/**
 * 임성준 구현
 */
import { Float, MeshDistortMaterial, Sky, Stars, Text, Text3D, useHelper } from '@react-three/drei'
import React, { useEffect, useRef } from 'react'
import { YuhanLogo } from './YuhanLogo'
import { useBox } from '@react-three/cannon'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'
import { LightingObject } from './LightingObject'
import { BioDeptHeadCharacter } from '../../../../player/dept/BioDeptHeadCharacter'
import { DesignDeptHeadCharacter } from '../../../../player/dept/DesignDeptHeadCharacter'
import { FoodDeptHeadCharacter } from '../../../../player/dept/FoodDeptHeadCharacter'
import { CSDeptHeadCharacter } from '../../../../player/dept/CSDeptHeadCharacter'
import { useSelector } from 'react-redux'

const Welcome = () => {
    const groundMapState = useSelector((state) => state.groundMap)
    const groundMapName = groundMapState.mapName
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
        position: [-428, 2.5, -447],
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
            <group>
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
                    position={[-425, 65, -554]}
                    castShadow
                    receiveShadow
                >
                    <boxGeometry args={[193, 140, 15]} />
                    <meshStandardMaterial color='#DEB2B3' />
                </mesh>
                <mesh
                    position={[-520, 70, -447]}
                    castShadow
                    receiveShadow
                >
                    <boxGeometry args={[15, 130, 229]} />
                    <meshStandardMaterial color='#DEB2B3' />
                </mesh>
                <mesh
                    ref={targetRef}
                    position={[-520, 70, -550]}
                    castShadow
                    receiveShadow
                >
                    <boxGeometry args={[15, 15, 15]} />
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
                <group position={[-428, 6, -447]}>
                    <Stars
                        radius={1.3}
                        depth={70}
                        count={500}
                        factor={5} // 별의 크기
                        saturation={0} // 채도
                        fade
                        speed={5}
                    />
                    <Float position={[0, 155, 30]} speed={10} rotationIntensity={1.5} floatIntensity={5}>
                        <mesh>
                            <sphereGeometry args={[10, 32, 32]} />
                            <MeshDistortMaterial color="#009484" distort={0.3} speed={2} />
                        </mesh>
                    </Float>
                    <Float position={[65, 135, -70]} speed={10} rotationIntensity={1.5} floatIntensity={5}>
                        <mesh>
                            <sphereGeometry args={[10, 32, 32]} />
                            <MeshDistortMaterial color="#63CAB9" distort={0.3} speed={2} />
                        </mesh>
                    </Float>
                    <Float position={[30, 160, -50]} speed={10} rotationIntensity={1.5} floatIntensity={5}>
                        <mesh>
                            <sphereGeometry args={[10, 32, 32]} />
                            <MeshDistortMaterial color="#80BD00" distort={0.3} speed={2} />
                        </mesh>
                    </Float>
                    <Float position={[55, 150, 70]} speed={10} rotationIntensity={1.5} floatIntensity={5}>
                        <mesh>
                            <sphereGeometry args={[10, 32, 32]} />
                            <MeshDistortMaterial color="#F4CE3D" distort={0.3} speed={2} />
                        </mesh>
                    </Float>
                    <Float position={[-50, 140, 0]} speed={10} rotationIntensity={1.5} floatIntensity={5}>
                        <mesh>
                            <sphereGeometry args={[10, 32, 32]} />
                            <MeshDistortMaterial color="#EE7421" distort={0.3} speed={2} />
                        </mesh>
                    </Float>
                    <Float position={[110, 0, 95]} speed={10} rotationIntensity={1.5} floatIntensity={5}>
                        <mesh rotation={[0, Math.PI / 2, 0]}>
                            <Text3D {...fontStyle} size={15} depth={1} bevelEnabled>
                                Y
                            <meshStandardMaterial color="#009484" />
                            </Text3D>
                        </mesh>
                    </Float>

                    <Float position={[110, 0, 55]} speed={10} rotationIntensity={1.5} floatIntensity={5}>
                        <mesh rotation={[0, Math.PI / 2, 0]}>
                            <Text3D {...fontStyle} size={15} depth={1} bevelEnabled>
                                U
                            <meshStandardMaterial color="#63CAB9" />
                            </Text3D>
                        </mesh>
                    </Float>

                    <Float position={[110, 0, 15]} speed={10} rotationIntensity={1.5} floatIntensity={5}>
                        <mesh rotation={[0, Math.PI / 2, 0]}>
                            <Text3D {...fontStyle} size={15} depth={1} bevelEnabled>
                                H
                            <meshStandardMaterial color="#80BD00" />
                            </Text3D>
                        </mesh>
                    </Float>

                    <Float position={[110, 0, -35]} speed={10} rotationIntensity={1.5} floatIntensity={5}>
                        <mesh rotation={[0, Math.PI / 2, 0]}>
                            <Text3D {...fontStyle} size={15} depth={1} bevelEnabled>
                                A
                            <meshStandardMaterial color="#F4CE3D" />
                            </Text3D>
                        </mesh>
                    </Float>

                    <Float position={[110, 0, -75]} speed={10} rotationIntensity={1.5} floatIntensity={5}>
                        <mesh rotation={[0, Math.PI / 2, 0]}>
                            <Text3D {...fontStyle} size={15} depth={1} bevelEnabled>
                                N
                            <meshStandardMaterial color="#EE7421" />
                            </Text3D>
                        </mesh>
                    </Float>
                </group>
            </group>
            <LightingObject position={[-335, -5, -340]} rotation={[0, Math.PI / 1.35, 0]} />

            <YuhanLogo position={[-495, 13, -290]} />

            <BioDeptHeadCharacter groundMapName={groundMapName} position={[-360, 10, -540]} rotation={[0, Math.PI / 2, 0]} />
            <CSDeptHeadCharacter groundMapName={groundMapName} position={[-340, 20, -465]} rotation={[0, Math.PI / 2, 0]} />
            <DesignDeptHeadCharacter groundMapName={groundMapName} position={[-340, 10, -510]} rotation={[0, Math.PI / 2, 0]} />
            <FoodDeptHeadCharacter groundMapName={groundMapName} position={[-340, 20, -385]} rotation={[0, Math.PI / 2, 0]} />

            <spotLight
                // ref={lightRef}
                target={targetRef.current}
                position={[-345, 25, -353]}
                color={"white"}
                intensity={50000}
                distance={1000}
                penumbra={0.3}
                decay={2}
                angle={Math.PI / 5}
            />
        </>
    )
}

export default Welcome