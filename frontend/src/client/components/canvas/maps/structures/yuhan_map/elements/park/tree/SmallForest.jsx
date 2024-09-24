/**
 * 임성준 : 물리엔진 및 위치설정
 */

import React, { useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useBox } from '@react-three/cannon'

export function SmallForest({position, ...props}) {
  const { scene, nodes, materials } = useGLTF('/assets/models/park/Forest2.glb')

  const [meshRef, api] = useBox(() => ({
    args: [73, 100, 150],
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
            e.stopPropagation()
    }}>
      <group rotation={[Math.PI / 2, 0, Math.PI / 2]} scale={[2.863, 3.072, 4.264]}>
        <mesh geometry={nodes.Text002.geometry} material={materials['A2A2A2(B9, Park(Rock),B5-6 Plane)']} />
        <mesh geometry={nodes.Text002_1.geometry} material={materials['644F1C (Park Plane)']} />
        <mesh geometry={nodes.Text002_2.geometry} material={materials['0CFF0F(Leaf,Smoking Booth)']} />
        <mesh geometry={nodes.Text002_3.geometry} material={materials['0EA6EF (Leaf, Smoking Booth)']} />
        <mesh geometry={nodes.Text002_4.geometry} material={materials['006400 (Leaf)']} />
        <mesh geometry={nodes.Text002_5.geometry} material={materials['654321 (Wood)']} />
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/park/Forest2.glb')
