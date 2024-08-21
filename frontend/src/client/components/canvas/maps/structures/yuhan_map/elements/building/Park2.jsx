/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.4.1 Park2.glb -o Park2.jsx 
*/

import { useBox } from '@react-three/cannon'
import { useGLTF } from '@react-three/drei'
import React, { useEffect } from 'react'

export function Park2({position, ...props}) {
  const { scene, nodes, materials } = useGLTF('/assets/models/Park2.glb')
  const [meshRef, api] = useBox(() => ({
    args: [150, 2, 115],
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
      <group position={[2,22.281,3]} scale={[-71.906, -42.936, -48.895]}>
        <mesh geometry={nodes.Plane009.geometry} material={materials['644F1C (Park Plane)']} />
        <mesh geometry={nodes.Plane009_1.geometry} material={materials['8F8E6E (Park)']} />
        <mesh geometry={nodes.Plane009_2.geometry} material={materials['A2A2A2(B9, Park(Rock),B5-6 Plane)']} />
        <mesh geometry={nodes.Plane009_3.geometry} material={materials['596054 (Park)']} />
        <mesh geometry={nodes.Plane009_4.geometry} material={materials['006400 (Leaf)']} />
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/Park2.glb')