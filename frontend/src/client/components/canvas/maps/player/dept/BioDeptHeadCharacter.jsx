import React, { useEffect, useState } from 'react'
import { useGraph } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'

export function BioDeptHeadCharacter({groundMapName, position, ...props}) {
  const group = React.useRef()
  const { scene, animations } = useGLTF('/assets/models/character/DepartmentHead.glb')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)

  const { actions } = useAnimations(animations, group)

  // 현재 실행 중인 애니메이션 상태를 저장하는 상태 변수
  const [animation, setAnimation] = useState('Hello')

  // console.log(animations)

  useEffect(() => {
    if(groundMapName !== 'yh_map') {
      setAnimation('Typing')
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
        <group name="DepartmentHeadChar" position={[-114.285, 9.75, 21.227]} scale={2.032}>
          <primitive object={nodes.Hip} />
          <primitive object={nodes.Thigh_L} />
          <primitive object={nodes.Thigh_R} />
          <group name="DepartmentHead">
            <skinnedMesh name="Cylinder005" geometry={nodes.Cylinder005.geometry} material={materials.Skin} skeleton={nodes.Cylinder005.skeleton} />
            <skinnedMesh name="Cylinder005_1" geometry={nodes.Cylinder005_1.geometry} material={materials.colorBlack} skeleton={nodes.Cylinder005_1.skeleton} />
            <skinnedMesh name="Cylinder005_2" geometry={nodes.Cylinder005_2.geometry} material={materials.colorBrown} skeleton={nodes.Cylinder005_2.skeleton} />
            <skinnedMesh name="Cylinder005_3" geometry={nodes.Cylinder005_3.geometry} material={materials.colorPants} skeleton={nodes.Cylinder005_3.skeleton} />
            <skinnedMesh name="Cylinder005_4" geometry={nodes.Cylinder005_4.geometry} material={materials.colorBeige} skeleton={nodes.Cylinder005_4.skeleton} />
            <skinnedMesh name="Cylinder005_5" geometry={nodes.Cylinder005_5.geometry} material={materials.colorWihte} skeleton={nodes.Cylinder005_5.skeleton} />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/character/DepartmentHead.glb')