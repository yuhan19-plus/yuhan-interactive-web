/** 파일생성자 : 이정민
 * 초기 position, scale 설정 : 이정민
 * position, scale 수정 및 그림자 설정 : 임성준
 */
import { useBox } from '@react-three/cannon'
import { useGLTF } from '@react-three/drei'
import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion-3d'
import { BongsagwanEntrance } from './BongsagwanEntrance'
import { SmokingArea } from '../etc/SmokingArea'

export function Bongsagwan({position, viewValue, viewName, ...props}) {
  const bongsagwanRef = useRef()
  const [hovered, setHovered] = useState(false)

  const { scene, nodes, materials } = useGLTF('/assets/models/building/B2.glb')
  const [meshRef, api] = useBox(() => ({
    args: [285, 60, 150],
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
      ref={bongsagwanRef}
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
        <group position={[0, 0, 1]} rotation={[0,0,0]} scale={[2.59, 1, 4.787]}>
          <mesh geometry={nodes.Text002.geometry} material={materials['DCE759 & Metal (DEVName, Statue).001']} />
          <mesh geometry={nodes.Text002_2.geometry} material={materials['000000 & Metal (C2,T2).001']} />
          <mesh geometry={nodes.Text002_3.geometry} material={materials['61544D (B1,B2,B5,B6(Body).001']} />
          <mesh geometry={nodes.Text002_4.geometry} material={materials['3E3C3A (B2).001']} />
          <mesh geometry={nodes.Text002_5.geometry} material={materials['FFFFFF (Number, BaskitBall).001']} />
          <mesh geometry={nodes.Text002_6.geometry} material={materials['858585 (B4,B9,B2).001']} />
          <mesh geometry={nodes.Text002_7.geometry} material={materials['23683C (RoofTop).001']} />
          <mesh geometry={nodes.Text002_8.geometry} material={materials['E2EBCA (B1,B4,B5,B6(BodyFrame)).001']} />
          <mesh geometry={nodes.Text002_9.geometry} material={materials['C0E8F6 (B1~9(Window)).001']} />
          <mesh geometry={nodes.Text002_10.geometry} material={materials['96947D(B2(Window Frame),B6(Stone)).001']} />
        </group>
        <group position={[0.1, 0, 3]} rotation={[0,0,0]} scale={[2.59, 1, 4.787]}>
          <mesh geometry={nodes.Text002_1.geometry} material={materials['D18A8D (B2).001']} />
          <mesh geometry={nodes.Text002_12.geometry} material={materials['YuhanLogo(B9, Kiosk)']} />
          <mesh geometry={nodes.Text002_11.geometry} material={materials['E2E2E2(B1~9(Body,Number))']} />
        </group>
      </group>
      <BongsagwanEntrance position={[179, 70.5, -298.787]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} />
      <SmokingArea position={[220, 151.3, -120]} rotation={[Math.PI, Math.PI/2, 0]} scale={[1.5, 13, 1.5]} />
    </motion.group>
  )
}

useGLTF.preload('/assets/models/building/B2.glb')
