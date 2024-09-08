/**
 * 
 * position, scale 수정 및 그림자 설정 : 임성준
 */
import { useBox } from '@react-three/cannon'
import { useGLTF } from '@react-three/drei'
import React, { useEffect } from 'react'

export function TerraceObjectBig({position, ...props}) {
  const { scene, nodes, materials } = useGLTF('/assets/models/terrace/CT2.glb')
  const [meshRef, api] = useBox(() => ({
    args: [37, 20, 21],
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
      <group position={[4.5,0,-9.5]} scale={[0.25, 0.25, 3.25]}>
        <mesh geometry={nodes.Cube018.geometry} material={materials['000000 & Metal (C2,T2)']} />
        <mesh geometry={nodes.Cube018_1.geometry} material={materials['AF9562 (C2)']} />
        <mesh geometry={nodes.Cube018_2.geometry} material={materials['2F0708 (B4,B8,B9(Window Frame),T2(Table))']} />
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/terrace/CT2.glb')
