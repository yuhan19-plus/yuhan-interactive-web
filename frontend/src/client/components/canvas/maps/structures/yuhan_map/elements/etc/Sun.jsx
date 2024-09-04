/*
* 오자현 
* - 오브젝트 제작,오브젝트 속성 - position, scale 적용,
*   애니매이션적용(24/08/29)
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'
import { motion } from 'framer-motion-3d'

export function Sun({ position }) {
  const { nodes, materials } = useGLTF('/assets/models/etc/sun.glb')
  const randomRotate = Math.random() * 1

  return (
    <motion.group position={position} scale={50}
      initial={{ scale: 45 }}
      animate={{ scale: 52 }}
      transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
    >
      <mesh geometry={nodes.Sphere.geometry} material={materials.Sun_main} />
      <motion.mesh geometry={nodes.Cone001.geometry} material={materials.Sun_flower} rotation={[Math.PI / 2, 0, 0]} scale={[0.25, 0.5, 0.25]}
        initial={{
          rotateX: randomRotate - 0.25,
        }}
        animate={{
          rotateX: randomRotate + 0.25,
        }}
        transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }} />
    </motion.group>
  )
}

useGLTF.preload('/assets/models/etc/sun.glb')
