/*
 * 물리엔진 적용 : 오자현
 * position, scale 수정 및 그림자 설정 : 오자현
 */

import React, { useEffect, useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { useBox } from '@react-three/cannon'

export function Street_lamp({ position, ...props }) {
  const { scene, nodes, materials } = useGLTF('/assets/models/etc/street_lamp.glb')
  const today = new Date();
  const [hours, sethours] = useState(today.getHours());//test 시 임시값 가능
  const x = position[0];
  const y = position[1];
  const z = position[2];
  const [meshRef, api] = useBox(() => ({
    args: [5, 47, 5],
    type: 'Static',
    mass: 1,
    position: [x, y +23.35, z],
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
      <group position={[0, 1.66, 0]} scale={[0.25, 5, 0.25]}>
        <mesh geometry={nodes.Cylinder001_1.geometry} material={materials.main} />
        <mesh geometry={nodes.Cylinder001_2.geometry} material={materials.white} />
        {(hours > 17 || hours < 7) && ( //18시부터 6시까지 불이 킨다.
          <pointLight
            position={[0, 0, 0]}  // 포인트 라이트의 위치 설정
            intensity={40}  // 빛의 강도 설정
            distance={200}  // 빛이 닿는 최대 거리 설정
            decay={0.5}  // 거리 감쇠율 설정, 값이 클수록 더 빠르게 감쇠
            castShadow
            receiveShadow
          />
        )}
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/etc/street_lamp.glb')
