/**
 * 
 * position, scale 수정 및 그림자 설정 : 임성준
 */
import { useBox } from '@react-three/cannon'
import { useGLTF } from '@react-three/drei'
import React, { useEffect } from 'react'

export function NanumgwanRightPillar({position, ...props}) {
  const { scene, nodes, materials } = useGLTF('/assets/models/building/Nanumgwan_Pilla_R.glb')
  const [meshRef, api] = useBox(() => ({
    args: [32, 160, 41],
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
      <group scale={[0.5, 0.5, 5]}>
        <mesh geometry={nodes.Cube019.geometry} material={materials['E2EBCA.001']} />
        <mesh geometry={nodes.Cube019_1.geometry} material={materials['61544D.007']} />
        <mesh geometry={nodes.Cube019_2.geometry} material={materials['23683C.007']} />
        <mesh geometry={nodes.Cube019_3.geometry} material={materials['C0E8F6 (B1~9(Window)).007']} />
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/building/Nanumgwan_Pilla_R.glb')
