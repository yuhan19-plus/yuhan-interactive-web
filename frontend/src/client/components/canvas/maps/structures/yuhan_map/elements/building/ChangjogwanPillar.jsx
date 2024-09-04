/**
 * 물리엔진 적용 : 이정민
 * position, scale 수정 및 그림자 설정 : 임성준
 */
import { useBox } from '@react-three/cannon'
import { useGLTF } from '@react-three/drei'
import React, { useEffect } from 'react'

export function ChangjogwanPillar({position, ...props}) {
  const { scene, nodes, materials } = useGLTF('/assets/models/building/Changjogwan_Pilla.glb')
  const [meshRef, api] = useBox(() => ({
    args: [45, 205, 42.5],
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
      <group scale={[21, 82.5, 15]}>
        <mesh geometry={nodes.Cube005.geometry} material={materials['61544D.005']} />
        <mesh geometry={nodes.Cube005_1.geometry} material={materials['23683C.005']} />
        <mesh geometry={nodes.Cube005_2.geometry} material={materials['Windows.008']} />
        <mesh geometry={nodes.Cube005_3.geometry} material={materials['E2EBCA.008']} />
        <mesh geometry={nodes.Cube005_4.geometry} material={materials['Windows.009']} />
        <mesh geometry={nodes.Cube005_5.geometry} material={materials['E2EBCA.009']} />
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/building/Changjogwan_Pilla.glb')
