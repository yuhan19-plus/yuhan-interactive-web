/** 파일생성자 : 이정민

 */
import { useGLTF } from '@react-three/drei'
import React from 'react'

export function Udon(props) {
  const { nodes, materials } = useGLTF('/assets/models/Food/Udon.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Plate.geometry} material={materials.Plate} position={[-0.028, -0.937, -0.005]} scale={[0.397, 0.047, 0.397]} />
      <mesh geometry={nodes.Chopstick.geometry} material={materials.Plate} position={[0.12, 0.217, -0.939]} rotation={[0.914, 0, 0]} scale={[0.039, 0.039, 1.216]} />
      <mesh geometry={nodes.Noodle.geometry} material={materials.Noodle} position={[0, -0.216, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={0.733} />
      <mesh geometry={nodes.Gravy.geometry} material={materials.Gravy} position={[-0.028, 0.111, -0.005]} scale={1.024} />
      <mesh geometry={nodes.Noodle001.geometry} material={materials.Noodle} position={[0, -0.216, 0]} rotation={[-Math.PI / 2, 0, -0.775]} scale={0.733} />
      <group position={[-0.411, -0.082, 0.288]} rotation={[-0.028, 0.353, 0.081]} scale={[0.319, 0.017, 0.382]}>
        <mesh geometry={nodes.Cylinder001.geometry} material={materials.odang} />
        <mesh geometry={nodes.Cylinder001_1.geometry} material={materials.Material} />
      </group>
      <mesh geometry={nodes.Noodle002.geometry} material={materials.Noodle} position={[-0.035, -0.237, -0.316]} rotation={[Math.PI / 2, 0, 0]} scale={0.733} />
      <mesh geometry={nodes.Cube.geometry} material={materials.Odnag2} position={[0.272, -0.082, 0.283]} rotation={[-Math.PI, 0.285, -Math.PI]} scale={[-0.28, -0.01, -0.28]} />
      <mesh geometry={nodes.GreenOnion.geometry} material={materials['Material.001']} position={[0.011, -0.104, 0.01]} rotation={[Math.PI, -1.448, Math.PI / 2]} scale={[0.029, 0.024, 0.029]} />
    </group>
  )
}

useGLTF.preload('/assets/models/Food/Udon.glb')
