import React, { useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useBox } from '@react-three/cannon'

export function Zone({position, ...props}) {
  const { scene, nodes, materials } = useGLTF('/assets/models/dept_etc/zone.glb')

  const [meshRef, api] = useBox(() => ({
    args: [285, 60, 150],
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
    <group position={position} {...props}>
      <group position={[6.287, 2.188, 0]} scale={[0.26, 2.199, 0.26]}>
        <mesh geometry={nodes.실린더001_1.geometry} material={materials.매테리얼} />
        <mesh geometry={nodes.실린더001_2.geometry} material={materials.Material} />
        <mesh geometry={nodes.실린더001_3.geometry} material={materials['매테리얼.001']} />
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/dept_etc/zone.glb')
