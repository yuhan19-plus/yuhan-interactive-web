/**
 * 물리엔진 적용 : 이정민
 * position, scale 수정 및 그림자 설정 : 임성준
 */
import { useBox } from '@react-three/cannon'
import { useGLTF } from '@react-three/drei'
import React, { useEffect } from 'react'

export function BasketballHoop({position, ...props}) {
  const { scene, nodes, materials } = useGLTF('/assets/models/etc/Park1_B1.glb')
  const [meshRef, api] = useBox(() => ({
    args: [2, 50, 2],
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
      <group position={[-44, 16, 12]} scale={61.994}>
        <mesh geometry={nodes.Plane008.geometry} material={materials['E71512 (Flower, BaskiBall, Smoking Booth)']} />
        <mesh geometry={nodes.Plane008_1.geometry} material={materials['FFFFFF (Number, BaskitBall)']} />
        <mesh geometry={nodes.Plane008_2.geometry} material={materials['E71512 (Flower, BaskiBall, Smoking Booth)']} />
        <mesh geometry={nodes.Plane008_3.geometry} material={materials['E71512 (Flower, BaskiBall, Smoking Booth)']} />
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/etc/Park1_B1.glb')
