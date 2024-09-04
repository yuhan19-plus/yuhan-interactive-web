/**
 * 물리엔진 적용 : 이정민
 * position, scale 수정 및 그림자 설정 : 임성준
 */
import { useBox } from '@react-three/cannon'
import { useGLTF } from '@react-three/drei'
import React, { useEffect } from 'react'

export function FlowerBed({position, ...props}) {
  const { scene, nodes, materials } = useGLTF('/assets/models/park/GrassAndTree.glb')
  const [meshRef, api] = useBox(() => ({
    args: [26, 50, 180],
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
      <group position={[0,-1,0]} rotation={[0,0,0]} scale={[12.72, 2.183, 87.156]}>
        <mesh geometry={nodes.Cube013.geometry} material={materials['A2A2A2(B9, Park(Rock),B5-6 Plane)']} />
        <mesh geometry={nodes.Cube013_1.geometry} material={materials['644F1C (Park Plane)']} />
        <mesh geometry={nodes.Cube013_2.geometry} material={materials['0CFF0F(Leaf,Smoking Booth)']} />
        <mesh geometry={nodes.Cube013_3.geometry} material={materials['0EA6EF (Leaf, Smoking Booth)']} />
        <mesh geometry={nodes.Cube013_4.geometry} material={materials['006400 (Leaf)']} />
        <mesh geometry={nodes.Cube013_5.geometry} material={materials['654321 (Wood)']} />
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/park/GrassAndTree.glb')
