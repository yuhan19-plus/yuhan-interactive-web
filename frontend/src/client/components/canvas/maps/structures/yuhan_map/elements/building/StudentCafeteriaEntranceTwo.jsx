/**
 * 물리엔진 적용 : 이정민
 * position, scale 수정 및 그림자 설정 : 임성준
 */
import { useBox } from '@react-three/cannon'
import { useGLTF } from '@react-three/drei'
import React, { useEffect } from 'react'

export function StudentCafeteriaEntranceTwo({position, ...props}) {
  const { scene, nodes, materials } = useGLTF('/assets/models/building/B4Enter2.glb')
  const [meshRef, api] = useBox(() => ({
    args: [9, 5, 43],
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
      <mesh geometry={nodes.B4Enter2.geometry} material={materials['858585 (B4,B9,B2)']} position={[0,-1.3,0]} rotation={[0,0,0]} scale={[18.7, 4, 39]} />
    </group>
  )
}

useGLTF.preload('/assets/models/building/B4Enter2.glb')
