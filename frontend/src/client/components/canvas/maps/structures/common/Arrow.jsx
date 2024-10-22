import React, { useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useBox } from '@react-three/cannon'
import { motion } from 'framer-motion-3d'

export function Arrow({position, scale, ...props}) {
  const { scene, nodes, materials } = useGLTF('/assets/models/etc/arrow.glb')

  const [meshRef, api] = useBox(() => ({
    args: [285, 60, 150],
    type: 'Static',
    mass: 1,
    position,
    ...props
  }))

  useEffect(() => {
    scene.traverse((obj) => {
      if(obj.isObject3D) {
        obj.castShadow = true
        obj.receiveShadow = true
      }
    })
  }, [scene])

  return (
    <motion.group
      ref={meshRef}
      position={position}
      animate={
          {
            scale: [scale, scale + 2]
          }
      }
      transition={
          {
            duration: 0.5,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut"
          }
      }
    >
        <group {...props}>
          <mesh geometry={nodes.Cone.geometry} material={materials.Material} rotation={[-Math.PI, 0, 0]} />
        </group>
    </motion.group>
  )
}

useGLTF.preload('/assets/models/etc/arrow.glb')
