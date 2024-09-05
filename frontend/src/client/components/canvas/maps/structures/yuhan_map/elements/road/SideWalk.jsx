/**
 * 물리엔진 적용 : 이정민
 * position 및 scale 등 수정 : 임성준
 */
import { useBox } from '@react-three/cannon'
import { useGLTF } from '@react-three/drei'
import React, { useEffect } from 'react'

export function SideWalk({ position, ...props }) {
  const { scene, nodes, materials } = useGLTF('/assets/models/sidewalk/SideWalk.glb')
  const [meshRef, api] = useBox(() => ({
    args: [0, 0, 0],
    type: 'Static',
    mass: 0,
    position,
    ...props
  }))

  useEffect(() => {
    scene.traverse((obj) => {
      if (obj.isObject3D) {
        obj.castShadow = true
        obj.receiveShadow = true
      }
    })
  }, [scene])

  return (
    <group ref={meshRef}>
      <group position={[126.747, -0.139, 71]} scale={[9.444, 0.001, 75]}>
        <mesh geometry={nodes.Cube003_1.geometry} material={materials['E77759 (SideWalk).003']} />
        <mesh geometry={nodes.Cube003_4.geometry} material={materials['644F1C (Park Plane).002']} />
        <mesh geometry={nodes.Cube003_5.geometry} material={materials['AAAAAA (B8).002']} />
        <mesh geometry={nodes.Cube003_6.geometry} material={materials['96947D(B2(Window Frame),B6(Stone)).002']} />
      </group>
      {/* 5,6호관 사이 테라스 */}
      <group position={[126.747, 0.139, 71]} scale={[9.444, 0.001, 75]}>
      <mesh geometry={nodes.Cube003.geometry} material={materials['A2A2A2(B9, Park(Rock),B5-6 Plane).002']} />
        <mesh geometry={nodes.Cube003_2.geometry} material={materials['654321 (Wood).004']} />
      </group>
      <group position={[126.747, -1.5, 70.783]} scale={[9.444, 0.001, 75]}>
        <mesh geometry={nodes.Cube003_3.geometry} material={materials['FFFFFF (Number, BaskitBall).003']} />
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/sidewalk/SideWalk.glb')
