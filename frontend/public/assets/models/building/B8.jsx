/** 파일생성자 : 이정민
 * 초기 position, scale 설정 : 이정민
 * position, scale 수정 및 그림자 설정 : 임성준
 */

import { useGLTF } from '@react-three/drei'
import React from 'react'

export function Model(props) {
  //Yujaelagwan
  const { scene, nodes, materials } = useGLTF('/assets/models/building/B8.glb')
  const [meshRef, api] = useBox(() => ({
    args: [295, 205, 135],
    type: 'Static',
    mass: 1,
    position,
    ...props
  }))

  return (

      <group position={[-380.008, 102.136, -176.308]} rotation={[-Math.PI, 0, -Math.PI]} scale={[4.452, 15, 4.429]}>
        <mesh geometry={nodes.실린더002.geometry} material={materials['E2E2E2(B1~9(Body,Number)).002']} />
        <mesh geometry={nodes.실린더002_1.geometry} material={materials['18226AA (Number Plane).002']} />
        <mesh geometry={nodes.실린더002_2.geometry} material={materials['DCE759 & Metal (DEVName, Statue).002']} />
        <mesh geometry={nodes.실린더002_3.geometry} material={materials['23683C (RoofTop).002']} />
        <mesh geometry={nodes.실린더002_4.geometry} material={materials['2F0708 (B4,B8,B9(Window Frame),T2(Table)).002']} />
        <mesh geometry={nodes.실린더002_5.geometry} material={materials['D2D2D2 & Metal (B4,B5,B6,B7).002']} />
        <mesh geometry={nodes.실린더002_6.geometry} material={materials['C0E8F6 (B1~9(Window)).002']} />
        <mesh geometry={nodes.실린더002_7.geometry} material={materials['AAAAAA (B8).002']} />
        <mesh geometry={nodes.실린더002_8.geometry} material={materials['FFFFFF (Number, BaskitBall).002']} />
        <mesh geometry={nodes.실린더002_9.geometry} material={materials['A2A2A2(B9, Park(Rock),B5-6 Plane).002']} />
        <mesh geometry={nodes.실린더002_10.geometry} material={materials['644F1C (Park Plane).002']} />
        <mesh geometry={nodes.실린더002_11.geometry} material={materials['0CFF0F(Leaf,Smoking Booth).002']} />
        <mesh geometry={nodes.실린더002_12.geometry} material={materials['0EA6EF (Leaf, Smoking Booth).002']} />
        <mesh geometry={nodes.실린더002_13.geometry} material={materials['006400 (Leaf).002']} />
        <mesh geometry={nodes.실린더002_14.geometry} material={materials['654321 (Wood).002']} />
      </group>
  )
}

useGLTF.preload('/B8.glb')
