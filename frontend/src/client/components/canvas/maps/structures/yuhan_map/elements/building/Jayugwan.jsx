/** 파일생성자 : 이정민
 * 초기 position, scale 설정 : 이정민
 * position, scale 수정 및 그림자 설정 : 임성준
 */
import { useBox } from '@react-three/cannon'
import { useGLTF } from '@react-three/drei'
import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion-3d'

export function Jayugwan({position, viewValue, viewName, ...props}) {
  const jayuRef = useRef()
  const [hovered, setHovered] = useState(false)

  const { scene, nodes, materials } = useGLTF('/assets/models/building/B3.glb')
  const [meshRef, api] = useBox(() => ({
    args: [90, 215, 155],
    type: 'Static',
    mass: 1,
    position,
    ...props
  }))

  const handlePointerOver = () => {
      if(viewValue && viewName === 'campusGuideView') {
          setHovered(true)
      }
  }
  const handlePointerOut = () => {
      setHovered(false)
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
    <motion.group
      ref={jayuRef}
      onPointerOver={(e) => {
        e.stopPropagation()
        handlePointerOver()
      }}
      onPointerOut={handlePointerOut}
      animate={{
        y: hovered ? 25 : -1
      }}
      transition={{
        duration: 1,
        ease: 'easeInOut'
      }}
    >
      <group
        ref={meshRef}
        onPointerUp={(e) => {
              e.stopPropagation()
      }}>
        <group position={[5,-5, 1]} rotation={[0,0,0]} scale={[8.072, 8.072, 9.321]}>
          <mesh geometry={nodes.텍스트002.geometry} material={materials['DCE759 & Metal (DEVName, Statue).001']} />
          <mesh geometry={nodes.텍스트002_1.geometry} material={materials['000000 (B1, B2, B9, Smoking Booth).001']} />
          <mesh geometry={nodes.텍스트002_2.geometry} material={materials['E2EBCA (B1,B4,B5,B6(BodyFrame)).001']} />
          <mesh geometry={nodes.텍스트002_3.geometry} material={materials['C0E8F6 (B1~9(Window)).001']} />
          <mesh geometry={nodes.텍스트002_4.geometry} material={materials['18226AA (Number Plane).001']} />
          <mesh geometry={nodes.텍스트002_5.geometry} material={materials['FFFFFF (Number, BaskitBall).001']} />
          <mesh geometry={nodes.텍스트002_6.geometry} material={materials['61544D (B1,B2,B5,B6(Body).001']} />
          <mesh geometry={nodes.텍스트002_7.geometry} material={materials['23683C (RoofTop).001']} />
        </group>
        <group position={[6,-5, 2]} rotation={[0,0,0]} scale={[8.072, 8.072, 9.321]}>
          <mesh geometry={nodes.텍스트002_8.geometry} material={materials['A2A2A2(B9, Park(Rock),B5-6 Plane)']} />
          <mesh geometry={nodes.텍스트002_9.geometry} material={materials['0EA6EF (Leaf, Smoking Booth)']} />
          <mesh geometry={nodes.텍스트002_10.geometry} material={materials['644F1C (Park Plane)']} />
          <mesh geometry={nodes.텍스트002_11.geometry} material={materials['0CFF0F(Leaf,Smoking Booth)']} />
          <mesh geometry={nodes.텍스트002_12.geometry} material={materials['006400 (Leaf)']} />
          <mesh geometry={nodes.텍스트002_13.geometry} material={materials['654321 (Wood)']} />
        </group>
      </group>
    </motion.group>
  )
}

useGLTF.preload('/assets/models/building/B3.glb')
