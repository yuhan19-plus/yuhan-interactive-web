/**
 * 물리엔진 적용 : 이정민
 * position, scale 수정 및 그림자 설정 : 임성준
 */
import { useBox } from '@react-three/cannon'
import { useGLTF } from '@react-three/drei'
import React, { useEffect } from 'react'

export function TreeEleven({position, ...props}) {
  const { scene, nodes, materials } = useGLTF('/assets/models/park/Park2_T3.glb')
  const [meshRef, api] = useBox(() => ({
    args: [7, 55, 7],
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
      <group position={[-5,-1.4,-5]} scale={[-71.906, -42.936, -48.895]}>
        <mesh geometry={nodes.Plane003.geometry} material={materials['006400 (Leaf)']} />
        <mesh geometry={nodes.Plane003_1.geometry} material={materials['654321 (Wood)']} />
        <mesh geometry={nodes.Plane003_2.geometry} material={materials['006400 (Leaf)']} />
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/park/Park2_T3.glb')
