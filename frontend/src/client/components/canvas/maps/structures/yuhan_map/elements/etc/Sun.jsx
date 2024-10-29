/*
* 오자현 
* - 오브젝트 제작,오브젝트 속성 - position, scale 적용,
*   애니매이션적용(24/08/29)
* - 빌보딩 적용
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { motion } from 'framer-motion-3d'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

export function Sun({ position }) {
  const { nodes, materials } = useGLTF('/assets/models/etc/sun.glb')
  const sunRef = useRef();

  useFrame(({ camera }) => {
    if (sunRef.current) {
      // 카메라 위치에서 달의 위치를 뺀 방향 벡터를 계산
      const direction = new THREE.Vector3().subVectors(camera.position, sunRef.current.position)

      // Y축 회전만 적용하기 위해 방향 벡터의 y 컴포넌트를 0으로 설정
      direction.y = 0

      // 해가 카메라를 향하도록 회전
      sunRef.current.lookAt(sunRef.current.position.clone().add(direction))
    }
  })


  return (
    <motion.group position={position} scale={50} ref={sunRef}
      initial={{ scale: 45 }}
      animate={{ scale: 52 }}
      transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
    >
      <mesh geometry={nodes.Sphere.geometry} material={materials.Sun_main} />
      <motion.mesh geometry={nodes.Cone001.geometry} material={materials.Sun_flower} rotation={[0, Math.PI / 2, 0]} scale={[0.25, 0.5, 0.25]}
        initial={{
          rotateZ: - 0.25,
        }}
        animate={{
          rotateZ: + 0.25,
        }}
        transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }} />
    </motion.group>
  )
}

useGLTF.preload('/assets/models/etc/sun.glb')
