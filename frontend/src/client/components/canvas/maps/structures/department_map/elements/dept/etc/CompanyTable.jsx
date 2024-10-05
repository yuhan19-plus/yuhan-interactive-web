import React, { useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useBox } from '@react-three/cannon'

export function CompanyTable({position, ...props}) {
  const { scene, nodes, materials } = useGLTF('/assets/models/dept_etc/companyTable.glb')

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
      <group position={[-0.002, 5.782, -0.004]} scale={[5, 0.25, 7]}>
        <mesh geometry={nodes.Cube.geometry} material={materials.tableTop} />
        <mesh geometry={nodes.Cube_1.geometry} material={materials.table} />
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/dept_etc/companyTable.glb')
