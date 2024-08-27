/**
 * 물리엔진 적용 : 이정민
 * position, scale 수정 및 그림자 설정 : 임성준
 */
import { useBox } from '@react-three/cannon'
import { useGLTF } from '@react-three/drei'
import React, { useEffect } from 'react'

export function TreeSeven({position, ...props}) {
  const { scene, nodes, materials } = useGLTF('/assets/models/park/Park1_T6.glb')
  const [meshRef, api] = useBox(() => ({
    args: [5, 100, 5],
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
    <group ref={meshRef}>
      <group position={[-28, 16, -36]} scale={61.994}>
        <mesh geometry={nodes.Plane006.geometry} material={materials['0CFF0F(Leaf,Smoking Booth)']} />
        <mesh geometry={nodes.Plane006_1.geometry} material={materials['654321 (Wood)']} />
        <mesh geometry={nodes.Plane006_2.geometry} material={materials['0EA6EF (Leaf, Smoking Booth)']} />
        <mesh geometry={nodes.Plane006_3.geometry} material={materials['006400 (Leaf)']} />
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/park/Park1_T6.glb')
