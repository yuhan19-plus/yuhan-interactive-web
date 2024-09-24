/**
 * 임성준 : 물리엔진 및 위치설정
 */
import React, { useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useBox } from '@react-three/cannon'

export function BigForest({position, ...props}) {
  const { scene, nodes, materials } = useGLTF('/assets/models/park/Forest1.glb')

  const [meshRef, api] = useBox(() => ({
    args: [135, 100, 220],
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
      <group rotation={[Math.PI / 2, 0, Math.PI / 2]} scale={[2.863, 3.072, 4.264]}>
        <mesh geometry={nodes.Text001.geometry} material={materials['A2A2A2(B9, Park(Rock),B5-6 Plane).001']} />
        <mesh geometry={nodes.Text001_1.geometry} material={materials['644F1C (Park Plane).001']} />
        <mesh geometry={nodes.Text001_2.geometry} material={materials['0CFF0F(Leaf,Smoking Booth).001']} />
        <mesh geometry={nodes.Text001_3.geometry} material={materials['0EA6EF (Leaf, Smoking Booth).001']} />
        <mesh geometry={nodes.Text001_4.geometry} material={materials['006400 (Leaf).001']} />
        <mesh geometry={nodes.Text001_5.geometry} material={materials['654321 (Wood).001']} />
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/park/Forest1.glb')
