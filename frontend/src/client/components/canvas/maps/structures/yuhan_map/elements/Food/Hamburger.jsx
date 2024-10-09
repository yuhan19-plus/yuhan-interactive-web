/** 파일생성자 : 이정민

 */
import { useGLTF } from '@react-three/drei'
import React from 'react'

export function Hamburger(props) {
  const { nodes, materials } = useGLTF('/assets/models/Food/Hamburger.glb')
  return (
    <group {...props} dispose={null}>
      <group position={[-0.098, 1, -0.000]} scale={1.5}>
      <mesh geometry={nodes.WhitePlate.geometry} material={materials['White Plate']} position={[-0.077, -0.819, -0.064]} scale={[1, 0.012, 1]} />
      <mesh geometry={nodes.LowBurn.geometry} material={materials.BreadBurn} position={[-0.077, -0.86, -0.064]} scale={[0.555, 0.083, 0.555]} />
      <mesh geometry={nodes.Patty.geometry} material={materials.Patty} position={[-0.077, -0.721, -0.064]} scale={[0.587, 0.058, 0.587]} />
      <mesh geometry={nodes.Tomato2.geometry} material={materials.Tomato} position={[0.185, -0.664, -0.216]} scale={[0.263, 0.026, 0.263]} />
      <mesh geometry={nodes.Tomato1.geometry} material={materials.Tomato} position={[-0.335, -0.664, 0.049]} scale={[0.263, 0.026, 0.263]} />
      <mesh geometry={nodes.Pickle3.geometry} material={materials.Pickle} position={[0.176, -0.66, 0.177]} rotation={[-Math.PI, 0, -Math.PI]} scale={[-0.134, -0.016, -0.134]} />
      <mesh geometry={nodes.Pickle1.geometry} material={materials.Pickle} position={[-0.003, -0.66, 0.352]} rotation={[-Math.PI, 0, -Math.PI]} scale={[-0.134, -0.016, -0.134]} />
      <mesh geometry={nodes.Pickle2.geometry} material={materials.Pickle} position={[-0.237, -0.66, -0.337]} rotation={[-Math.PI, 0, -Math.PI]} scale={[-0.134, -0.016, -0.134]} />
      <mesh geometry={nodes.Oniom1.geometry} material={materials.Onion} position={[-0.014, -0.625, 0.049]} scale={[0.409, 0.041, 0.409]} />
      <mesh geometry={nodes.Onion2.geometry} material={materials.Onion} position={[-0.095, -0.596, -0.369]} rotation={[-0.221, 0, 0]} scale={[0.263, 0.026, 0.263]} />
      <mesh geometry={nodes.Lettuce.geometry} material={materials.Lettuce} position={[-0.068, -0.581, -0.058]} rotation={[-Math.PI, 0, -Math.PI]} scale={[-0.608, -0.006, -0.608]} />
      <mesh geometry={nodes.HighBurn.geometry} material={materials.BreadBurn} position={[-0.067, -0.398, -0.069]} scale={[0.553, 0.079, 0.553]} />
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/Food/Hamburger.glb')
