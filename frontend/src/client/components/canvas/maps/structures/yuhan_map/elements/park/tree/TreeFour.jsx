/**
 * 
 * position, scale 수정 및 그림자 설정 : 임성준
 */
import { useBox } from '@react-three/cannon'
import { useGLTF } from '@react-three/drei'
import React, { useEffect } from 'react'

export function TreeFour({position, ...props}) {
  const { scene, nodes, materials } = useGLTF('/assets/models/park/Park1_T3.glb')
  const [meshRef, api] = useBox(() => ({
    args: [4, 100, 4],
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
      <group position={[60, 16, -16]} scale={61.994}>
        <mesh geometry={nodes.Plane003.geometry} material={materials['0CFF0F(Leaf,Smoking Booth)']} />
        <mesh geometry={nodes.Plane003_1.geometry} material={materials['654321 (Wood)']} />
        <mesh geometry={nodes.Plane003_2.geometry} material={materials['0EA6EF (Leaf, Smoking Booth)']} />
        <mesh geometry={nodes.Plane003_3.geometry} material={materials['006400 (Leaf)']} />
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/park/Park1_T3.glb')
