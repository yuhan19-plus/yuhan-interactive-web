/**
 * 임성준
 * - 학과장실 오브젝트 생성 및 그림자 설정
 */
import React, { useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useBox } from '@react-three/cannon'

export function BookShelf({position, ...props}) {
  const { scene, nodes, materials } = useGLTF('/assets/models/dept_etc/bookshelf.glb')

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
      <group position={[1.217, 13.514, 0.116]} scale={[1, 1, 0.515]}>
        <mesh geometry={nodes.큐브010.geometry} material={materials.colorBlue} />
        <mesh geometry={nodes.큐브010_1.geometry} material={materials.colorWhite} />
        <mesh geometry={nodes.큐브010_2.geometry} material={materials.colorBlack} />
        <mesh geometry={nodes.큐브010_3.geometry} material={materials.colorGreen} />
        <mesh geometry={nodes.큐브010_4.geometry} material={materials.colerRed} />
        <mesh geometry={nodes.큐브010_5.geometry} material={materials.wood1} />
        <mesh geometry={nodes.큐브010_6.geometry} material={materials.wood2} />
        <mesh geometry={nodes.큐브010_7.geometry} material={materials.colorPurple} />
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/dept_etc/bookshelf.glb')
