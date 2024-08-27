/**
 * 물리엔진 적용 : 이정민
 * position, scale 수정 및 그림자 설정 : 임성준
 */
import { useBox } from '@react-three/cannon'
import { useGLTF } from '@react-three/drei'
import React, { useEffect } from 'react'

export function GateOfSharingEntrance({position, ...props}) {
  const { scene, nodes, materials } = useGLTF('/assets/models/building/B9Enter.glb')
  const [meshRef, api] = useBox(() => ({
    args: [98.5, 1, 50],
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
      <mesh geometry={nodes.B9Enter.geometry} material={materials['858585 (B4,B9,B2)']} position={[0,-1,0]} rotation={[0,0,0]} scale={[39.404, 65, 60.498]} />
    </group>
  )
}

useGLTF.preload('/assets/models/building/B9Enter.glb')
