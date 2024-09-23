import React, { useEffect, useState } from 'react'
import { useGraph } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'

export function CSDeptHeadCharacter({position, ...props}) {
  const group = React.useRef()
  const { scene, animations } = useGLTF('/assets/models/character/CSDeptHead.glb')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)
  const { actions } = useAnimations(animations, group)

  // console.log(animations)

  // 현재 실행 중인 애니메이션 상태를 저장하는 상태 변수
  const [animation, setAnimation] = useState('Laugh')

  useEffect(() => {
    if (actions && actions[animation]) {
      actions[animation].reset().fadeIn(0.3).play()
    }
    
    return () => {
      if (actions && actions[animation]) {
        actions[animation].fadeOut(0.3)
      }
    }
  }, [actions, animation])

  return (
    <group ref={group} position={position} {...props}>
      <group name="Scene">
        <group name="Armature" scale={2.032}>
          <primitive object={nodes.Hip} />
          <primitive object={nodes.Thigh_L} />
          <primitive object={nodes.Thigh_R} />
          <primitive object={nodes.neutral_bone} />
          <skinnedMesh name="Hair" geometry={nodes.Hair.geometry} material={materials.Black} skeleton={nodes.Hair.skeleton} />
          <skinnedMesh name="Jacket" geometry={nodes.Jacket.geometry} material={materials.Material} skeleton={nodes.Jacket.skeleton} />
          <skinnedMesh name="Pants" geometry={nodes.Pants.geometry} material={materials.Gray} skeleton={nodes.Pants.skeleton} />
          <group name="SD_Join">
            <skinnedMesh name="Cube067" geometry={nodes.Cube067.geometry} material={materials.Body} skeleton={nodes.Cube067.skeleton} />
            <skinnedMesh name="Cube067_1" geometry={nodes.Cube067_1.geometry} material={materials.Black} skeleton={nodes.Cube067_1.skeleton} />
          </group>
          <skinnedMesh name="Shirt" geometry={nodes.Shirt.geometry} material={materials.Wine} skeleton={nodes.Shirt.skeleton} />
          <skinnedMesh name="Shoes" geometry={nodes.Shoes.geometry} material={materials.Black} skeleton={nodes.Shoes.skeleton} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/character/CSDeptHead.glb')
