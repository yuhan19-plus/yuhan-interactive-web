/*
 * 파일생성자 오자현
 * 물리엔진 적용 : 오자현
 * position, scale 수정 및 그림자 설정 : 오자현
 */

import React, { useEffect, useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { useBox } from '@react-three/cannon'

export function Street_lamp({ position, ...props }) {
  const { scene, nodes, materials } = useGLTF('/assets/models/etc/street_lamp.glb')
  const today = new Date();
  const [hours, sethours] = useState(today.getHours());

  const [meshRef, api] = useBox(() => ({
    args: [5, 47, 5],
    type: 'Static',
    mass: 1,
    position: [position[0], position[1] + 23.35, position[2]],
    ...props
  }))

  useEffect(() => {
    scene.traverse((obj) => {
      if (obj.isObject3D) {
        obj.castShadow = true
        obj.receiveShadow = true
      }
    })
    // console.log("현재시간", hours);
    // console.log('위치', position)
  }, [scene])

  return (
    <group ref={meshRef} scale={4}>
      <group position={[0, 0.45, 0]} scale={[0.25, 5, 0.25]}>
        <mesh geometry={nodes.Cylinder001_1.geometry} material={materials.main} />
        <mesh geometry={nodes.Cylinder001_2.geometry} material={materials.white} />
        {(hours > 17 || hours < 7) && ( //18시부터 6시
          <pointLight
            position={[0, 0, 0]} 
            intensity={40}  // 빛의 강도
            distance={200}  // 빛이 닿는 최대 거리
            decay={0.5}  // 거리 감쇠율
            castShadow
            receiveShadow
          />
        )}
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/etc/street_lamp.glb')
