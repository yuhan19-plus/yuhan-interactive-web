/**
 * 물리엔진 적용 : 이정민
 * position, scale 수정 및 그림자 설정 : 임성준
 */
import { useBox } from '@react-three/cannon'
import { useGLTF } from '@react-three/drei'
import React, { useEffect } from 'react'

export function GateOfSharingRightPillar({position, ...props}) {
  const { scene, nodes, materials } = useGLTF('/assets/models/building/B9-Pipe_R.glb')
  const [meshRef, api] = useBox(() => ({
    args: [50, 220, 5],
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
      <mesh geometry={nodes['B9-Pipe_R'].geometry} material={materials['E2E2E2(B1~9(Body,Number))']} position={[5,-1,0]} rotation={[0,0,0]} scale={[39.404, 65, 60.498]} />
    </group>
  )
}

useGLTF.preload('/assets/models/building/B9-Pipe_R.glb')
