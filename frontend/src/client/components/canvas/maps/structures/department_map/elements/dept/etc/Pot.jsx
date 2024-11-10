/**
 * 임성준
 * - 학과장실 오브젝트 생성 및 그림자 설정
 */

import React, { useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useBox } from '@react-three/cannon'

export function Pot({position, ...props}) {
  const { scene, nodes, materials } = useGLTF('/assets/models/dept_etc/pot.glb')
  
  const [meshRef, api] = useBox(() => ({
    args: [285, 60, 150],
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
    <group position={position} {...props}>
      <group position={[-4.066, 4.324, -0.149]} rotation={[-0.302, 0.914, -2.314]} scale={0.3}>
        <mesh geometry={nodes.큐브002_1.geometry} material={materials.colorGreen} scale={1.5} />
        <mesh geometry={nodes.큐브002_2.geometry} material={materials.colorBlack} />
        <mesh geometry={nodes.큐브002_3.geometry} material={materials.colorWood} />
        <mesh geometry={nodes.큐브002_4.geometry} material={materials.colorBrwon} />
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/dept_etc/pot.glb')