import React, { useEffect } from 'react'
import { useGLTF } from '@react-three/drei'

export function NoEntry(props) {
  const { scene, nodes, materials } = useGLTF('/assets/models/etc/NoEntry.glb')

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
      {...props}
      onPointerUp={(e) => {
        e.stopPropagation()
      }}
    >
      <mesh geometry={nodes.실린더.geometry} material={materials.Material} position={[0, 8.898, 0]} rotation={[0, 0, -Math.PI / 2]} scale={[1, 10.078, 1]} />
      <mesh geometry={nodes.텍스트.geometry} material={materials.colorRed} position={[-0.442, 6.3, 2.772]} rotation={[Math.PI / 4, 0, 0]} scale={1.982} />
    </group>
  )
}

useGLTF.preload('/assets/models/etc/NoEntry.glb')