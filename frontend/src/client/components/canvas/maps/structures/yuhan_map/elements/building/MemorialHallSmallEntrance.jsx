/**
 * 물리엔진 적용 : 이정민
 * position, scale 수정 및 그림자 설정 : 임성준
 */
import { useBox } from '@react-three/cannon'
import { useGLTF } from '@react-three/drei'
import React, { useEffect } from 'react'

export function MemorialHallSmallEntrance({position, ...props}) {
  const { scene, nodes, materials } = useGLTF('/assets/models/building/B7_Enter2.glb')
  const [meshRef, api] = useBox(() => ({
    args: [15, 14, 150],
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
      <group position={[80,-85,1]} rotation={[0,0,0]} scale={[3.242, 3.242, 4.501]}>
        <mesh geometry={nodes.Text007.geometry} material={materials['E2E2E2(B1~9(Body,Number)).001']} />
        <mesh geometry={nodes.Text007_1.geometry} material={materials['E2EBCA (B1,B4,B5,B6(BodyFrame)).001']} />
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/building/B7_Enter2.glb')
