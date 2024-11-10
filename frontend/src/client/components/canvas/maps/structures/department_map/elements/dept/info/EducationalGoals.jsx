/**
 * 임성준
 * - 학과소개 오브젝트 생성 및 그림자 설정
 * - 애니메이션 설정 및 모달창 구현
 */
import React, { useEffect, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { useBox } from '@react-three/cannon'
import { motion } from 'framer-motion-3d'
import DeptModal from '../modal/DeptModal'

export function EducationalGoals({name, deptInfoValue, deptInfoName, position, scale, ...props}) {
  const { scene, nodes, materials } = useGLTF('/assets/models/dept_info/education.glb')
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
        <group position={[-1.857, 3.415, 0.016]} rotation={[0.128, 0.095, -Math.PI / 2]} scale={[0.05, 1, 0.05]}>
          <mesh geometry={nodes.실린더004.geometry} material={materials.colorGold} />
          <mesh geometry={nodes.실린더004_1.geometry} material={materials.colorBlack} />
          <mesh geometry={nodes.실린더004_2.geometry} material={materials.colorGrey} />
        </group>
      </motion.group>
      <group
        position={position}
      >
        {(deptInfoValue && (name === deptInfoName)) && (
              <DeptModal position={[50, 0, 70]} deptInfoName={deptInfoName} />
        )}
      </group>
    </>
  )
}

useGLTF.preload('/assets/models/dept_info/education.glb')