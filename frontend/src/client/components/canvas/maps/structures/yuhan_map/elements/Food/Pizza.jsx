/** 파일생성자 : 이정민

 */
import { useGLTF } from '@react-three/drei'
import React from 'react'

export function Pizza(props) {
  const { nodes, materials } = useGLTF('/assets/models/Food/Pizza.glb')
  return (
    <group {...props} dispose={null}>
      <group position={[-0.1, -0.6, 0.100]} rotation={[0, Math.PI / 2, 0]} scale={1.5}>
        <mesh geometry={nodes.Circle007.geometry} material={materials.Dou} />
        <mesh geometry={nodes.Circle007_1.geometry} material={materials.Cheeze} />
        <mesh geometry={nodes.Circle007_2.geometry} material={materials.Salami} />
        <mesh geometry={nodes.Circle007_3.geometry} material={materials.Olive} />
        <mesh geometry={nodes.Circle007_4.geometry} material={materials.BeanMeat} />
        <mesh geometry={nodes.Circle007_5.geometry} material={materials['Green Onion']} />
      </group>
      {/* <mesh geometry={nodes.Box.geometry} material={materials.Box} position={[-0.085, -0.084, -0.052]} scale={[1, 0.086, 1]} /> */}
    </group>
  )
}

useGLTF.preload('/assets/models/Food/Pizza.glb')
