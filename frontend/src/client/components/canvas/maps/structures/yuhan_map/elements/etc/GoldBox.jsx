import React from 'react'
import { useGLTF } from '@react-three/drei'

export function GoldBox({ position, rotation }) {
  const { nodes, materials } = useGLTF('/assets/models/etc/goldBox.glb')
  return (
    <group position={position} rotation={rotation} scale={3}>
      <group scale={[3, 1.5, 2]}>
        <mesh geometry={nodes.Cube001.geometry} material={materials.wood} />
        <mesh geometry={nodes.Cube001_1.geometry} material={materials.Gold} />
      </group>
      <group position={[0, 1.5, 0]} rotation={[0, 0, -Math.PI / 2]} scale={[1.5, 3, 2]}>
        <mesh geometry={nodes.Cylinder.geometry} material={materials.wood} />
        <mesh geometry={nodes.Cylinder_1.geometry} material={materials.Gold} />
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/etc/goldBox.glb')
