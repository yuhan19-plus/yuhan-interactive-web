/** 파일생성자 : 이정민
 * 초기 position, scale 설정 : 이정민
 * position, scale 수정 및 그림자 설정 : 임성준
 */

import { useBox } from '@react-three/cannon'
import { useGLTF } from '@react-three/drei'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useSelector } from 'react-redux'

export function SmokingArea({position, scale, ...props}) {
  const { scene, nodes, materials } = useGLTF('/assets/models/etc/SmokingArea.glb')
  const [meshRef, api] = useBox(() => ({
    args: [46, 40, 24],
    type: 'Static',
    mass: 1,
    position,
    scale,
    ...props
  }))

  const smokingAreaState = useSelector((state) => state.btnMenu.value && state.btnMenu.btnMenuName === 'smokingAreaView')

  useEffect(() => {
    // 흡연구역 상태가 활성화되면 애니메이션 시작
    if (smokingAreaState) {
      gsap.to(meshRef.current.scale, {
        x: 2.5, y: 2.5, z: 2.5, 
        duration: 0.5,
        yoyo: true, 
        repeat: -1, 
        ease: "power1.inOut"
      })
    } else {
      // 흡연구역 상태가 해지되면 원래 크기로 복귀
      gsap.killTweensOf(meshRef.current.scale) // 현재 진행 중인 애니메이션을 중단
      gsap.to(meshRef.current.scale, {
        x: 1, y: 1, z: 1, 
        duration: 1,
        ease: "power1.inOut"
      })
    }
  }, [smokingAreaState]) // smokingAreaState 변경을 감지

  useEffect(() => {
    scene.traverse((obj) => {
      if(obj.isObject3D) {
        obj.castShadow = true
        obj.receiveShadow = true
      }
    })
  }, [scene])

  return (
    <group
      ref={meshRef}
      onPointerUp={(e) => {
            e.stopPropagation()
    }}>
      <group position={[0,1.5,0]} rotation={[0,0,0]} scale={scale}>
        <mesh geometry={nodes.Pillar001.geometry} material={materials['654321 (Wood)']} />
        <mesh geometry={nodes.Pillar001_1.geometry} material={materials['774D15(SmokingBench)']} />
        <mesh geometry={nodes.Pillar001_3.geometry} material={materials['33AF6A(Smoking Area RoofTop)']} />
        <mesh geometry={nodes.Pillar001_4.geometry} material={materials.smoking} />
      </group>
      <group position={[0,4,0]} rotation={[0,0,0]} scale={scale}>
        <mesh geometry={nodes.Pillar001_2.geometry} material={materials['1760E7(Trashbaskit)']} />
        <mesh geometry={nodes.Pillar001_5.geometry} material={materials['8A4636 (Smoking Area)']} />
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/etc/SmokingArea.glb')