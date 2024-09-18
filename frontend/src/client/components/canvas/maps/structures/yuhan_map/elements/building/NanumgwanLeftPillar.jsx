/** 파일생성자 : 이정민
 * 초기 position, scale 설정 : 이정민
 * position, scale 수정 및 그림자 설정 : 임성준
 */

import { useBox } from '@react-three/cannon'
import { useGLTF } from '@react-three/drei'
import React, { useEffect } from 'react'

export function NanumgwanLeftPillar({position, ...props}) {
  const { scene, nodes, materials } = useGLTF('/assets/models/building/Nanumgwan_Pilla_L.glb')
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
            onMove(null)
    }}>
      <group scale={[5.5, 80, 0.05]}>
        <mesh geometry={nodes.Cube011.geometry} material={materials['C0E8F6 (B1~9(Window)).001']} />
        <mesh geometry={nodes.Cube011_1.geometry} material={materials['61544D.001']} />
        <mesh geometry={nodes.Cube011_2.geometry} material={materials['23683C.001']} />
        <mesh geometry={nodes.Cube011_3.geometry} material={materials['E2EBCA.001']} />
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/building/Nanumgwan_Pilla_L.glb')
