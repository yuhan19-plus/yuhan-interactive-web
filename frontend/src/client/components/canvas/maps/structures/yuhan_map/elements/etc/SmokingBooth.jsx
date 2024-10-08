/** 파일생성자 : 이정민
 * 초기 position, scale 설정 : 이정민
 * position, scale 수정 및 그림자 설정 : 임성준
 */
import { useBox } from '@react-three/cannon'
import { useGLTF } from '@react-three/drei'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useSelector } from 'react-redux'

export function SmokingBooth({position, ...props}) {
  const { scene, nodes, materials } = useGLTF('/assets/models/etc/SmokingBooth.glb')
  const [meshRef, api] = useBox(() => ({
    args: [24, 30, 32],
    type: 'Static',
    mass: 1,
    position,
    ...props
  }))

  const boothRef = useRef();

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
      <group position={[1,-1,-1.5]} scale={[10.993, 9.714, 15.914]}>
        <mesh geometry={nodes.Cube002.geometry} material={materials['0CFF0F(Leaf,Smoking Booth).001']} />
        <mesh geometry={nodes.Cube002_1.geometry} material={materials['C0E8F6 (B1~9(Window)).001']} />
        <mesh geometry={nodes.Cube002_2.geometry} material={materials['FFFFFF (Number, BaskitBall).001']} />
        <mesh geometry={nodes.Cube002_3.geometry} material={materials['D2D2D2 & Metal (B4,B5,B6,B7).001']} />
        <mesh geometry={nodes.Cube002_4.geometry} material={materials['006400 (Leaf).001']} />
        <mesh geometry={nodes.Cube002_5.geometry} material={materials['2CC337 (Smoking Booth).001']} />
        <mesh geometry={nodes.Cube002_6.geometry} material={materials['000000 (B1, B2, B9, Smoking Booth).001']} />
        <mesh geometry={nodes.Cube002_7.geometry} material={materials['1760E7(Trashbaskit).001']} />
        <mesh geometry={nodes.Cube002_8.geometry} material={materials['E7E541 (Smoking Booth).001']} />
        <mesh geometry={nodes.Cube002_9.geometry} material={materials['0EA6EF (Leaf, Smoking Booth).001']} />
        <mesh geometry={nodes.Cube002_10.geometry} material={materials['E71512 (Flower, BaskiBall, Smoking Booth).001']} />
        <mesh geometry={nodes.Cube002_11.geometry} material={materials['TextTure (Smoking Booth).001']} />
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/etc/SmokingBooth.glb')
