/**
 * 물리엔진 적용 : 이정민
 * position, scale 수정 및 그림자 설정 : 임성준
 */
import { useBox } from '@react-three/cannon'
import { useGLTF } from '@react-three/drei'
import React, { useEffect } from 'react'

export function TreeEight({position, ...props}) {
  const { scene, nodes, materials } = useGLTF('/assets/models/park/Park1_T7.glb')
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
            onMove(null)
    }}>
      <group position={[30, 16, -19.5]} scale={61.994}>
        <mesh geometry={nodes.Plane007.geometry} material={materials['006400 (Leaf)']} />
        <mesh geometry={nodes.Plane007_1.geometry} material={materials['654321 (Wood)']} />
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/park/Park1_T7.glb')
