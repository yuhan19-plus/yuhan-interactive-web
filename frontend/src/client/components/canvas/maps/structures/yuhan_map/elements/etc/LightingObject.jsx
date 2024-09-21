import React, { useEffect } from 'react'
import { useGLTF } from '@react-three/drei'

export function LightingObject({position, ...props}) {
  const { scene, nodes, materials } = useGLTF('/assets/models/etc/Lighting.glb')
  useEffect(() => {
    scene.traverse((obj) => {
      if(obj.isObject3D) {
        obj.castShadow = true
        obj.receiveShadow = true
      }
    })
  }, [scene])
  return (
    <group position={position} {...props} scale={10}>
      <mesh geometry={nodes.Cube.geometry} material={materials.colorBlack} position={[0, 1.674, 0]} scale={0.585} />
      <mesh geometry={nodes.원뿔.geometry} material={materials.colorBlack} position={[0.448, 2.072, 0]} rotation={[0, 0, 2.222]} />
      <mesh geometry={nodes.원뿔001.geometry} position={[0.448, 2.072, 0]} rotation={[0, 0, 2.222]}>
          <meshStandardMaterial color={'white'} />
      </mesh>
    </group>
  )
}

useGLTF.preload('/assets/models/etc/Lighting.glb')
