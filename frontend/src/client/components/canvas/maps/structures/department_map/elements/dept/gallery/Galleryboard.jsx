import React from 'react'
import { useGLTF } from '@react-three/drei'

export function GalleryBoard(props) {
  const { nodes, materials } = useGLTF('/assets/models/dept_gallery/galleryboard.glb')
  return (
    <group {...props} dispose={null}>
      <group scale={[5, 4, 0.5]}>
        <mesh geometry={nodes.Cube.geometry} material={materials.picturearea} />
        <mesh geometry={nodes.Cube_1.geometry} material={materials.frame} />
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/dept_gallery/galleryboard.glb')
