/**
 * 임성준 : 물리엔진 및 위치설정
 */
import React, { useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useBox } from '@react-three/cannon'

export function GrassThree({position, ...props}) {
  const { scene, nodes, materials } = useGLTF('/assets/models/park/GrassThree.glb')

  const [meshRef, api] = useBox(() => ({
    args: [20, 20, 15],
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
            e.stopPropagation()
    }}>
      <group scale={[4.452, 15, 4.429]}>
        <mesh geometry={nodes.실린더011.geometry} material={materials['0CFF0F(Leaf,Smoking Booth).001']} />
        <mesh geometry={nodes.실린더011_1.geometry} material={materials['0EA6EF (Leaf, Smoking Booth).001']} />
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/park/GrassThree.glb')
