/**
 * 
 * position, scale 수정 및 그림자 설정 : 임성준
 */
import { useBox } from '@react-three/cannon'
import { useGLTF } from '@react-three/drei'
import React, { useEffect } from 'react'

export function TreeSix({position, ...props}) {
  const { scene, nodes, materials } = useGLTF('/assets/models/park/Park1_T5.glb')
  const [meshRef, api] = useBox(() => ({
    args: [8, 100, 8],
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
            onMove(null)
    }}>
      <group position={[7, 16, -49]} scale={61.994}>
        <mesh geometry={nodes.Plane005.geometry} material={materials['654321 (Wood)']} />
        <mesh geometry={nodes.Plane005_1.geometry} material={materials['006400 (Leaf)']} />
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/park/Park1_T5.glb')
