/**
 * 임성준
 * - 학과장실 오브젝트 생성 및 그림자 설정
 * - 시계 기능 구현
 */
import React, { useEffect, useState } from 'react'
import { Text3D, useGLTF } from '@react-three/drei'
import { useBox } from '@react-three/cannon'
import moment from 'moment'
import { useFrame } from '@react-three/fiber'
import { FONT_URL } from '../../../../../../../../../data/commonData'

export function DeskWatch({position, ...props}) {
  const [currentTime, setCurrentTime] = useState(0)
  const { scene, nodes, materials } = useGLTF('/assets/models/dept_etc/DeskWatch.glb')
  
  const fontStyle = {
      font: FONT_URL,
      letterSpacing: 0.01,
      height: 0.1,
      lineHeight: 1,
      fontSize: 1
  }

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

  useFrame(() => {
    setCurrentTime(moment(new Date()).format("HH:mm"))
  }, [currentTime])

  return (
    <group position={position} {...props}>
      <group scale={[2.058, 1.111, 0.721]}>
        <mesh geometry={nodes.Cube001.geometry} material={materials.Main} />
        <mesh geometry={nodes.Cube001_1.geometry} material={materials.Main2} />
      </group>
      <mesh geometry={nodes.Glass.geometry} material={materials.Glass} position={[0, 0, 0.595]} scale={[2.058, 1.111, 0.721]} />
      <group position={[-1.25, -0.3, 0.5]} scale={0.9}>
        <Text3D size={1} {...fontStyle}>
          {currentTime}
          <meshStandardMaterial color={'green'} />
        </Text3D>
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/dept_etc/DeskWatch.glb')
