import React, { useEffect, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { useBox } from '@react-three/cannon'
import { motion } from 'framer-motion-3d'
import DeptModal from '../modal/DeptModal'

export function MainEducationalFields({name, deptInfoValue, deptInfoName, position, scale, ...props}) {
  const { scene, nodes, materials } = useGLTF('/assets/models/dept_info/board.glb')
  const [animationState, setAnimationState] = useState('y')
  const [meshRef, api] = useBox(() => ({
    args: [285, 60, 150],
    type: 'Static',
    mass: 1,
    position,
    ...props
  }))

  const handleAnimationComplete = () => {
    if(animationState === 'y') {
      setAnimationState((prevState) => (prevState === 'y' ? 'scale' : 'y'))
    }
  }

  useEffect(() => {
    scene.traverse((obj) => {
      if(obj.isObject3D) {
        obj.castShadow = true
        obj.receiveShadow = true
      }
    })
  }, [scene])
  return (
    <>
      <motion.group
        ref={meshRef}
        position={position}
        animate={
            animationState === 'y' 
            ? {
              y: [position[1] - 3, position[1]],
              scale: [0, scale + 2]
            }
            : {scale: [scale + 1.5, scale + 1, scale + 1.5]}
        }
        transition={
          animationState === 'y' 
          ? {
              delay: 1,
              duration: 0.5,
              ease: "easeIn"
          }
          : {
              duration: 1.3,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut"
          }}
        onAnimationComplete={handleAnimationComplete}
        {...props}
      >
        <group position={[0.031, 4.933, -0.383]} rotation={[2.883, 1.379, 1.834]} scale={[0.05, 1, 0.05]}>
          <mesh geometry={nodes.실린더004.geometry} material={materials.colorGold} />
          <mesh geometry={nodes.실린더004_1.geometry} material={materials.colorBlack} />
          <mesh geometry={nodes.실린더004_2.geometry} material={materials.colorBrown} />
          <mesh geometry={nodes.실린더004_3.geometry} material={materials.colorGreen} />
        </group>
      </motion.group>
      <group
        position={position}
      >
        {(deptInfoValue && (name === deptInfoName)) && (
              <DeptModal position={[30, 0, 50]} deptInfoName={deptInfoName} />
        )}
      </group>
    </>
  )
}

useGLTF.preload('/assets/models/dept_info/board.glb')