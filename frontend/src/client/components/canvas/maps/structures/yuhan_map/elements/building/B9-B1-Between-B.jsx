/** 파일생성자 : 이정민
 * 초기 position, scale 설정 : 이정민
 * position, scale 수정 및 그림자 설정 : 임성준
 */
import { useBox } from '@react-three/cannon'
import { useGLTF } from '@react-three/drei'
import React, { useEffect } from 'react'

export function B9_B1_Between_B({position, ...props}) {
  const { scene, nodes, materials } = useGLTF('/assets/models/building/B9-B1-Between-B.glb')
  const [meshRef, api] = useBox(() => ({
    args: [63, 140, 95],
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
      <group position={[7,-1.3,0]} rotation={[0,0,0]} scale={[-25.054, -75.261, -13.44]}>
        <mesh geometry={nodes.Cube079.geometry} material={materials['858585 (B4,B9,B2)']} />
        <mesh geometry={nodes.Cube079_1.geometry} material={materials['FFFFFF (Number, BaskitBall)']} />
        <mesh geometry={nodes.Cube079_2.geometry} material={materials['E2EBCA (B1,B4,B5,B6(BodyFrame))']} />
        <mesh geometry={nodes.Cube079_3.geometry} material={materials['000000 & Metal (C2,T2)']} />
        <mesh geometry={nodes.Cube079_4.geometry} material={materials['AF9562 (C2)']} />
        <mesh geometry={nodes.Cube079_5.geometry} material={materials['2F0708 (B4,B8,B9(Window Frame),T2(Table))']} />
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/building/B9-B1-Between-B.glb')
