/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.4.1 B5-B6-Between-B.glb -o B5-B6-Between-B.jsx 
*/

import { useBox } from '@react-three/cannon'
import { useGLTF } from '@react-three/drei'
import React, { useEffect } from 'react'

export function B5_B6_Between_B({position, ...props}) {
  const { scene, nodes, materials } = useGLTF('/assets/models/B5-B6-Between-B.glb')
  const [meshRef, api] = useBox(() => ({
    args: [28, 105, 120],
    type: 'Static',
    mass: 1,
    position,
    ...props
  }))

  useEffect(() => {
    scene.traverse((obj) => {
      if(obj.isObject3D) {
        console.log(obj)
        obj.castShadow = true
        obj.receiveShadow = true
      }
    })
  }, [scene])

  return (
    <group ref={meshRef}>
      <group position={[-12,0,-7]} scale={[0.253, 12, 3.955]}>
        <mesh geometry={nodes.Cube073.geometry} material={materials['C0E8F6 (B1~9(Window))']} />
        <mesh geometry={nodes.Cube073_1.geometry} material={materials['E2E2E2(B1~9(Body,Number))']} />
        <mesh geometry={nodes.Cube073_2.geometry} material={materials['D2D2D2 & Metal (B4,B5,B6,B7)']} />
        <mesh geometry={nodes.Cube073_3.geometry} material={materials['858585 (B4,B9,B2)']} />
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/B5-B6-Between-B.glb')