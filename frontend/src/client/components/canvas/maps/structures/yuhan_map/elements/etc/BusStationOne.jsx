/**
 * 
 * position, scale 수정 및 그림자 설정 : 임성준
 */
import { useBox } from '@react-three/cannon'
import { useGLTF } from '@react-three/drei'
import React, { useEffect } from 'react'

export function BusStationOne({position, ...props}) {
  const { scene, nodes, materials } = useGLTF('/assets/models/etc/BusStation1.glb')
  const [meshRef, api] = useBox(() => ({
    args: [8, 20, 36],
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
      <group position={[-3,-1.3,0]} scale={[1.027, 6.844, 6.844]}>
        <mesh geometry={nodes.Cube057.geometry} material={materials['373737 (BusStaion)']} />
        <mesh geometry={nodes.Cube057_1.geometry} material={materials['373737 (BusStaion)']} />
        <mesh geometry={nodes.Cube057_2.geometry} material={materials['FFFFFF (Number, BaskitBall)']} />
        <mesh geometry={nodes.Cube057_3.geometry} material={materials['1760E7(Trashbaskit)']} />
        <mesh geometry={nodes.Cube057_4.geometry} material={materials['E71512 (Flower, BaskiBall, Smoking Booth)']} />
        <mesh geometry={nodes.Cube057_5.geometry} material={materials['FFFFFF (Number, BaskitBall)']} />
        <mesh geometry={nodes.Cube057_6.geometry} material={materials['C0E8F6 (B1~9(Window))']} />
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/etc/BusStation1.glb')
