/**
 * 
 * position, scale 수정 및 그림자 설정 : 임성준
 */
import { useBox } from '@react-three/cannon'
import { useGLTF } from '@react-three/drei'
import React, { useEffect } from 'react'

export function Wire_Netting({position, ...props}) {
  const { scene, nodes, materials } = useGLTF('/assets/models/etc/Wire_netting.glb')
  const [meshRef, api] = useBox(() => ({
    args: [360, 2, 25],
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
      <mesh geometry={nodes.Wire_netting.geometry} material={materials['0CFF0F(Leaf,Smoking Booth).001']} position={[0,0,1.3]} rotation={[0,0,0]} scale={[7.5, 9.082, 9.947]} />
    </group>
  )
}

useGLTF.preload('/assets/models/etc/Wire_netting.glb')
