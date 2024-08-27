/**
 * 물리엔진 적용 : 이정민
 * position, scale 수정 및 그림자 설정 : 임성준
 */
import { useBox } from '@react-three/cannon'
import { useGLTF } from '@react-three/drei'
import React, { useEffect } from 'react'

export function TreeFourteen({position, ...props}) {
  const { scene, nodes, materials } = useGLTF('/assets/models/park/Park2_T6.glb')
  const [meshRef, api] = useBox(() => ({
    args: [4, 50, 4],
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
      <group position={[-1.5,-1.4,0]} scale={[-71.906, -42.936, -48.895]}>
        <mesh geometry={nodes.Plane006.geometry} material={materials['0EA6EF (Leaf, Smoking Booth)']} />
        <mesh geometry={nodes.Plane006_1.geometry} material={materials['654321 (Wood)']} />
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/park/Park2_T6.glb')
