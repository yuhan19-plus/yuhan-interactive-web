/**
 * 
 * position, scale 수정 및 그림자 설정 : 임성준
 */
import { useBox } from '@react-three/cannon'
import { useGLTF } from '@react-three/drei'
import React, { useEffect } from 'react'

export function BongsagwanEntrance({position, ...props}) {
  const { scene, nodes, materials } = useGLTF('/assets/models/building/B2Enter.glb')
  const [meshRef, api] = useBox(() => ({
    args: [70, 35, 149],
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
    <group
      ref={meshRef}
      onPointerUp={(e) => {
            onMove(null)
    }}>
      <group position={[3,0,1]} rotation={[0,0,0]} scale={[2.6, 1, 4.73]}>
        <mesh geometry={nodes.Text004.geometry} material={materials['D18A8D (B2)']} />
        <mesh geometry={nodes.Text004_1.geometry} material={materials['000000 & Metal (C2,T2)']} />
        <mesh geometry={nodes.Text004_2.geometry} material={materials['3E3C3A (B2)']} />
        <mesh geometry={nodes.Text004_3.geometry} material={materials['FFFFFF (Number, BaskitBall)']} />
        <mesh geometry={nodes.Text004_4.geometry} material={materials['C0E8F6 (B1~9(Window))']} />
        <mesh geometry={nodes.Text004_5.geometry} material={materials['96947D(B2(Window Frame),B6(Stone))']} />
        <mesh geometry={nodes.Text004_6.geometry} material={materials['E2E2E2(B1~9(Body,Number))']} />
        <mesh geometry={nodes.Text004_7.geometry} material={materials['YuhanLogo(B9, Kiosk)']} />
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/building/B2Enter.glb')
