/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.4.1 Enter_L.glb -o Enter_L.jsx 
*/

import { useBox } from '@react-three/cannon'
import { useGLTF } from '@react-three/drei'
import React, { useEffect } from 'react'

export function Enter_L({position, ...props}) {
  const { scene, nodes, materials } = useGLTF('/assets/models/Enter_L.glb')
  const [meshRef, api] = useBox(() => ({
    args: [37, 80, 24],
    type: 'Static',
    mass: 1,
    position,
    ...props
  }))

  useEffect(() => {
    scene.traverse((obj) => {
      if(obj.isObject3D) {
        console.log(obj)
        obj.castShadow = true
        obj.receiveShadow = true
      }
    })
  }, [scene])

  return (
    <group ref={meshRef}>
      <mesh geometry={nodes.Enter_L.geometry} material={materials['A2A2A2(B9, Park(Rock),B5-6 Plane)']} position={[0,0,4]} scale={[8.47, 22.599, 8.47]} />
    </group>
  )
}

useGLTF.preload('/assets/models/Enter_L.glb')