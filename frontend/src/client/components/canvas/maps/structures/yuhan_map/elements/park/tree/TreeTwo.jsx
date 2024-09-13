/**
 * 
 * position, scale 수정 및 그림자 설정 : 임성준
 */
import { useBox } from '@react-three/cannon'
import { useGLTF } from '@react-three/drei'
import React, { useEffect } from 'react'

export function TreeTwo({position, ...props}) {
  const { scene, nodes, materials } = useGLTF('/assets/models/park/Park1_T1.glb')
  const [meshRef, api] = useBox(() => ({
    args: [8, 100, 10],
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
      <group position={[74.5, 16, 7.5]} scale={61.994}>
        <mesh geometry={nodes.Plane001.geometry} material={materials['006400 (Leaf)']} />
        <mesh geometry={nodes.Plane001_1.geometry} material={materials['006400 (Leaf)']} />
        <mesh geometry={nodes.Plane001_2.geometry} material={materials['654321 (Wood)']} />
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/park/Park1_T1.glb')
