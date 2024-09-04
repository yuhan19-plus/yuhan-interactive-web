/**
 * 물리엔진 적용 : 이정민
 * position, scale 수정 및 그림자 설정 : 임성준
 */
import { useBox } from '@react-three/cannon'
import { useGLTF } from '@react-three/drei'
import React, { useEffect } from 'react'

export function MemorialHallEntranceBlock({position, ...props}) {
  const { scene, nodes, materials } = useGLTF('/assets/models/building/B7_EnterBlock.glb')
  const [meshRef, api] = useBox(() => ({
    args: [18, 200, 200],
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
      <mesh geometry={nodes.B7_EnterBlock.geometry} material={materials['E2E2E2(B1~9(Body,Number)).001']} position={[65,0,1]} rotation={[0,0,0]} scale={[3.242, 3.242, 4.501]} />
    </group>
  )
}

useGLTF.preload('/assets/models/building/B7_EnterBlock.glb')
