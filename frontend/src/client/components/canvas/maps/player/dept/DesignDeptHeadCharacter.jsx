import React, { useEffect, useState } from 'react'
import { useGraph } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'

export function DesignDeptHeadCharacter({position, ...props}) {
  const group = React.useRef()
  const { scene, animations } = useGLTF('/assets/models/character/DesignDeptHead.glb')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)
  const { actions } = useAnimations(animations, group)
  // console.log(animations)

  // 현재 실행 중인 애니메이션 상태를 저장하는 상태 변수
  const [animation, setAnimation] = useState('Draw')

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
        <group name="Armature" position={[0, 14.076, 0.416]} scale={2.032}>
          <primitive object={nodes.Hip} />
          <primitive object={nodes.Thigh_L} />
          <primitive object={nodes.Thigh_R} />
          <skinnedMesh name="Hair" geometry={nodes.Hair.geometry} material={materials.Hair} skeleton={nodes.Hair.skeleton} />
          <skinnedMesh name="Jaket" geometry={nodes.Jaket.geometry} material={materials.Cloth} skeleton={nodes.Jaket.skeleton} />
          <skinnedMesh name="Pants" geometry={nodes.Pants.geometry} material={materials.Cloth} skeleton={nodes.Pants.skeleton} />
          <group name="SD">
            <skinnedMesh name="Cube004" geometry={nodes.Cube004.geometry} material={materials.Eye} skeleton={nodes.Cube004.skeleton} />
            <skinnedMesh name="Cube004_1" geometry={nodes.Cube004_1.geometry} material={materials.Skin} skeleton={nodes.Cube004_1.skeleton} />
            <skinnedMesh name="Cube004_2" geometry={nodes.Cube004_2.geometry} material={materials.Butten} skeleton={nodes.Cube004_2.skeleton} />
          </group>
          <skinnedMesh name="Shirt" geometry={nodes.Shirt.geometry} material={materials.shirt} skeleton={nodes.Shirt.skeleton} />
          <skinnedMesh name="Shose" geometry={nodes.Shose.geometry} material={materials.Shose} skeleton={nodes.Shose.skeleton} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/character/DesignDeptHead.glb')
