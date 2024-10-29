/** 
 * 파일 생성자 : 오자현
 * 오브젝트, 애니매이션 담당 : 이정민
 * 크기,위치조정 : 오자현
 */

import React, { useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'

export function LoadingAnimation(props) {
  const group = React.useRef()
  
  const { scene, nodes, materials, animations } = useGLTF('/assets/models/etc/LoadingAnimation.glb');

  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])

  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    if (actions) {
      // 애니메이션 활성화
      actions["Ready to School"].play();
    }
  }, [actions]);

  return (
    <group ref={group} scale={0.3} position={[0, -3, 0]} rotation={[0, Math.PI / 8, 0]} >
      <group name="Scene">
        <group name="MainCharacter" position={[-0.94, 5.006, -15.771]} scale={2.032}>
          <primitive object={nodes.Hip} />
          <primitive object={nodes.Thigh_L} />
          <primitive object={nodes.Thigh_R} />
          <group name="MainCharacter001">
            <skinnedMesh name="평면001" geometry={nodes.평면001.geometry} material={materials['colorBlack.002']} skeleton={nodes.평면001.skeleton} />
            <skinnedMesh name="평면001_1" geometry={nodes.평면001_1.geometry} material={materials['colorWihte.001']} skeleton={nodes.평면001_1.skeleton} />
            <skinnedMesh name="평면001_2" geometry={nodes.평면001_2.geometry} material={materials['colorNose.002']} skeleton={nodes.평면001_2.skeleton} />
            <skinnedMesh name="평면001_3" geometry={nodes.평면001_3.geometry} material={materials['colorBeige.002']} skeleton={nodes.평면001_3.skeleton} />
            <skinnedMesh name="평면001_4" geometry={nodes.평면001_4.geometry} material={materials['colorBrown.001']} skeleton={nodes.평면001_4.skeleton} />
            <skinnedMesh name="평면001_5" geometry={nodes.평면001_5.geometry} material={materials['colorGreen.001']} skeleton={nodes.평면001_5.skeleton} />
            <skinnedMesh name="평면001_6" geometry={nodes.평면001_6.geometry} material={materials['Book Curber1']} skeleton={nodes.평면001_6.skeleton} />
            <skinnedMesh name="평면001_7" geometry={nodes.평면001_7.geometry} material={materials.Paper} skeleton={nodes.평면001_7.skeleton} />
          </group>
        </group>
        <group name="Table" position={[12.875, -4.75, -2.759]} rotation={[0, Math.PI / 2, 0]} scale={[5.848, 0.325, 0.325]}>
          <mesh name="Cube021" geometry={nodes.Cube021.geometry} material={materials['Iron Frame(Dark)']} />
          <mesh name="Cube021_1" geometry={nodes.Cube021_1.geometry} material={materials.DarkBrownWood} />
          <mesh name="Cube021_2" geometry={nodes.Cube021_2.geometry} material={materials.BagColor1} />
          <mesh name="Cube021_3" geometry={nodes.Cube021_3.geometry} material={materials.BagColor2} />
          <mesh name="Cube021_4" geometry={nodes.Cube021_4.geometry} material={materials.BookCurber2} />
          <mesh name="Cube021_5" geometry={nodes.Cube021_5.geometry} material={materials.Paper} />
          <mesh name="Cube021_6" geometry={nodes.Cube021_6.geometry} material={materials.BookCurber3} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/etc/LoadingAnimation.glb')
