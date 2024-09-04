/**
 * 임성준 : 물리엔진 및 위치설정
 */
import React, { useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useBox } from '@react-three/cannon'

export function GrassFour({position, ...props}) {
  const { scene, nodes, materials } = useGLTF('/assets/models/park/GrassFour.glb')

  const [meshRef, api] = useBox(() => ({
    args: [23, 20, 20],
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
      <mesh geometry={nodes.GrassFour.geometry} material={materials['006400 (Leaf).001']} position={[-0.04, 10.182, -3.66]} rotation={[-Math.PI, 0, -Math.PI]} scale={[4.452, 15, 4.429]} />
    </group>
  )
}

useGLTF.preload('/assets/models/park/GrassFour.glb')
