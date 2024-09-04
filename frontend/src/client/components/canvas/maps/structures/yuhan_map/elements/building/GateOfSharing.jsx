/**
 * 물리엔진 적용 : 이정민
 * position, scale 수정 및 그림자 설정 : 임성준
 */
import { useBox } from '@react-three/cannon'
import { useGLTF } from '@react-three/drei'
import React, { useEffect } from 'react'

export function GateOfSharing({position, ...props}) {
  const { scene, nodes, materials } = useGLTF('/assets/models/building/B9.glb')
  const [meshRef, api] = useBox(() => ({
    args: [75, 140, 110],
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
      <group position={[5,-1,0]} rotation={[0,0,0]} scale={[39.404, 65, 60.498]}>
        <mesh geometry={nodes.Cylinder001.geometry} material={materials['A2A2A2(B9, Park(Rock),B5-6 Plane).001']} />
        <mesh geometry={nodes.Cylinder001_1.geometry} material={materials['E2E2E2(B1~9(Body,Number)).001']} />
        <mesh geometry={nodes.Cylinder001_2.geometry} material={materials['2F0708 (B4,B8,B9(Window Frame),T2(Table)).001']} />
        <mesh geometry={nodes.Cylinder001_3.geometry} material={materials['C0E8F6 (B1~9(Window)).001']} />
        <mesh geometry={nodes.Cylinder001_4.geometry} material={materials['D2D2D2 & Metal (B4,B5,B6,B7).001']} />
        <mesh geometry={nodes.Cylinder001_5.geometry} material={materials['18226AA (Number Plane).001']} />
        <mesh geometry={nodes.Cylinder001_6.geometry} material={materials['YuhanLogo(B9, Kiosk).001']} />
        <mesh geometry={nodes.Cylinder001_7.geometry} material={materials['000000 & Metal (C2,T2).001']} />
        <mesh geometry={nodes.Cylinder001_8.geometry} material={materials['AF9562 (C2).001']} />
        <mesh geometry={nodes.Cylinder001_9.geometry} material={materials['DCE759 & Metal (DEVName, Statue)']} />
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/building/B9.glb')
