/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.4.1 Bricks256.glb 
*/

import { useGLTF } from '@react-three/drei'
import React from 'react'

export function Bricks256(props) {
  const { nodes, materials } = useGLTF('/assets/models/minigame/Bricks256.glb')
  return (
    <group {...props} dispose={null}>
      <group scale={[1, 0.25, 1]}>
        <mesh geometry={nodes.Cube_1.geometry} material={materials.Grass} />
        <mesh geometry={nodes.Cube_2.geometry} material={materials.Soil} />
      </group>
      <group position={[0.096, 0.919, 0.106]} scale={[0.65, 0.606, 0.65]}>
        <mesh geometry={nodes.Cube002.geometry} material={materials.BrickMain} />
        <mesh geometry={nodes.Cube002_1.geometry} material={materials.BrickSub} />
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/minigame/Bricks256.glb')