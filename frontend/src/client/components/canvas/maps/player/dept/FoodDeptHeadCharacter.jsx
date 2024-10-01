import React, { useEffect, useState } from 'react'
import { useGraph } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'

export function FoodDeptHeadCharacter({groundMapName, position, ...props}) {
  const group = React.useRef()
  const { scene, animations } = useGLTF('/assets/models/character/FoodDeptHead.glb')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)
  const { actions } = useAnimations(animations, group)

  // console.log(animations)

  // 현재 실행 중인 애니메이션 상태를 저장하는 상태 변수
  const [animation, setAnimation] = useState('Cook')

  useEffect(() => {
    if(groundMapName === 'yh_map') {
      setAnimation('yes')
    }
  }, [groundMapName])

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
          <skinnedMesh name="SD_Join" geometry={nodes.SD_Join.geometry} material={materials.Skin} skeleton={nodes.SD_Join.skeleton} />
          <group name="가운">
            <skinnedMesh name="Cube001" geometry={nodes.Cube001.geometry} material={materials.white} skeleton={nodes.Cube001.skeleton} />
            <skinnedMesh name="Cube001_1" geometry={nodes.Cube001_1.geometry} material={materials.mint} skeleton={nodes.Cube001_1.skeleton} />
          </group>
          <skinnedMesh name="눈" geometry={nodes.눈.geometry} material={materials.eye} skeleton={nodes.눈.skeleton} />
          <skinnedMesh name="머리" geometry={nodes.머리.geometry} material={materials.hair} skeleton={nodes.머리.skeleton} />
          <skinnedMesh name="상의" geometry={nodes.상의.geometry} material={materials.mint} skeleton={nodes.상의.skeleton} />
          <skinnedMesh name="신발" geometry={nodes.신발.geometry} material={materials.foot} skeleton={nodes.신발.skeleton} />
          <skinnedMesh name="하의" geometry={nodes.하의.geometry} material={materials.mint} skeleton={nodes.하의.skeleton} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/character/FoodDeptHead.glb')
