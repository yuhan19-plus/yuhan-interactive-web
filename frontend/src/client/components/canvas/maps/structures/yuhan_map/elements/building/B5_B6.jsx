/**
 * 
 * position, scale 수정 및 그림자 설정 : 임성준
 */
import { useBox } from '@react-three/cannon'
import { useGLTF } from '@react-three/drei'
import React, { useEffect } from 'react'

export function B5_B6({position, ...props}) {
  const { scene, nodes, materials } = useGLTF('/assets/models/building/B5_B6.glb')
  const [meshRef, api] = useBox(() => ({
    args: [46, 205, 105],
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
      <group position={[0,-1,0]} rotation={[0, 0.384, 0]} scale={[0.353, 1.489, 3.966]}>
        <mesh geometry={nodes.Cube085.geometry} material={materials['A2A2A2(B9, Park(Rock),B5-6 Plane)']} />
        <mesh geometry={nodes.Cube085_1.geometry} material={materials['C0E8F6 (B1~9(Window))']} />
        <mesh geometry={nodes.Cube085_2.geometry} material={materials['E2EBCA (B1,B4,B5,B6(BodyFrame))']} />
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/building/B5_B6.glb')
