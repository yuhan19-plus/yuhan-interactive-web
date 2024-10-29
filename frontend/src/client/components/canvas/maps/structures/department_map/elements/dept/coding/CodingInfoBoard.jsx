/*
* 파일 생성 오자현
* 오브젝트 생성 이석재
* 오브젝트 수정 오자현
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'

export function CodingInfoBoard({ position, rotation }) {
  const { nodes, materials } = useGLTF('/assets/models/etc/Board.glb')
  
  return (
    <group position={position} rotation={rotation} scale={2}>
      <group position={[-0.114, 1.6, 0]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} scale={[4, 1, 4]}>
        <mesh geometry={nodes.Python_1.geometry} material={materials.Python} />
        <mesh geometry={nodes.Python_2.geometry} material={materials.매테리얼} />
        <mesh geometry={nodes.Python_3.geometry} material={materials['매테리얼.001']} />
        <mesh geometry={nodes.Python_4.geometry} material={materials.C} />
        <mesh geometry={nodes.Python_5.geometry} material={materials.JAVA} />
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/etc/Board.glb')
