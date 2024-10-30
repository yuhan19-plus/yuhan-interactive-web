/*
* 오자현 
* - 오브젝트 제작, 오브젝트 속성 - position, scale, rotation 적용, 
*   오브젝트 빌보딩, 애니매이션적용 (24/08/29)
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three'
import { motion } from 'framer-motion-3d'

export function Moon({ position }) {
  const { nodes, materials } = useGLTF('/assets/models/etc/moon.glb')
  const moonRef = useRef();

  useFrame(({ camera }) => {
    if (moonRef.current) {
      // 카메라 위치에서 달의 위치를 뺀 방향 벡터를 계산
      const direction = new THREE.Vector3().subVectors(camera.position, moonRef.current.position)

      // Y축 회전만 적용하기 위해 방향 벡터의 y 컴포넌트를 0으로 설정
      direction.y = 0

      // 달이 카메라를 향하도록 회전
      moonRef.current.lookAt(moonRef.current.position.clone().add(direction))
    }
  })


  return (
    <motion.group position={position} ref={moonRef}
      initial={{ scale: 45 }}
      animate={{ scale: 55}}
      transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
    >
      <mesh geometry={nodes.Sphere.geometry} material={materials.Moon} scale={[0.318, 1, 1]} rotation={[0, Math.PI / 2, 0]} />
    </motion.group>
  )
}

useGLTF.preload('/assets/models/etc/moon.glb')
