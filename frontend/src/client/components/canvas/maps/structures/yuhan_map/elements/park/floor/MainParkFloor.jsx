/** 파일생성자 : 이정민
 * 초기 position, scale 설정 : 이정민
 * position, scale 수정 및 그림자 설정 : 임성준
 */
import { useBox } from '@react-three/cannon'
import { useGLTF } from '@react-three/drei'
import React, { useEffect } from 'react'

export function MainParkFloor({position, ...props}) {
  const { scene, nodes, materials } = useGLTF('/assets/models/park/ParkPlane1.glb')

  const [meshRef, api] = useBox(() => ({
    args: [150, 1, 105],
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
    <group ref={meshRef}>
      <group position={[29, 16.5, -22]} scale={61.994}>
        <mesh geometry={nodes.Plane190.geometry} material={materials['FFFFFF (Number, BaskitBall)']} />
        <mesh geometry={nodes.Plane190_1.geometry} material={materials['23683C (RoofTop)']} />
        <mesh geometry={nodes.Plane190_2.geometry} material={materials['8F8E6E (Park)']} />
        <mesh geometry={nodes.Plane190_3.geometry} material={materials['A2A2A2(B9, Park(Rock),B5-6 Plane)']} />
        <mesh geometry={nodes.Plane190_4.geometry} material={materials['596054 (Park)']} />
        <mesh geometry={nodes.Plane190_5.geometry} material={materials['644F1C (Park Plane)']} />
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/park/ParkPlane1.glb')
