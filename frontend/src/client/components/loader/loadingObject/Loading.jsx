import React, { useEffect, useRef, useMemo } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'


export function LoadingAnimation(props) {
  const group = useRef();
  const { scene } = useGLTF('/assets/models/etc/LoadingAnimation.glb');
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials, animations } = useGLTF('/assets/models/etc/LoadingAnimation.glb');
  const { actions } = useAnimations(animations || [], group);

  // console.log("GLTF Animations:", animations); // 애니메이션 데이터 확인
  
  // 애니메이션 실행
  useEffect(() => {
    if (actions) {
      // uuid로 특정 애니메이션을 찾음 Book로 같은이름인 애니매이션이 2개가 존재해서 이 과정이 필요
      const specificAction = animations.find(animation => animation.uuid === '36eb126f-fc51-4a8f-b350-0dcf45dc9020');
      const readyToSchoolAction = animations.find(animation => animation.name === 'Ready to School');

      // 해당 애니메이션을 실행
      if (specificAction && actions[specificAction.name]) {
        actions[specificAction.name].play();  // uuid로 찾은 애니메이션 실행
      }
      if (readyToSchoolAction && actions['Ready to School']) {
        actions['Ready to School'].play(); // "Ready to School" 애니메이션 실행
      }
    }
  }, [actions, animations]);
  
  return (
    <group ref={group} scale={0.3} >
      <group name="Scene">
        <group name="MainCharacter" position={[0.481, 4.632, -15.238]} scale={2.032}>
          <primitive object={nodes.Hip} />
          <primitive object={nodes.Thigh_L} />
          <primitive object={nodes.Thigh_R} />
          <group name="MainCharacter001">
            <skinnedMesh name="평면001" geometry={nodes.평면001.geometry} material={materials['colorBlack.002']} skeleton={nodes.평면001.skeleton} />
            <skinnedMesh name="평면001_1" geometry={nodes.평면001_1.geometry} material={materials['colorWihte.001']} skeleton={nodes.평면001_1.skeleton} />
            <skinnedMesh name="평면001_2" geometry={nodes.평면001_2.geometry} material={materials['colorNose.002']} skeleton={nodes.평면001_2.skeleton} />
            <skinnedMesh name="평면001_3" geometry={nodes.평면001_3.geometry} material={materials['colorBeige.002']} skeleton={nodes.평면001_3.skeleton} />
            <skinnedMesh name="평면001_4" geometry={nodes.평면001_4.geometry} material={materials['colorWihte.001']} skeleton={nodes.평면001_4.skeleton} />
            <skinnedMesh name="평면001_5" geometry={nodes.평면001_5.geometry} material={materials['colorBlack.002']} skeleton={nodes.평면001_5.skeleton} />
            <skinnedMesh name="평면001_6" geometry={nodes.평면001_6.geometry} material={materials['colorBrown.001']} skeleton={nodes.평면001_6.skeleton} />
            <skinnedMesh name="평면001_7" geometry={nodes.평면001_7.geometry} material={materials['colorGreen.001']} skeleton={nodes.평면001_7.skeleton} />
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
        <group name="Book" position={[-6.451, 7.925, -5.894]} rotation={[0, -0.196, 0]} scale={[2, 0.75, 2.75]}>
          <mesh name="Cube005" geometry={nodes.Cube005.geometry} material={materials['Book Curber1']} />
          <mesh name="Cube005_1" geometry={nodes.Cube005_1.geometry} material={materials.Paper} />
        </group>
      </group>
    </group>
  )
}


useGLTF.preload('/assets/models/etc/LoadingAnimation.glb')